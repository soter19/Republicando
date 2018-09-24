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
import {getRepublic, applyToOffer, getOffers, getMe, getNotifications, getAllTags} from '../../api';
import LoadingIndicator from '../../components/LoadingIndicator';
import {makeSelectUserData} from "../App/selectors";
import {createStructuredSelector} from "reselect";

const settings = {
  dots: true,
  arrows: false,
  centerMode: true,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1
};

const StyledCardMedia = styled(CardMedia)`
  margin: 10px;
  min-width: 90%;
  height: 300px;
`;

const StyleCard = styled(Card)`
  max-width: 100%;
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
export class RepublicDetail extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      republic: null,
      offerFeedback: undefined,
      clientIsFromThisRepublic: false,
			chipTags: [

			],
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
    const { user } = this.props;
    applyToOffer(id, user.id).then(() => {
      this.setState({ offerFeedback: true });
    });
  };

  render() {
    const { republic, offerFeedback, offers, clientIsFromThisRepublic, chipTags } = this.state;
    if (!republic) return (<LoadingIndicator/>);

    return (
      <div style={{ padding: '10px'}}>
				<Title variant='title'>{republic.data.name}</Title>
        <StyledCardMedia image={republic.data.photoUrl} />
          <CardContent>
            <Typography variant="headline" component="h5">
              {republic.data.title}
            </Typography>
            <Typography component="p" variant='title'>Descrição:</Typography>
            <Typography component="p" variant='subheading'>{republic.data.description}</Typography>
            <hr style={{ margin: '10px 0' }}/>
            <Typography component="p" variant='body2'><b>Endereço:</b> {republic.data.address}</Typography>
          </CardContent>
          <div>
						<Title variant="title">Características</Title>
            {chipTags.map( tags => (
							<ChipTags label={tags.label}/>
						))}
          </div>
        {!clientIsFromThisRepublic && (
          <div>
						<Title variant="title">Vagas</Title>
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
        )
        }

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
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    goToHomePage: () => dispatch(push('/')),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(RepublicDetail);
