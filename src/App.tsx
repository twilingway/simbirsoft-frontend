import React, { useEffect, useState } from 'react';
import { QueryContext } from './context/QueryContext';

import { Navbar } from './components/Navbar';
import { useRoutes } from './routes';
import { useQuery } from './hooks/query.hook';
import Container from '@material-ui/core/Container';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Loader } from './components/Loader';

const App = () => {
  const routes = useRoutes();
  const {
    setQueryParam,
    deleteQueryParam,
    query,
    ready,
    clearQueryParam,
  } = useQuery();

  if (!ready) {
    return <Loader />;
  }

  return (
    <QueryContext.Provider
      value={{ setQueryParam, deleteQueryParam, query, ready, clearQueryParam }}
    >
      <>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Navbar />
          <Container maxWidth="lg">{routes}</Container>
        </MuiPickersUtilsProvider>
      </>
    </QueryContext.Provider>
  );
};

export default App;
