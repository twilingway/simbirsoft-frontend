import React, { useContext, useRef } from 'react';
import MaterialTable, { MTableToolbar } from '@material-table/core';
import { QueryContext } from '../context/QueryContext';
import { useHistory } from 'react-router-dom';

export interface TeamMatchesList {
  matches?: any[];
}

type TeamCalendarListProps = {
  competitions: TeamMatchesList;
  loading: boolean;
};

type Data = {
  id: number;
  status: number;
  awayTeam: string;
  homeTeam: string;
  utcDate: string;
};

export const TeamCalendarList: React.FC<TeamCalendarListProps> = (props) => {
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
    console.log('competitionsCALENDAR :>> ', competitions.matches);
    console.log('queryCALENDAR :>> ', query);
    // let filteredData = competitions?.seasons?.filter(
    //   (item) =>
    //     item.startDate >= query.startDate && item.endDate <= query.endDate
    // );

    // console.log('filteredData :>> ', filteredData);

    competitions.matches?.forEach((matche: any) => {
      const newItem: Data = {
        id: matche?.id,
        status: matche?.status,
        awayTeam: matche?.awayTeam.name,
        homeTeam: matche?.homeTeam.name,
        utcDate: matche?.utcDate,
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
      title={''}
      isLoading={loading}
      columns={[
        // {
        //   title: '#',
        //   field: 'id',
        //   hidden: true,
        // },
        {
          title: 'Статус',
          field: 'status',
          defaultFilter: query.status,
          filtering: false,
        },
        {
          title: 'Команда гостей',
          field: 'awayTeam',
          defaultFilter: query.awayTeam,
        },
        {
          title: 'Хозяева',
          field: 'homeTeam',
          defaultFilter: query.homeTeam,
        },
        {
          align: 'center',
          title: 'Дата матча',
          field: 'utcDate',
          customFilterAndSearch: (term: any, rowData) =>
            rowData.utcDate >= term,
          filterPlaceholder: 'yyyy-MM-dd',
          defaultFilter: query.utcDate,
        },
      ]}
      data={getCompetitions()}
      onSearchChange={onSearchChangeHandler}
      onRowClick={(elem, rowData) => {
        // console.log('onRowClickElem :>> ', elem);
        // console.log('onRowClick :>> ', rowData);
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
