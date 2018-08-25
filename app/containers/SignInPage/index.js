/**
 *
 * SignInPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import makeSelectSignInPage from './selectors';
import reducer from './reducer';

/* eslint-disable react/prefer-stateless-function */
export class SignInPage extends React.PureComponent {
  render() {
    return <div />;
  }
}

SignInPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  signinpage: makeSelectSignInPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'signInPage', reducer });

export default compose(
  withReducer,
  withConnect,
)(SignInPage);
