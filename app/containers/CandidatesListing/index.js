/**
 *
 * CandidatesListing
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Button from "@material-ui/core/Button/Button";
import styled from "styled-components";
import MUIListItem from "@material-ui/core/ListItem/ListItem";
import MUIList from "@material-ui/core/List/List";
import DeleteIcon from '@material-ui/icons/close';
import PersonIcon from '@material-ui/icons/person';
import AproveIcon from '@material-ui/icons/check';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from "@material-ui/core/Divider/Divider";
import ListSubheader from '@material-ui/core/ListSubheader';
import { getOfferById, getClientFromId, acceptCandidate, refuseCandidate } from '../../api';
import LoadingIndicator from '../../components/LoadingIndicator';
import Snackbar from "@material-ui/core/Snackbar/Snackbar";

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

const ButtonIcon = styled(Button)`
  margin: 5px;
`;

export class CandidatesListing extends React.PureComponent {
	constructor(props){
		super(props);
		this.state = {
		  loading: true,
			candidates: [],
			snackbarText: 'Candidato aprovado com sucessso!',
			onFeedback: false,
		};
	}

	componentWillMount(){
    this.getCandidates();
	}

	getCandidates = () => {
    const { id } = this.props.match.params;
    getOfferById(id).then((offer) => {
      if(offer.candidates){
        const candidates = offer.candidates.map((clientId) => {
          return getClientFromId(clientId).then((snap) => ({
            id: snap.id,
            data: snap.data(),
          }))
        });
      Promise.all(candidates).then((candidates) => this.setState({ candidates, loading: false }));
    } else {
        this.setState({ loading: false });
      }
    })
	};

	handleApprove = (candidateId) => {
		const { id : offerId } = this.props.match.params;
		acceptCandidate(candidateId, offerId).then(() => this.getCandidates);
		this.setState({ onFeedback: true, snacbkarText: 'Candidato aprovado com sucessso!' });
	};

	handleRefuse = (candidateId) => {
    const { id : offerId } = this.props.match.params;
    refuseCandidate(candidateId, offerId).then(() => this.getCandidates);
		this.setState({ onFeedback: true, snackbarText: 'Candidato recusado com sucessso!'});
	};


  render() {
		const { candidates, loading, onFeedback, snackbarText } = this.state;
    return (
			<div>
				<List
					component="nav"
					subheader={<ListSubheader component="div" color={"primary"} style={{ backgroundColor: 'white' }}>Candidatos</ListSubheader>}
				>
          { loading && <LoadingIndicator />}
					{candidates.map((candidate) => (
            <ListItem>
              <ListItemAvatar>
                <AvatarUser>
                  <PersonIcon />
                </AvatarUser>
              </ListItemAvatar>
              <ListItemText
                primary={candidate.data.name}
                secondary={candidate.data.email}
              />
              <ListItemSecondaryAction>
                <ButtonIcon
									variant="fab"
									mini
									color="primary"
									aria-label="Aprove"
                  onClick={() => this.handleApprove(candidate.id)}
								>
                  <AproveIcon/>
                </ButtonIcon>
                <ButtonIcon
									variant="fab"
									mini
									color="secondary"
									aria-label="Delete"
                  onClick={() => this.handleRefuse(candidate.id)}
								>
                  <DeleteIcon/>
                </ButtonIcon>
              </ListItemSecondaryAction>
            </ListItem>
					))}
        </List>
				<Snackbar
					open={onFeedback}
					onClose={() => this.setState({ onFeedback: false })}
					autoHideDuration={2000}
					message={snackbarText}
				>
				</Snackbar>
			</div>
    );
  }
}

CandidatesListing.propTypes = {
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

export default compose(withConnect)(CandidatesListing);
