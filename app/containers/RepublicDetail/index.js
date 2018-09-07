/**
 *
 * RepublicDetail
 *
 */

import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import Card from "@material-ui/core/Card/Card";
import Button from "@material-ui/core/Button/Button";
import CasaImage from 'images/casa.jpg';
import Map from "../../components/Map";

const StyledCardMedia = styled(CardMedia)`
  width: 100%;
  height: 300px;
`;

const StyleCard = styled(Card)`
  max-width: 100%;
`;

const StyleButton = styled(Button)`
  margin-top: 20px;
  width: 100%;

`;

/* eslint-disable react/prefer-stateless-function */
export class RepublicDetail extends React.PureComponent {
  render() {
    return (
        <Fragment>
            <StyleCard>
                <StyledCardMedia
                    image={CasaImage}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography variant="headline" component="h5">
                        Casa para 4 pessoas
                    </Typography>
                    <Typography component="p">
                        4 vagas disponíveis, vaga na garagem, próximo ao metro Sacomã, últimas vagas!!!
                    </Typography>
                    <Typography component="p">Rua Alameda, nº500 - Vila Mariana</Typography>
                </CardContent>
            </StyleCard>
            <Map />
            <StyleButton size="small" variant="contained" color="primary">
                CANDIDATAR-SE
            </StyleButton>
        </Fragment>
    );
  }
}

RepublicDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(RepublicDetail);
