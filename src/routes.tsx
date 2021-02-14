import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { TeamsPage } from './pages/TeamsPage';
import { LeaguesPage } from './pages/LeaguesPage';
import { LeagueCalendarPage } from './pages/LeagueCalendarPage';
import { TeamCalendarPage } from './pages/TeamCalendarPage';

export const useRoutes = () => {
  return (
    <Switch>
      <Route path="/leagues" exact>
        <LeaguesPage />
      </Route>
      <Route path="/teams" exact>
        <TeamsPage />
      </Route>
      <Route path="/league_calendar/:id">
        <LeagueCalendarPage />
      </Route>
      <Route path="/team_calendar/:id" exact>
        <TeamCalendarPage />
      </Route>
      <Route path="/teams_list/:id">
        <TeamCalendarPage />
      </Route>
      <Redirect to="/leagues" />
    </Switch>
  );
};
