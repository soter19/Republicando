import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuIcon from '@material-ui/icons/Menu';
import MapIcon from '@material-ui/icons/Map';
import ListIcon from '@material-ui/icons/List';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { List as MUIList, ListItem } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';

const List = styled(MUIList)`
  a {
    text-decoration: none;
    color: black;
  }
  a:visited {
    color: black;
  }
`;

const AppTitleLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  cursor: pointer;
`



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
            <Typography variant='headline' color='inherit'><AppTitleLink to="/">Republicando</AppTitleLink></Typography>
            <SwipeableDrawer
              open={menuOpen}
              onOpen={() => this.setState({ menuOpen: true })}
              onClose={() => this.setState({ menuOpen: false })}
            >
              <List>
                <ListItem button onClick={() => this.setState({ menuOpen: false })}>
                  <Link to="/republic-map">
                    <ListItemIcon>
                      <MapIcon />
                    </ListItemIcon>
                    Mapa de Repúblicas
                  </Link>
                </ListItem>
                <ListItem button onClick={() => this.setState({ menuOpen: false })}>
                  <Link to="/republic-list">
                    <ListItemIcon>
                      <ListIcon/>
                    </ListItemIcon>
                    Lista de Repúblicas
                  </Link>
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
