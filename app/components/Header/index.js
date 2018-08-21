import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

/* eslint-disable react/prefer-stateless-function */
class Header extends React.Component {
  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit">
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Header;
