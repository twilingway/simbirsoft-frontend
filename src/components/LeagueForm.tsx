import React, { useEffect, useState, useContext } from 'react';
import { LeagueList } from './LeagueList';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message';
import { QueryContext } from '../context/QueryContext';

import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

export const LeagueForm: React.FC = () => {
  const message = useMessage();
  const { setQueryParam, query } = useContext(QueryContext);

  const [competitions, setCompetitions] = useState([]);
  const { loading, error, request, clearError } = useHttp();

  const getCompetitions = async (year: string = '') => {
    try {
      const data = await request(
        `http://api.football-data.org/v2/competitions/`,
        'GET'
      );
      setCompetitions(data.competitions);
    } catch (e) {}
  };

  useEffect(() => {
    query.year
      ? getCompetitions(query.year)
      : getCompetitions(new Date().getFullYear().toString());
  }, []);

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const onChangeHandler = async (event: MaterialUiPickersDate) => {
    if (event) {
      setQueryParam('year', event.getFullYear().toString());
      await getCompetitions(event.getFullYear().toString());
    }
  };

  return (
    <>
      {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          views={['year']}
          label="Выберите год"
          value={query.year}
          onChange={onChangeHandler}
          disabled={loading}
        />
      </MuiPickersUtilsProvider> */}
      <p />
      <LeagueList competitions={competitions} loading={loading} />
    </>
  );
};
