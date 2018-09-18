/**
 *
 * SignUpPage
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import { push } from 'react-router-redux';
import { doCreateUserWithEmailAndPassword } from 'api/auth'

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

const TextFieldSignUp = styled(TextField)`
  margin: 20px 0 !important;
`;

const ButtonSignUp = styled(Button)`
  margin: 100px 0 20px 0 !important;
`;

/* eslint-disable react/prefer-stateless-function */
export class SignUpPage extends React.PureComponent {

    onClick = (event) => {
        const {
            username,
            email,
            passwordOne,
        } = this.state;

        doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                alert('OI' + passwordOne  + ' ' + email);
                // push("/republic-map")
            })
            .catch(error => {
                // alert('OI BIELE COM ERRO' + passwordOne  + ' ' + email);

                this.setState(byPropKey('error', error));
            });

        event.preventDefault();
    }

  render() {
    const {
        username,
        email,
        passwordOne,
        passwordTwo,
        error,
    } = this.props;

      const isInvalid =
          passwordOne !== passwordTwo ||
          passwordOne === '' ||
          email === '' ||
          username === '';

    return (
      <Fragment>
        <TextFieldSignUp
            required
            id="name"
            label="Name"
            type="text"
            value={username}
            onChange={event => this.setState(byPropKey('username', event.target.value))}/>
        <TextFieldSignUp
            required
            id="email"
            label="Email"
            type="text"
            value={email}
            onChange={event => this.setState(byPropKey('email', event.target.value))}/>
        <TextFieldSignUp
            required
            id="password"
            label="Password"
            type="password"
            value={passwordOne}
            onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}/>
        <TextFieldSignUp
            required
            id="confirmPassword"
            label="Confirm password"
            type="password"
            value={passwordTwo}
            onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}/>
          <ButtonSignUp
          disabled={isInvalid}
          variant="contained"
          color="primary"
          type="submit"
          onClick={this.onClick}
        > Cadastrar
        </ButtonSignUp>
          { error && <p>{error.message} OI bele</p> }
      </Fragment>
    );
  }
}

SignUpPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(SignUpPage);
