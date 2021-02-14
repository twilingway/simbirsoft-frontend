import React, { useContext, useRef } from 'react';
import MaterialTable, { MTableToolbar } from '@material-table/core';
import { QueryContext } from '../context/QueryContext';
import { useHistory } from 'react-router-dom';

export interface SeasonsList {
  area?: [];
  emblemUrl?: string;
  code?: string;
  name?: string;
  seasons?: any[];
}

type LeagueCalendarListProps = {
  competitions: SeasonsList;
  seasons: any[];
  loading: boolean;
};

type Data = {
  id: number;
  startDate: string;
  endDate: string;
};

export const LeagueCalendarList: React.FC<LeagueCalendarListProps> = (
  props
) => {
  const history = useHistory();
  const tableRef = useRef<any>();
  const { competitions, loading } = props;
  const { setQueryParam, deleteQueryParam, query } = useContext(QueryContext);

  const onSearchChangeHandler = (event: string) => {
    if (event) {
      setQueryParam('search', event);
    } else {
      deleteQueryParam('search');
    }
  };

  const getCompetitions = () => {
    const data: Data[] = [];
    competitions.seasons?.forEach((season: any) => {
      const newItem: Data = {
        id: season?.id,
        startDate: season?.startDate,
        endDate: season?.endDate,
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
    setQueryParam('leaguesCalendar', columns);
  };

  return (
    <MaterialTable
      tableRef={tableRef}
      title={competitions?.name}
      isLoading={loading}
      columns={[
        {
          title: '#',
          field: 'id',
          hidden: true,
        },
        {
          align: 'center',
          title: 'Дата начала',
          field: 'startDate',
          customFilterAndSearch: (term: any, rowData) =>
            rowData.startDate >= term,
          filterPlaceholder: 'yyyy-MM-dd',
          defaultFilter: query.startDate,
        },
        {
          align: 'center',
          title: 'Дата окончания',
          field: 'endDate',
          customFilterAndSearch: (term: any, rowData) =>
            rowData.endDate <= term,
          filterPlaceholder: 'yyyy-MM-dd',
          defaultFilter: query.endDate,
        },
      ]}
      data={getCompetitions()}
      onSearchChange={onSearchChangeHandler}
      onRowClick={(elem, rowData) => {
        history.push(`/teams_list/${rowData?.id}`);
      }}
      options={{
        sorting: true,
        thirdSortClick: false,
        searchText: query.search ? query.search : '',
        pageSizeOptions: [5, 10, 20, 50, 100],
        pageSize: 10,
        filtering: true,
        search: false,
      }}
      onFilterChange={(elem) => {
        saveFilters(tableRef);
      }}
    ></MaterialTable>
  );
};
