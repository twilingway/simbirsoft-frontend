import React from 'react';
import { LeagueCalendarForm } from '../components/LeagueCalendarForm';

export const LeagueCalendarPage: React.FC = () => {
  return (
    <div>
      <div>
        <h1>Календарь лиги</h1>
        <LeagueCalendarForm />
      </div>
    </div>
  );
};
