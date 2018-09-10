/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import styled from 'styled-components';
import { Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import MapThumb from 'images/staticmap.jpg'

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

  & > div {
    text-align: left;
  }

  & > div > aside {
  margin: 10px 0 5px 0;
  }

  & > div > a {
    text-decoration: none;
  }

  & > div > a > button {
    height: 200px;
    width: 250px;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const MapButton = styled.div`
  & > a > button {
    background-color: transparent;
    background-size: cover;
    font-size: 20px;
    color: black;
    z-index: 1;
    
    &:before {
      content: "";
      background: url(${MapThumb}) center;
      background-size: cover;
      opacity: 0.3;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      position: absolute;
      z-index: -1;
    }
  }
`

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
          <MapButton>
            <Link to="/republic-map">
              <Button variant="raised">Mapa</Button>
            </Link>
            <Typography variant='body2'>Encontre as repúblicas no mapa:</Typography>
            <Typography variant='caption'>Clique nos marcadores vermelhos para ver detalhes</Typography>
          </MapButton>
          <div>
            <Link to="/republic-list">
              <Button variant="raised">Lista</Button>
            </Link>
            <Typography variant='body2'>Encontre as repúblicas em uma lista:</Typography>
            <Typography variant='caption'>Clique na foto da república para detalhes</Typography>
          </div>
        </ButtonWrapper>
      </div>
    );
  }
}
