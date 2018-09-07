/**
 *
 * RepublicaCard
 *
 */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const StyledCardMedia = styled(CardMedia)`
  background-color: aqua;
  height: 140px;
`;

const StyleCard = styled(Card)`
  max-width: 345px;
  max-height: 345px;
`;

const StyleButton = styled(Button)`
  margin-top: 20px;
`;

function RepublicaCard() {
  return (
    <StyleCard>
        <StyledCardMedia
            image="/static/images/cards/contemplative-reptile.jpg"
            title="Contemplative Reptile"
        />
      <CardContent>
        <Typography variant="headline" component="h5">
          República Copacabana
        </Typography>
        <Typography component="p">
            4 vagas disponíveis, vaga na garagem, próximo ao metro Sacomã, últimas vagas!!!
        </Typography>
        <Typography component="p">
            Rua Alameda, nº500 - Vila Mariana - SP
        </Typography>
        <StyleButton size="big" variant="contained" color="secondary">
          CANDIDATAR-SE
        </StyleButton>
      </CardContent>
    </StyleCard>
  );
}

RepublicaCard.propTypes = {};

export default RepublicaCard;
