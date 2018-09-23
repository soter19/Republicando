import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuIcon from '@material-ui/icons/Menu';
import MapIcon from '@material-ui/icons/Map';
import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
import PersonIcon from '@material-ui/icons/Person';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ExitIcon from '@material-ui/icons/ExitToApp';
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
import { compose } from 'recompose';
import { makeSelectUserData } from '../../containers/App/selectors';
import {login, loginSuccessAction} from "../../containers/App/actions";
import {getMe} from "../../api";

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
      isLogged: false,
    };
  }

  componentDidMount() {
    const { location, goToLogin, dispatch } = this.props;
    auth.onAuthStateChanged((user) => {
      if(!user){
        this.setState({ isLogged: false });
        const { pathname } = location;
        if(pathname !== 'signUp' && pathname !== 'signIn'){
          goToLogin();
        }
        return
      }
      getMe().then((completeUser) => {
				dispatch(loginSuccessAction({
          id: user.uid,
          email: user.email,
          name: user.displayName,
          isLogged: true,
          ...completeUser.data
				}));
				this.setState({ username: user.displayName, isLogged: true });
      });
    });
  };

  handleSignOut = () => {
    doSignOut();
    this.props.goToLogin();
  };

  render() {
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
    const { menuOpen, username, isLogged } = this.state;
    const { user } = this.props;
    return (
      <AppBar position="static">
        <Toolbar>
          { isLogged && (
            <IconButton
              color="inherit"
              onClick={() => this.setState({ menuOpen: true })}
            >
              <MenuIcon/>
            </IconButton>
          )
          }
          <Typography variant='title' color='inherit' style={{ flexGrow: '1' }}><AppTitleLink to="/">Republicando</AppTitleLink></Typography>
          {/* MENU */}
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
							<GenerateListItem action={'/my-offers'} Icon={HomeIcon} text={'Minhas vagas'}/>
						</List>
						<Divider/>
						<List
							component="nav"
							subheader={<ListSubheader component="div">Minha República</ListSubheader>}
						>
							<GenerateListItem action={'/republic-detail/' + user.republicId} Icon={HomeIcon} text={'Detalhe da república'}/>
							<GenerateListItem action={'/notifications'} Icon={NotificationsIcon} text={'Mensagens'}/>
						</List>
						<Divider/>
						<List
							component="nav"
							subheader={<ListSubheader component="div">Admin</ListSubheader>}
						>
							<GenerateListItem action={'/'} Icon={HomeIcon} text={'Minhas repúblicas'}/>
						</List>
						<Divider/>
						<List
							component="nav"
							subheader={<ListSubheader component="div">Apenas para teste</ListSubheader>}
						>
							<GenerateListItem action={'/edit-offer'} Icon={HomeIcon} text={'Criar vaga'}/>
							<GenerateListItem action={'/candidates'} Icon={PersonIcon} text={'Lista de candidatos'}/>
						</List>
          </SwipeableDrawer>
          <div id="portal-header"/>
          {/* ^ THIS IS A PORTAL, DO NOT REMOVE IT! */}
        </Toolbar>
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
  withRouter,
)(Header);
