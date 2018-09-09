/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import styled from 'styled-components';
import { Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const StyledTitle = styled(Typography)`
  margin: 20px 0;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  display: grid;
  text-align: center;
  grid-template-columns: 1fr 1fr;
  grid-gap: 40px;
  width: 40%;
  margin: 50px auto;
  place-content: center;

  & > a > button {
    height: 150px;
    width: 150px;
  }

  @media (max-width: 400px) {
    grid-template-columns: 1fr;
  }
`;

export default class FeaturePage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  // Since state and props are static,
  // there's no need to re-render this component
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div>
        <StyledTitle variant="title">
          Seja bem-vindo ao Republicando, como deseja buscar por repúblicas?
        </StyledTitle>
        <ButtonWrapper>
        <Link to="/republic-map"><Button variant="raised">Mapa</Button></Link>
        <Link to="/republic-list"><Button variant="raised">Lista</Button></Link>
        </ButtonWrapper>
      </div>
    );
  }
}
