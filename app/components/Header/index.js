import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

/* eslint-disable react/prefer-stateless-function */
class Header extends React.Component {
  render() {
    const { hasSecondaryToolbar } = this.props;
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
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
