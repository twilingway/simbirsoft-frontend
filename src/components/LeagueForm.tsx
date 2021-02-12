import React, { useEffect, useState } from 'react';
import { LeagueList } from './LeagueList';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message';

import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

const queryString = require('query-string');

interface IObjectKeys {
  [key: string]: string | number | undefined;
}
export interface IQuery extends IObjectKeys {
  search?: string;
  year?: string;
  page?: string;
  row?: string;
}

export const LeagueForm: React.FC = () => {
  const message = useMessage();
  const [startDate, setStartDate] = useState<MaterialUiPickersDate>(new Date());
  const [competitions, setCompetitions] = useState([]);
  const { loading, error, request, clearError } = useHttp();
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState<IQuery>(
    queryString.parse(window.location.search)
  );

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    if (startDate) {
      setIsLoading(true);
      let tempQuery = { ...query };
      tempQuery.year = startDate.getFullYear().toString();
      setQuery({ ...tempQuery });
      console.log('startDate :>> ', startDate.getFullYear().toString());
    }
  }, [query, startDate]);

  useEffect(() => {
    const getCompetitions = async (year: string) => {
      try {
        const data = await request(
          `http://api.football-data.org/v2/competitions`,
          'GET'
        );
        console.log('data :>> ', data.competitions);
        setCompetitions(data.competitions);
        setIsLoading(false);
      } catch (e) {}
    };
    if (isLoading && startDate) {
      getCompetitions(startDate.getFullYear().toString());
    }
  }, [isLoading, request, startDate]);

  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          views={['year']}
          label="Выберите год"
          value={startDate}
          onChange={setStartDate}
          disabled={loading}
        />
      </MuiPickersUtilsProvider>
      <p />
      <LeagueList competitions={competitions} loading={loading} query={query} />
    </>
  );
};
