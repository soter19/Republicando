import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { List, ListItem } from '@material-ui/core';

/* eslint-disable react/prefer-stateless-function */
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
    };
  }

  render() {
    const { hasSecondaryToolbar } = this.props;
    const { menuOpen } = this.state;
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={() => this.setState({ menuOpen: true })}
            >
              <MenuIcon />
            </IconButton>
            <SwipeableDrawer
              open={menuOpen}
              onOpen={() => this.setState({ menuOpen: true })}
              onClose={() => this.setState({ menuOpen: false })}
            >
              <List>
                <ListItem>
                  <Link to="/republic-map">Mapa de Repúblicas</Link>
                </ListItem>
                <ListItem>
                  <Link to="/republic-list">Lista de Repúblicas </Link>
                </ListItem>
              </List>
            </SwipeableDrawer>
            <div id="portal-header" />
            {/* ^ THIS IS A PORTAL, DO NOT REMOVE IT! */}
          </Toolbar>
          {hasSecondaryToolbar ? (
            <Toolbar>
              <Typography variant="title" color="inherit" />
              <Button color="inherit">Login</Button>
            </Toolbar>
          ) : null}
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  hasSecondaryToolbar: PropTypes.bool,
};

Header.defaultProps = {
  hasSecondaryToolbar: false,
};

export default Header;
