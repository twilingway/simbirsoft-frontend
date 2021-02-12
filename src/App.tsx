import React from 'react';

import { Navbar } from './components/Navbar';
import { useRoutes } from './routes';
import Container from '@material-ui/core/Container';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const App: React.FC = () => {
  const routes = useRoutes();
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Navbar />
      <Container maxWidth="lg">{routes}</Container>
    </MuiPickersUtilsProvider>
  );
};

export default App;
