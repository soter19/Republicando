import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuIcon from '@material-ui/icons/Menu';
import MapIcon from '@material-ui/icons/Map';
import ListIcon from '@material-ui/icons/List';
import PersonIcon from '@material-ui/icons/Person';
import ExitIcon from '@material-ui/icons/ExitToApp';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { List as MUIList, ListItem } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader/ListSubheader';
import Divider from '@material-ui/core/Divider/Divider';
import { auth } from 'configureStore';
import { doSignOut } from '../../api/auth';
import { push } from 'react-router-redux';
import connect from 'react-redux/es/connect/connect';
import injectReducer from '../../utils/injectReducer';
import reducer from '../../containers/HomePage/reducer';
import { compose } from 'recompose';
import { withFirestore } from 'react-redux-firebase';
import { makeSelectFirestoreClients, makeSelectUserData } from '../../containers/App/selectors';

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
`;

const StyledLink = styled.div`

`;

/* eslint-disable react/prefer-stateless-function */
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      username: '',
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if(!user){
        this.props.goToLogin();
      }
      this.setState({ username: user.displayName });
    });
  };

  handleSignOut = () => {
    doSignOut();
    this.props.goToLogin();
  };

  render() {
    console.log(this.props);
    const GenerateListItem = ({ action, Icon, text }) => {
      const useAction = action instanceof Function;
      const WrapperComponent = !useAction ? Link : StyledLink;
      const props = !useAction ? { to: action } : { onClick: action };

      return (
        <WrapperComponent {...props}>
          <ListItem button onClick={() => this.setState({ menuOpen: false })}>
            <ListItemIcon>
              <Icon/>
            </ListItemIcon>
            <ListItemText>{text}</ListItemText>
          </ListItem>
        </WrapperComponent>
      );
    };
    const { hasSecondaryToolbar } = this.props;
    const { menuOpen, username } = this.state;
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={() => this.setState({ menuOpen: true })}
          >
            <MenuIcon/>
          </IconButton>
          <Typography variant='headline' color='inherit'><AppTitleLink to="/">Republicando</AppTitleLink></Typography>
          <SwipeableDrawer
            open={menuOpen}
            onOpen={() => this.setState({ menuOpen: true })}
            onClose={() => this.setState({ menuOpen: false })}
          >
            {username && (<List
              component="nav"
              subheader={<ListSubheader component="div">Olá, {username}</ListSubheader>}
            >
              {/*<GenerateListItem action={'/profile'} Icon={PersonIcon} text={'Perfil'} />*/}
              <GenerateListItem action={this.handleSignOut} Icon={ExitIcon} text={'Logout'}/>
            </List>)
            }
            <Divider/>
            <List
              component="nav"
              subheader={<ListSubheader component="div">Encontrar Repúblicas</ListSubheader>}
            >
              <GenerateListItem action={'/'} Icon={MapIcon} text={'Mapa de Repúblicas'}/>
              <GenerateListItem action={'/republic-list'} Icon={ListIcon} text={'Lista de Repúblicas'}/>
            </List>
          </SwipeableDrawer>
          <div id="portal-header"/>
          {/* ^ THIS IS A PORTAL, DO NOT REMOVE IT! */}
        </Toolbar>
        {hasSecondaryToolbar ? (
          <Toolbar>
            <Typography variant="title" color="inherit"/>
            <Button color="inherit">Login</Button>
          </Toolbar>
        ) : null}
      </AppBar>
    );
  }
}

Header.propTypes = {
  hasSecondaryToolbar: PropTypes.bool,
  goToRoute: PropTypes.func.isRequired,
  goToLogin: PropTypes.func.isRequired,
};

Header.defaultProps = {
  hasSecondaryToolbar: false,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUserData(),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  goToRoute: route => dispatch(push(route)),
  goToLogin: () => dispatch(push('/signIn')),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withFirestore,
)(Header);
