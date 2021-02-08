import React from 'react';
import { useHttp } from '../hooks/http.hook';

export const LeaguesPage: React.FC = () => {
  const { loading, error, request } = useHttp();

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Список лиг</h1>
      </div>
    </div>
  );
};
