/**
 *
 * RepublicOffersPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import CardActions from "@material-ui/core/CardActions/CardActions";
import Button from "@material-ui/core/Button/Button";
import LoadingIndicator from "../../components/LoadingIndicator";
import styled from "styled-components";
import MUIListItem from "@material-ui/core/ListItem/ListItem";
import MUIList from "@material-ui/core/List/List";
import Card from "@material-ui/core/Card/Card";
import AddIcon from '@material-ui/icons/Add';
import {getOffers} from "../../api";
import Divider from "@material-ui/core/Divider/Divider";
import ListSubheader from "@material-ui/core/ListSubheader/ListSubheader";
import {push} from "react-router-redux";

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

const FloatButton = styled(Button)`
		position: fixed;
		bottom: 15px;
		right: 15px;
`;

const ButtonDiv = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 20px;
	margin: 10px;
	grid-template-rows: 30px;
	`;

export class RepublicOffersPage extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			offers: null,
		};
	}

	componentDidMount(){
		const { id } = this.props.match.params;
		if(!id) return;
		getOffers(id).then(offers => this.setState({ offers: offers.data }));
	}

	handleClick = () => {

	};

  render() {
		const { offers } = this.state;
		const { goToEditOffer, goToCreateOffer } = this.props;

		if(!offers) return <LoadingIndicator />;

		return (
			<div>
				<List subheader={<ListSubheader component="div" color={"primary"} style={{ backgroundColor: 'white' }}>Vagas</ListSubheader>}>
					<Divider/>
					{offers.map(offer => (
						<ListItem>
							<OfferCard>
								<CardContent>
									<Typography variant='headline'>{offer.data.name}</Typography>
									<Typography variant='caption'>{offer.data.description}</Typography>
									<Typography variant='button'>{offer.data.renderValue}</Typography>
								</CardContent>
								<ButtonDiv>
									<Button
										size="small"
										variant="flat"
										color="secondary"
									>
										APAGAR
									</Button>
									<Button
										size="small"
										variant="flat"
										color="primary"
										onClick={() => goToEditOffer(offer.id)}
									>
										EDITAR
									</Button>
								</ButtonDiv>
							</OfferCard>
						</ListItem>
					))}
				</List>
				<FloatButton variant="fab" color="primary" aria-label="Add" onClick={goToCreateOffer}>
					<AddIcon />
				</FloatButton>
			</div>
		);
  }
}

RepublicOffersPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
		goToEditOffer: offerId => dispatch(push(`/edit-offer/${offerId}`)),
		goToCreateOffer: offerId => dispatch(push(`/edit-offer/${offerId}`)),
	};
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(RepublicOffersPage);
