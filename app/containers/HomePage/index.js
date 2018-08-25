/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
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
  componentWillMount() {
    const { firestore } = this.props;
    firestore.get({ collection: 'clients' });
  }

  render() {
    const { clients } = this.props;
    return (
      <Fragment>
        <HomePageAppBar />
        <Map />
        <div>{clients && clients.map(u => <p>{u.name}</p>)}</div>
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
