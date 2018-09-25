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
import Chip from '@material-ui/core/Chip';
import Slider from "react-slick";
import CardActions from '@material-ui/core/CardActions/CardActions';
import {getRepublic, applyToOffer, getOffers, getMe, getMessages, getAllTags, getClientsByRepublicId} from '../../api';
import LoadingIndicator from '../../components/LoadingIndicator';
import {makeSelectUserData, makeSelectUserType} from "../App/selectors";
import {createStructuredSelector} from "reselect";
import Divider from "@material-ui/core/Divider/Divider";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import PersonIcon from '@material-ui/icons/person';
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import MUIListItem from "@material-ui/core/ListItem/ListItem";
import MUIList from "@material-ui/core/List/List";
import Avatar from "@material-ui/core/Avatar/Avatar";
import ListSubheader from "@material-ui/core/ListSubheader/ListSubheader";
import {SET_OFFERS} from "../App/constants";

const settings = {
  dots: true,
  arrows: false,
  centerMode: true,
  speed: 500,
  infinite: false,
};

const StyledCardMedia = styled(CardMedia)`
  margin: 10px;
  min-width: 90%;
  height: 300px;
`;

const OfferCard = styled(Card)`
  max-width: 97%;
  max-height: 400px;
  
  &:focus {
    outline: unset;
  }
`;

const Title = styled(Typography)`
  margin: 10px;
`;

const ChipTags = styled(Chip)`
  margin: 4px;
`;

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

const AvatarUser = styled(Avatar)`
  background-color: dodgerblue;
  width: 50px;
  height: 50px;
`;

const ButtonDiv = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 20px;
	margin: 0px 10px;
	grid-template-rows: 50px;
	`;

export class RepublicDetail extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      republic: null,
      offerFeedback: undefined,
      clientIsFromThisRepublic: false,
			chipTags: [],
			clients: [],
		};
  }

  componentDidMount() {
    const { match, user} = this.props;
		const { id } = match.params;
    if (!id) {
      this.props.goToHomePage();
    }
    getRepublic(id).then(republic => {
      this.setState({ republic });
			getClientsByRepublicId(republic.id).then(clients => this.setState({
				clients: clients
			}));
			getAllTags().then((tags, i) => {
			  const chipTags = Object.keys(republic.data.tags).map(tag => {
					return {
					  key: i,
					  label: tags.find((t) => t.id === tag).name,
					}
				});
				this.setState({ chipTags });
			});
    });
    getOffers(id).then(offers => this.setState({ offers: offers.data }));
		if(user) {
			this.setState({ clientIsFromThisRepublic: id === user.republicId })
    }
  }

	componentDidUpdate(prevProps){
		const { user, match } = this.props;
		const { id } = match.params;
		if(prevProps.user !== user){
			this.setState({ clientIsFromThisRepublic: id === user.republicId })
		}
	}

  handleApply = (id) => {
    const { user, dispatch } = this.props;
    applyToOffer(id, user.id).then(() => {
      this.setState({ offerFeedback: true });
      dispatch({
				type: SET_OFFERS,
				payload: {
					offers: [...user.offers, id]
				}
			})
    });
  };

  render() {
    const { republic, offerFeedback, offers, clientIsFromThisRepublic, chipTags, clients } = this.state;
    const { userType, goToMessages, goToOffers } = this.props;
    const isAdmin = userType === 'admins';
    if (!republic) return (<LoadingIndicator/>);

    return (
      <div style={{ padding: '10px'}}>
				<Title variant='subheading'>{republic.data.name}</Title>
        <StyledCardMedia image={republic.data.photoUrl} />
          <CardContent>
            <Typography variant="headline" component="h5">
              {republic.data.title}
            </Typography>
            <Typography component="p" variant='subheading'><b>Descrição:</b></Typography>
            <Typography component="p" variant='body2'>{republic.data.description}</Typography>
						<Typography component="p" variant='subheading'><b>Endereço:</b></Typography>
						<Typography component="p" variant='body2'>{republic.data.address}</Typography>
          </CardContent>

          <div>
						<Divider/>
						<ListSubheader component="div" color={"primary"} style={{ backgroundColor: 'inherit' }}>Características</ListSubheader>
            {chipTags.map( tags => (
							<ChipTags label={tags.label}/>
						))}
          </div>

        {!isAdmin && !clientIsFromThisRepublic ? (
          <div>
						<Divider/>
						<ListSubheader component="div" color={"primary"} style={{ backgroundColor: 'inherit' }}>Vagas</ListSubheader>
						<Slider {...settings}>
							{offers &&
							offers.map(offer => (
								<OfferCard>
									<CardContent>
										<Typography variant='body1'>{offer.data.name}</Typography>
										<Typography variant='caption'>{offer.data.description}</Typography>
                    <Typography variant='button'>R${offer.data.rentValue},00</Typography>
                  </CardContent>
									<CardActions>
										<Button
											size="small"
											variant="flat"
											color="primary"
											disabled={offerFeedback === false}
											onClick={() => this.handleApply(offer.id)}
										>
											CANDIDATAR-SE
										</Button>
									</CardActions>
								</OfferCard>
							))}
						</Slider>
          </div>
        ) : (
					<List>
						<Divider/>
						<ListSubheader component="div" color={"primary"} style={{ backgroundColor: 'inherit' }}>Moradores</ListSubheader>
						{ clients &&
							clients.map(client => (
								<ListItem>
									<ListItemAvatar>
										<AvatarUser>
											<PersonIcon />
										</AvatarUser>
									</ListItemAvatar>
									<ListItemText
										primary={client.data.name}
										secondary={client.data.email}
									/>
								</ListItem>
						))}
					</List>
				)}
				{ isAdmin && (
					<ButtonDiv>
						<Button variant="outlined" color="primary" onClick={() => goToMessages(republic.id)}>
							Mensagens
						</Button>
						<Button variant="outlined" color="primary" onClick={() => goToOffers(republic.id)}>
							Vagas
						</Button>
					</ButtonDiv>
				)}

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

const mapStateToProps = createStructuredSelector({
  user: makeSelectUserData(),
	userType: makeSelectUserType(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    goToHomePage: () => dispatch(push('/')),
		goToMessages: republicId => dispatch(push(`/messagesAdmin/${republicId}`)),
		goToOffers: republicId => dispatch(push(`/republic-offers/${republicId}`)),
	};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(RepublicDetail);
