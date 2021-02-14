import React, { useContext, useRef } from 'react';
import MaterialTable from '@material-table/core';
import { QueryContext } from '../context/QueryContext';
import { useHistory } from 'react-router-dom';

type LeagueListProps = {
  competitions: any[];
  loading: boolean;
};

type Data = {
  name: string;
  leagueCode: string;
  aria: string;
  countryCode: string;
  startDate: string;
  endDate: string;
  lastUpdated: string;
};

export const LeagueList: React.FC<LeagueListProps> = (props) => {
  const history = useHistory();
  const tableRef = useRef<any>();
  const { competitions, loading } = props;
  const {
    setQueryParam,
    deleteQueryParam,
    query,
    clearQueryParam,
  } = useContext(QueryContext);

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
        leagueCode: competition?.code,
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

  const saveFilters = (tableRef: React.MutableRefObject<any>) => {
    const columns = tableRef?.current?.state.columns.map((column: any) => ({
      field: column.field,
      filterValue: column.tableData.filterValue,
    }));
    setQueryParam('leaguesList', columns);
  };

  return (
    <div>
      <MaterialTable
        title=""
        tableRef={tableRef}
        options={{
          sorting: true,
          thirdSortClick: false,
          pageSizeOptions: [5, 10, 20, 50, 100],
          pageSize: 10,
          filtering: true,
          search: false,
        }}
        columns={[
          {
            title: 'Лига',
            field: 'name',
            defaultFilter: query?.name,
          },
          {
            title: 'Код лиги',
            field: 'leagueCode',
            defaultFilter: query?.leagueCode,
          },
          {
            title: 'Регион',
            field: 'aria',
            defaultFilter: query?.aria,
          },
          {
            title: 'Код страны',
            field: 'countryCode',
            width: '10%',
            defaultFilter: query?.countryCode,
          },
          {
            title: 'Дата начала',
            field: 'startDate',
            customFilterAndSearch: (term: any, rowData) =>
              rowData.startDate >= term,
            filterPlaceholder: 'yyyy-MM-dd',
            defaultFilter: query?.startDate,
          },
          {
            title: 'Дата окончания',
            field: 'endDate',
            customFilterAndSearch: (term: any, rowData) =>
              rowData.endDate <= term,
            filterPlaceholder: 'yyyy-MM-dd',
            defaultFilter: query?.endDate,
          },
          {
            title: 'Последнее обновление',
            field: 'lastUpdated',
            filtering: false,
          },
        ]}
        data={getCompetitions()}
        onRowClick={(elem, rowData) => {
          clearQueryParam();
          history.push(`/league_calendar/${rowData?.leagueCode}`);
        }}
        isLoading={loading}
        onFilterChange={(elem) => {
          saveFilters(tableRef);
        }}
      ></MaterialTable>
    </div>
  );
};
