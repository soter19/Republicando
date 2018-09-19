/**
 *
 * SignInPage
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { push } from 'react-router-redux';
import injectReducer from 'utils/injectReducer';
import makeSelectSignInPage from './selectors';
import reducer from './reducer';
import { doSignInWithEmailAndPassword } from '../../api/auth';
import { login } from '../App/actions';

const TextFieldSignIn = styled(TextField)`
  margin: 20px 0;
`;

const ButtonSignIn = styled(Button)`
  margin: 20px 0;
`;

const MyLink = styled.div`
  cursor: pointer;
`;

/* eslint-disable react/prefer-stateless-function */
export class SignInPage extends React.PureComponent {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
    }
  }

  handleLogin = () => {
    const { email, password } = this.state;
    const { doLogin } = this.props;

    doLogin(email, password);
  };

  handleFieldChange = ({ target }) => {
    const { id, value } = target;
    this.setState({ [id]: value })
  };

  render() {
    const { email, password } = this.state;
    const { goToRoute } = this.props;
    return (
      <Fragment>
        <TextFieldSignIn
          required
          id="email"
          label="Email"
          type="email"
          margin="dense"
          value={email}
          onChange={this.handleFieldChange}
        />
        <TextFieldSignIn
          required
          id="password"
          label="Password"
          type="password"
          margin="dense"
          value={password}
          onChange={this.handleFieldChange}
        />
        <MyLink onClick={() => goToRoute('/signUp')}>Cadastre-se</MyLink>
        <ButtonSignIn
          size="small"
          variant="contained"
          color="primary"
          onClick={this.handleLogin}
        >
          Login
        </ButtonSignIn>
      </Fragment>
    );
  }
}

SignInPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  goToRoute: PropTypes.func.isRequired,
  doLogin: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  signinpage: makeSelectSignInPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    goToRoute: route => dispatch(push(route)),
    doLogin: (email, password) => login(dispatch)(email, password),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(SignInPage);
