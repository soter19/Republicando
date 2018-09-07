/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { withFirestore } from 'react-redux-firebase';
import WhiteTextField from 'components/WhiteTextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Map from 'components/Map';

import injectReducer from 'utils/injectReducer';
import reducer from './reducer';

import { makeSelectFirestoreClients } from '../App/selectors';
import { DefaultNavBar } from '../../components/Header/NavBar';
import { getRepublics } from '../../api';

const HomePageAppBar = () => (
  <DefaultNavBar>
    <WhiteTextField
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  </DefaultNavBar>
);

export class HomePage extends React.PureComponent {
  constructor(props){
    super(props);
    this.state = {
      republics: [],
    }
  }
  componentWillMount() {
    getRepublics().then((r) => this.setState({republics: r}));
  }

  render() {
    console.log(this.state.republics);
    return (
      <Fragment>
        <HomePageAppBar />
        <Map />
      </Fragment>
    );
  }
}

HomePage.propTypes = {
  firestore: PropTypes.object,
  clients: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  clients: makeSelectFirestoreClients(),
});

const withConnect = connect(mapStateToProps);

const withReducer = injectReducer({ key: 'home', reducer });

export default compose(
  withReducer,
  withConnect,
  withFirestore,
)(HomePage);
