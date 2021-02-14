import React, { useEffect, useState, useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message';
import { QueryContext } from '../context/QueryContext';

import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { TeamList } from './TeamList';

export const TeamForm: React.FC = () => {
  const message = useMessage();
  const { setQueryParam, query } = useContext(QueryContext);

  const [teams, setTeams] = useState([]);
  const { loading, error, request, clearError } = useHttp();

  const getTeams = async (year: string = '') => {
    try {
      const data = await request(
        `http://api.football-data.org/v2/teams/`,
        'GET'
      );
      setTeams(data.teams);
    } catch (e) {}
  };

  useEffect(() => {
    query.year
      ? getTeams(query.year)
      : getTeams(new Date().getFullYear().toString());
  }, []);

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const onChangeHandler = async (event: MaterialUiPickersDate) => {
    if (event) {
      setQueryParam('year', event.getFullYear().toString());
      await getTeams(event.getFullYear().toString());
    }
  };

  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          views={['year']}
          label="Выберите год"
          value={query.year}
          onChange={onChangeHandler}
          disabled={loading}
        />
      </MuiPickersUtilsProvider>
      <p />
      <TeamList teams={teams} loading={loading} />
    </>
  );
};
