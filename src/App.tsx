import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { LeagueForm } from './components/LeagueForm';
import 'materialize-css';
import { useRoutes } from './routes';

const App: React.FC = () => {
  const routes = useRoutes();
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">{routes}</div>
    </BrowserRouter>
  );
};

export default App;
