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
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { push } from 'react-router-redux';
import makeSelectSignInPage from './selectors';
import { login } from '../App/actions';
import { Link } from 'react-router-dom';

const TextFieldSignIn = styled(TextField)`
  margin: 10px;
`;

const ButtonSignIn = styled(Button)`
  margin: 10px;
`;

const LinkSignUp = styled(Link)`
  margin: 10px;
`;
/* eslint-disable react/prefer-stateless-function */
export class SignInPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleLogin = () => {
    const { email, password } = this.state;
    const { doLogin } = this.props;

    doLogin(email, password);
  };

  handleFieldChange = ({ target }) => {
    const { id, value } = target;
    this.setState({ [id]: value });
  };

  render() {
    const { email, password } = this.state;
    return (
      <Fragment>
          <TextFieldSignIn
            required
            id="email"
            label="E-mail"
            type="email"
            margin="dense"
            value={email}
            onChange={this.handleFieldChange}
          />
          <TextFieldSignIn
            required
            id="password"
            label="Senha"
            type="password"
            margin="dense"
            value={password}
            onChange={this.handleFieldChange}
          />
          <LinkSignUp to="/signUp">Cadastre-se</LinkSignUp>
          <ButtonSignIn
            size="small"
            variant="contained"
            color="primary"
            type={'submit'}
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
