import React, { useContext, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import { QueryContext } from '../context/QueryContext';

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
  const { clearQueryParam } = useContext(QueryContext);

  return (
    <nav>
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
            <div className="navlinks">
              <Link to="/leagues" onClick={clearQueryParam}>
                Список лиг
              </Link>
              <Link to="/teams" onClick={clearQueryParam}>
                Список команд
              </Link>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </nav>
  );
};
