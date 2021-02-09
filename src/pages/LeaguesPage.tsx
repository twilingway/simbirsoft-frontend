import React from 'react';
import { LeagueForm } from '../components/LeagueForm';

export const LeaguesPage: React.FC = () => {
  return (
    <div>
      <div>
        <h1>Список лиг</h1>
        <LeagueForm />
      </div>
    </div>
  );
};
