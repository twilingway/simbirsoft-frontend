import React, { useContext } from 'react';
import MaterialTable from '@material-table/core';
import { Context } from '../context';

type LeagueListProps = {
  competitions: any[];
  loading: boolean;
};

type Data = {
  name: string;
  aria: string;
  countryCode: string;
  startDate: string;
  endDate: string;
  lastUpdated: string;
};

const columns = [
  {
    title: 'Лига',
    field: 'name',
  },
  {
    title: 'Регион',
    field: 'aria',
  },
  {
    title: 'Код страны',
    field: 'countryCode',
  },
  {
    title: 'Дата начала',
    field: 'startDate',
  },
  {
    title: 'Дата окончания',
    field: 'endDate',
  },
  {
    title: 'Последнее обновление',
    field: 'lastUpdated',
  },
];

export const LeagueList: React.FC<LeagueListProps> = (props) => {
  const { competitions, loading } = props;
  const { setQueryParam, deleteQueryParam, query } = useContext(Context);

  const onSearchChangeHandler = (event: string) => {
    if (event) {
      setQueryParam('search', event);
    } else {
      deleteQueryParam('search');
    }
  };

  const getCompetitions = () => {
    const data: Data[] = [];

    competitions.forEach((competition: any) => {
      const newItem: Data = {
        name: competition?.name,
        aria: competition.area?.name,
        countryCode: competition.area?.countryCode,
        startDate: competition.currentSeason?.startDate,
        endDate: competition.currentSeason?.endDate,
        lastUpdated: competition.lastUpdated,
      };
      data.push(newItem);
    });
    return data;
  };

  return (
    <MaterialTable
      options={{
        sorting: true,
        thirdSortClick: false,
        searchText: query.search ? query.search : '',
        pageSizeOptions: [5, 10, 20, 50, 100],
        pageSize: 10,
      }}
      columns={columns}
      data={getCompetitions()}
      onSearchChange={onSearchChangeHandler}
      isLoading={loading}
    ></MaterialTable>
  );
};
