/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withFirestore } from 'react-redux-firebase';

import injectReducer from 'utils/injectReducer';
import reducer from './reducer';

import { makeSelectFirestoreClients } from '../App/selectors';

/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.PureComponent {
  componentWillMount() {
    const { firestore } = this.props;
    firestore.get({ collection: 'clients' });
  }

  render() {
    const { clients } = this.props;
    return <div>{clients && clients.map(u => <p>{u.name}</p>)}</div>;
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
