/**
 *
 * OfferListing
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Typography from "@material-ui/core/Typography/Typography";
import CardContent from "@material-ui/core/CardContent/CardContent";
import CardActions from "@material-ui/core/CardActions/CardActions";
import MUIList from '@material-ui/core/List';
import MUIListItem from '@material-ui/core/ListItem';
import Button from "@material-ui/core/Button/Button";
import styled from "styled-components";
import Card from "@material-ui/core/Card/Card";
import { getMyOffers, getOfferById, unapplyToOffer } from '../../api';
import { createStructuredSelector } from "reselect";
import { makeSelectUserData } from '../App/selectors';
import LoadingIndicator from '../../components/LoadingIndicator';

const ListItem = styled(MUIListItem)`
  width: 100%;
  padding: 10px;
`;

const List = styled(MUIList)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Title = styled(Typography)`
  padding: 10px;
`;


const OfferCard = styled(Card)`
  min-width: 100%;
  min-height: 120px;
`;

export class OfferListing extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			offers: null,
		};
	}

	componentDidUpdate(prevProps) {
	  const { user } = this.props;
	  if(prevProps.user !== user){
      const { offers } = user;
      Promise.all(offers.map(getOfferById)).then((offers) => this.setState({ offers }));
    }
  }

  handleUnaply = (offerId) => {
		const { id : clientId } = this.props.user;

    unapplyToOffer(offerId , clientId).then(() => {
    	const newOffers = this.state.offers.filter((o) => o.id !== offerId);
			this.setState({ offers: newOffers });
		});
  }

  render() {
		const { offers } = this.state;

		if(!offers) return <LoadingIndicator />;

		return (<div>
			<Title variant="title">Minhas Vagas</Title>
				<List>
					{offers.map(offer => (
						<ListItem>
							<OfferCard>
								<CardContent>
									<Typography variant='headline'>{offer.name}</Typography>
									<Typography variant='caption'>{offer.description}</Typography>
				          <Typography variant='button'>{offer.renderValue}</Typography>
                </CardContent>
								<CardActions>
									<Button
										size="small"
										variant="flat"
										color="primary"
                    onClick={() => this.handleUnaply(offer.id)}
									>
										DESCANDIDATAR-SE
									</Button>
								</CardActions>
							</OfferCard>
						</ListItem>
					))}
				</List>
		</div>
    );
  }
}

OfferListing.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUserData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(OfferListing);
