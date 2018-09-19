/**
 *
 * SignUpPage
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { compose } from 'redux';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import { doCreateUserWithEmailAndPassword } from 'api/auth';
import { getCurrentUser } from '../../api/auth';
import { createClientOnDatabase } from '../../api';
import LoadingIndicator from '../../components/LoadingIndicator';

const TextFieldSignUp = styled(TextField)`
  margin: 10px 0;
`;

const ButtonSignUp = styled(Button)`
  margin: 20px 0;
`;

/* eslint-disable react/prefer-stateless-function */
export class SignUpPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      error: null,
      isLoading: false,
    };
  }


  handleSubmit = (event) => {
    const {
      name,
      email,
      password,
    } = this.state;

    const {
      goToHome,
    } = this.props;

    this.toggleLoading();
    try {
      doCreateUserWithEmailAndPassword(email, password)
        .then(() => {
          const user = getCurrentUser();
          user.updateProfile({
            displayName: name,
          });
          const newClient = { id: user.uid, name, email };
          createClientOnDatabase(newClient).then(() => {
            this.toggleLoading();
            goToHome();
          });
        });
    } catch (error) {
      this.setState({ error });
    }

    event.preventDefault();
  };

  handleOnChange = (e) => {
    const { value, id } = e.target;
    this.setState({ [id]: value });
  };

  toggleLoading = () => this.setState({ isLoading: !this.state.isLoading });

  render() {
    const {
      name,
      email,
      password,
      confirmPassword,
      error,
      isLoading,
    } = this.state;

    const isInvalid =
      password !== confirmPassword ||
      password === '' ||
      email === '' ||
      name === '';

    return (
      <Fragment>
        {isLoading && <LoadingIndicator />}
        <TextFieldSignUp
          required
          id="name"
          label="Nome Completo"
          type="text"
          value={name}
          onChange={this.handleOnChange}
        />
        <TextFieldSignUp
          required
          id="email"
          label="E-mail"
          type="email"
          value={email}
          onChange={this.handleOnChange}
        />
        <TextFieldSignUp
          required
          id="password"
          label="Senha"
          type="password"
          value={password}
          onChange={this.handleOnChange}
        />
        <TextFieldSignUp
          required
          id="confirmPassword"
          label="Confirmação de Senha"
          type="password"
          value={confirmPassword}
          onChange={this.handleOnChange}
        />
        <ButtonSignUp
          disabled={isInvalid}
          variant="contained"
          color="primary"
          type="submit"
          onClick={this.handleSubmit}
        >
          Cadastrar-se
        </ButtonSignUp>
        {error && <p>{error.message}</p>}
      </Fragment>
    );
  }
}

SignUpPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  goToHome: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    goToHome: () => dispatch(push('/')),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(SignUpPage);
