import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { LeagueList } from './LeagueList';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message';

export const LeagueForm: React.FC = () => {
  const message = useMessage();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [competitions, setCompetitions] = useState([]);
  const { loading, error, request, clearError } = useHttp();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const changeHandler = (event: Date) => {
    setStartDate(event);
    //getCompetitions(event?.getFullYear().toString());
    console.log('changeHandler :>> ', event?.getFullYear());
  };

  const onChangeRawHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('onBlur :>> ', event.target.value);
    if (event.target.value === undefined) {
      console.log('onChangeRawHandler :>> ', startDate);
    }
  };

  useEffect(() => {
    if (startDate) {
      setIsLoading(true);
      console.log('startDate :>> ', startDate.getFullYear().toString());
    }
  }, [startDate]);

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
      <div className="form-floating mb-3">
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          dateFormat="yyyy"
          disabled={loading}
          className="form-control"
          placeholderText="Выберите год"
          showYearPicker
          //onChangeRaw={onChangeRawHandler}
          //customInput={<ExampleCustomInput />}
        ></DatePicker>

        <LeagueList competitions={competitions} />
      </div>
    </>
  );
};
