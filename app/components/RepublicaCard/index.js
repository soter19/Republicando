/**
 *
 * RepublicaCard
 *
 */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { applyToOffer } from '../../api';

const StyledCardMedia = styled(CardMedia)`
  background-color: aqua;
  height: 140px;
`;

const StyleCard = styled(Card)`
  min-height: 360px;
  width: 100%;
`;

const StyleButton = styled(Button)`
  margin-top: 20px;
`;

export class RepublicaCard extends React.PureComponent {
  handleApply = () => {
    applyToOffer(this.props.republic.id);
  };

  render() {
    const { data } = this.props.republic;
    return (
      <StyleCard>
        <StyledCardMedia image={data.photoUrl} title="Contemplative Reptile" />
        <CardContent>
          <Typography variant="headline" component="h5">
            {data.title}
          </Typography>
          <Typography component="p">{data.description}</Typography>
          <Typography component="p">{data.address}</Typography>
          <StyleButton
            size="big"
            variant="contained"
            color="secondary"
            onClick={this.handleApply}
          >
            CANDIDATAR-SE
          </StyleButton>
        </CardContent>
      </StyleCard>
    );
  }
}

RepublicaCard.propTypes = {};

export default RepublicaCard;
