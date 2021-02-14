import React, { useContext, useEffect, useRef } from 'react';
import MaterialTable from '@material-table/core';
import { QueryContext } from '../context/QueryContext';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

type TeamListProps = {
  teams: any[];
  loading: boolean;
};

type Data = {
  id: number;
  crestUrl: string;
  name: string;
  website: string;
  email: string;
  phone: string;
  address: string;
  area: string;
  lastUpdated: string;
};

export const TeamList: React.FC<TeamListProps> = (props) => {
  const history = useHistory();
  const tableRef = useRef<any>();
  const { teams, loading } = props;
  const {
    setQueryParam,
    deleteQueryParam,
    query,
    clearQueryParam,
  } = useContext(QueryContext);

  const onSearchChangeHandler = (event: string) => {
    if (event) {
      let newItem = [];
      newItem.push({ field: 'search', filterValue: event });
      console.log('newSeachItem :>> ', newItem);
      setQueryParam('teamsList', newItem);
    }
    // } else {
    //   deleteQueryParam('teamsList', search);
    // }
  };

  const getCompetitions = () => {
    const data: Data[] = [];
    //console.log('TeamLIST :>> ', teams);
    teams.forEach((team: any) => {
      const newItem: Data = {
        id: team.id,
        crestUrl: team.crestUrl,
        name: team.name,
        website: team.website,
        email: team.email,
        phone: team.phone,
        address: team.address,
        area: team.area.name,
        lastUpdated: team.lastUpdated,
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
    setQueryParam('teamsList', columns);
  };

  return (
    <MaterialTable
      tableRef={tableRef}
      title=""
      options={{
        sorting: true,
        thirdSortClick: false,
        // searchText: query.search ? query.teamsList.search : '',
        pageSizeOptions: [5, 10, 20, 50, 100],
        pageSize: 10,
        filtering: true,
        search: false,
      }}
      columns={[
        {
          align: 'center',
          title: 'Флаг',
          field: 'crestUrl',
          filtering: false,

          render: (rowData) => (
            <img
              src={rowData.crestUrl}
              style={{ width: 80, borderRadius: '50%' }}
              alt={rowData.name}
            />
          ),
        },
        {
          title: 'Имя',
          field: 'name',
          defaultFilter: query.name,
        },
        {
          title: 'Адресс',
          field: 'address',
          defaultFilter: query.address,
        },
        {
          title: 'Принадлежность',
          field: 'area',
          defaultFilter: query.area,
        },
        {
          title: 'Последине события',
          field: 'lastUpdated',
          defaultFilter: query.lastUpdated,
        },
      ]}
      data={getCompetitions()}
      onSearchChange={onSearchChangeHandler}
      onRowClick={(elem, rowData) => {
        console.log('onRowClick :>> ', rowData);
        clearQueryParam();
        history.push(`/team_calendar/${rowData?.id}`);
      }}
      onFilterChange={(elem) => {
        saveFilters(tableRef);
      }}
      isLoading={loading}
    ></MaterialTable>
  );
};
