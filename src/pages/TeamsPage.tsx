import React from 'react';
import { TeamForm } from '../components/TeamForm';

export const TeamsPage: React.FC = () => {
  return (
    <div>
      <h1>Список команд</h1>

      <TeamForm />
    </div>
  );
};
