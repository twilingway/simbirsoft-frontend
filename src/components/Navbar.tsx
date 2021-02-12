import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
//import Link from '@material-ui/core/Link';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
  })
);

export const Navbar: React.FC = () => {
  const classes = useStyles();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      {/* <div className="container-fluid">
      <a className="navbar-brand" href="/">
        Football statistics
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/leagues">
              Список лиг
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/teams">
              Список команд
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/league_calendar">
              Календарь лиги
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/team_calendar">
              Календарь команды
            </a>
          </li>
        </ul>
      </div>
    </div> */}

      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Link to="/leagues">Список лиг</Link>
          </Toolbar>
        </AppBar>
      </div>
    </nav>
  );
};
