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
			candidates: [],
		};
	}

	componentWillMount(){

	}

	getCandidates = () => {
    const { id } = this.props.match.params;
    getOfferById(id).then((offer) => {
      const candidates = offer.candidates.map((clientId) => {
        return getClientFromId(clientId).then((snap) => ({
          id: snap.id,
          data: snap.data(),
        }))
      });
      Promise.all(candidates).then((candidates) => this.setState({ candidates }));
    })
	};

	handleApprove = ({ target }) => {
		const { id : candidateId } = target;
		const { id : offerId } = this.props.match.params;
		acceptCandidate(candidateId, offerId).then(() => this.getCandidates);
	};

	handleRefuse = ({ target }) => {
    const { id : candidateId } = target;
    const { id : offerId } = this.props.match.params;
    refuseCandidate(candidateId, offerId).then(() => this.getCandidates);
  };


  render() {
		const { candidates } = this.state;
    return (
			<div>
				<List
					component="nav"
					subheader={<ListSubheader component="div" color={"primary"} style={{ backgroundColor: 'white' }}>Candidatos</ListSubheader>}
				>
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
									id={candidate.id}
									variant="fab"
									mini
									color="primary"
									aria-label="Aprove"
                  onClick={this.handleApprove}
								>
                  <AproveIcon/>
                </ButtonIcon>
                <ButtonIcon
									id={candidate.id}
									variant="fab"
									mini
									color="secondary"
									aria-label="Delete"
                  onClick={this.handleRefuse()}
								>
                  <DeleteIcon/>
                </ButtonIcon>
              </ListItemSecondaryAction>
            </ListItem>
					))}
        </List>
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
