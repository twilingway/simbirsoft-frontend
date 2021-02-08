import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { LeagueList } from './LeagueList';
import { getCompetition } from '../FootballDataAPI';

export const LeagueForm: React.FC = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [competitions, setCompetitions] = useState(null);
  useEffect(() => {
    console.log('startDate :>> ', startDate);
  }, [startDate]);

  // const keyDownHandler = (event: React.KeyboardEvent) => {
  //   if (event.key === 'Enter') {
  //     console.log('Enter :>> ', startDate);
  //   }
  // };

  return (
    <div className="input-field mt2">
      <DatePicker
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
        showYearPicker
        dateFormat="yyyy"
        // onKeyDown={keyDownHandler}
      />
      <label htmlFor="datepicker" className="active">
        Выберите год
      </label>
      {/* <LeagueList competitions={} /> */}
    </div>
  );
};
