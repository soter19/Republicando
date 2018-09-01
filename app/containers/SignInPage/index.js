/**
 *
 * SignInPage
 *
 */

import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import TextField from '@material-ui/core/TextField';
import  Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { push } from 'react-router-redux'


import injectReducer from 'utils/injectReducer';
import makeSelectSignInPage from './selectors';
import reducer from './reducer';

const TextFieldSignIn = styled(TextField)`
	margin: 20px 0 !important;
`

const ButtonSignIn = styled(Button)`
	margin: 100px 0 20px 0 !important;
`

const MyLink = styled.div`
  cursor: pointer;
`

/* eslint-disable react/prefer-stateless-function */
export class SignInPage extends React.PureComponent {
  render() {
    const { goToRoute } = this.props
    return (
        <Fragment>
            <TextFieldSignIn
                required
                id="email"
                label="Email"
                margin="dense"
            />
            <TextFieldSignIn
                required
                id="password"
                label="Password"
                margin="dense"
            />

            <MyLink onClick={() => goToRoute('/signUp')}>Cadastre-se</MyLink>
            <ButtonSignIn onClick={() => goToRoute('/')}>Login</ButtonSignIn>
        </Fragment>
    );
  }
}

SignInPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  goToRoute: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  signinpage: makeSelectSignInPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    goToRoute: route => dispatch(push(route)),
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