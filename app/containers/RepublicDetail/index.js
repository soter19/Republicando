/**
 *
 * RepublicDetail
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { compose } from 'redux';
import Snackbar from '@material-ui/core/Snackbar';
import CardContent from '@material-ui/core/CardContent/CardContent';
import Typography from '@material-ui/core/Typography/Typography';
import CardMedia from '@material-ui/core/CardMedia/CardMedia';
import Card from '@material-ui/core/Card/Card';
import Button from '@material-ui/core/Button/Button';
import RefreshIcon from '@material-ui/icons/Refresh'
import Map from '../../components/Map';
import { getRepublic, applyToOffer, getOffers } from '../../api';

const StyledCardMedia = styled(CardMedia)`
  width: 100%;
  height: 300px;
`;

const StyleCard = styled(Card)`
  max-width: 100%;
`;

/* eslint-disable react/prefer-stateless-function */
export class RepublicDetail extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      republic: null,
      offerFeedback: undefined,
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    if (!id) {
      this.props.goToHomePage();
    }
    getRepublic(id).then(republic => {
      this.setState({ republic });
    });
    getOffers(id).then(offers => this.setState({ offers: offers.data }));
  }

  handleApply = (id) => {
    applyToOffer(id).then(() => {
      this.setState({ offerFeedback: true });
    });
  };

  render() {
    const { republic, offerFeedback, offers } = this.state;
    if (!republic) return false;

    return (
      <div style={{ padding: '10px'}}>
        <StyleCard>
          <StyledCardMedia image={republic.data.photoUrl} />
          <CardContent>
            <Typography variant="headline" component="h5">
              {republic.data.title}
            </Typography>
            <Typography component="p" variant='subheading'>Descrição:</Typography>
            <Typography component="p">{republic.data.description}</Typography>
            <hr style={{ margin: '10px 0' }}/>
            <Typography component="p"><b>Endereço:</b> {republic.data.address}</Typography>
            <Typography component="p"><b>Aluguel:</b> R${republic.data.rentValue},00</Typography>
          </CardContent>
        </StyleCard>
        <hr />
        <Typography variant="title">Vagas</Typography>
        {offers &&
          offers.map((offer, i) => (
            <Fragment>
              <p>
                {i + 1} - {offer.data.name} - {offer.data.description}
              </p>
              <Button
                size="small"
                variant="contained"
                color="primary"
                disabled={offerFeedback === false}
                onClick={() => this.handleApply(offer.id)}
              >
                CANDIDATAR-SE
              </Button>
            </Fragment>
          ))}
        <Snackbar
          open={offerFeedback}
          autoHideDuration={2000}
          onClose={() => this.setState({ offerFeedback: false })}
          message={<span>Vaga Candidatada com Sucesso</span>}
        />
      </div>
    );
  }
}

RepublicDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    goToHomePage: () => dispatch(push('/')),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(RepublicDetail);
