import React, { useEffect, useState } from 'react';
import { Context } from './context';

import { Navbar } from './components/Navbar';
import { useRoutes } from './routes';
import { useQuery } from './hooks/query.hook';
import Container from '@material-ui/core/Container';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const App: React.FC = () => {
  //const q = useQuery();

  const routes = useRoutes();
  const { setQueryParam, deleteQueryParam, query } = useQuery();
  return (
    <Context.Provider value={{ setQueryParam, deleteQueryParam, query }}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Navbar />
        <Container maxWidth="lg">{routes}</Container>
      </MuiPickersUtilsProvider>
    </Context.Provider>
  );
};

export default App;
