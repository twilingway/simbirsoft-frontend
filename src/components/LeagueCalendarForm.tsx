import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { LeagueCalendarList, SeasonsList } from './LeagueCalendarList';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message';
import { QueryContext } from '../context/QueryContext';

import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  KeyboardDatePicker,
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

export const LeagueCalendarForm: React.FC = () => {
  const message = useMessage();
  const id = useParams<any>().id;

  const { query } = useContext(QueryContext);

  const [competitions, setCompetitions] = useState<SeasonsList>({});
  const [seasons, setSeasons] = useState([]);
  const { loading, error, request, clearError } = useHttp();

  const getCompetitions = async (year: string = '') => {
    try {
      const data = await request(
        `http://api.football-data.org/v2/competitions/${id}`,
        'GET'
      );
      setCompetitions({ ...data });
      setSeasons(data.seasons);
    } catch (e) {}
  };

  useEffect(() => {
    if (id !== 'null') {
      query.year
        ? getCompetitions(query.year)
        : getCompetitions(new Date().getFullYear().toString());
    }
  }, []);

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  return (
    <>
      <p />
      <div style={{ padding: '0px 10px' }}>
        <img src={competitions.emblemUrl} alt={competitions.name} />
      </div>
      <LeagueCalendarList
        competitions={competitions}
        seasons={seasons}
        loading={loading}
      />
    </>
  );
};
