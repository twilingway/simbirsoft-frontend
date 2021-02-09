import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { MDBDataTable, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

type LeagueListProps = {
  competitions: any[];
};

export const LeagueList: React.FC<LeagueListProps> = ({ competitions }) => {
  const data = {
    columns: [
      {
        label: 'Лига',
        field: 'name',
        sort: 'asc',
        width: 250,
      },
      {
        label: 'Регион',
        field: 'aria',
        sort: 'asc',
        width: 200,
      },
      {
        label: 'Код страны',
        field: 'countryCode',
        sort: 'asc',
        width: 100,
      },
      {
        label: 'Дата начала',
        field: 'startDate',
        sort: 'asc',
        width: 100,
      },
      {
        label: 'Дата окончания',
        field: 'endDate',
        sort: 'asc',
        width: 100,
      },
      {
        label: 'Последнее обновление',
        field: 'lastUpdated',
        sort: 'asc',
        width: 150,
      },
    ],
    rows: [{}],
  };

  competitions.forEach((competition: any) => {
    const newItem = {
      name: <a href="/league_calendar">{competition?.name}</a>,
      aria: <a href="/league_calendar">{competition.area?.name}</a>,
      countryCode: competition.area?.countryCode,
      startDate: competition.currentSeason?.startDate,
      endDate: competition.currentSeason?.endDate,
      lastUpdated: competition.lastUpdated,
    };
    data.rows.push(newItem);
  });

  return <MDBDataTable btn striped bordered small data={data} />;
};
