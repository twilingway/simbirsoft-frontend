import React from 'react';
import { LeagueForm } from '../components/LeagueForm';

export const LeaguesPage: React.FC = () => {
  return (
    <div>
      <h1>Список лиг</h1>
      <h3>
        На текущем аккаунте для более подробного просмотра доступны только
      </h3>
      <h4>UEFA Champions League</h4>
      <h4>European Championship</h4>

      <LeagueForm />
    </div>
  );
};
