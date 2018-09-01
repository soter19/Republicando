/**
 *
 * SignUpPage
 *
 */

import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from "styled-components";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import {push} from "react-router-redux";


const TextFieldSignUp = styled(TextField)`
	margin: 20px 0 !important;
`

const ButtonSignUp = styled(Button)`
	margin: 100px 0 20px 0 !important;
`

/* eslint-disable react/prefer-stateless-function */
export class SignUpPage extends React.PureComponent {
  render() {
      const { goToRoute } = this.props
      return (
          <Fragment>
              <TextFieldSignUp
                  required
                  id="name"
                  label="Name"
              />
              <TextFieldSignUp
                  required
                  id="email"
                  label="Email"
              />
              <TextFieldSignUp
                  required
                  id="password"
                  label="Password"
              />
              <TextFieldSignUp
                  required
                  id="confirmPassword"
                  label="Confirm password"
              />

              <ButtonSignUp onClick={() => goToRoute('/')}>Cadastrar</ButtonSignUp>
          </Fragment>
      );
  }
}

SignUpPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
    goToRoute: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
      dispatch,
      goToRoute: route => dispatch(push(route)),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(SignUpPage);
