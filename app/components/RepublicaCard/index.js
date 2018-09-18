/**
 *
 * RepublicaCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const StyledCardMedia = styled(CardMedia)`
  background-color: #4596ec;
  height: 140px;
`;

const StyleCard = styled(Card)`
  min-height: 300px;
  width: 100%;
`;

export class RepublicaCard extends React.PureComponent {
  render() {
    const { data } = this.props.republic;
    return (
      <StyleCard>
        <StyledCardMedia image={data.photoUrl} />
        <CardContent>
          <Typography variant="headline" component="h5">
            {data.name}
          </Typography>
          <Typography component="p">{data.description}</Typography>
          <Typography component="p">{data.address}</Typography>
        </CardContent>
      </StyleCard>
    );
  }
}

RepublicaCard.propTypes = {
  republic: PropTypes.object.isRequired,
};

export default RepublicaCard;
