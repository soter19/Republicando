/**
 *
 * CandidatesListing
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import styled from "styled-components";
import MUIListItem from "@material-ui/core/ListItem/ListItem";
import MUIList from "@material-ui/core/List/List";
import DeleteIcon from '@material-ui/icons/close';
import PersonIcon from '@material-ui/icons/person';
import AproveIcon from '@material-ui/icons/check';
import Avatar from '@material-ui/core/Avatar';
import Card from "@material-ui/core/Card/Card";
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from "@material-ui/core/Divider/Divider";

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

const AvatarUser = styled(Avatar)`
  background-color: dodgerblue;
  width: 50px;
  height: 50px;
`;

const ButtonIcon = styled(Button)`
  margin: 5px;
`;

export class CandidatesListing extends React.PureComponent {
  render() {
    return (
			<div>
				<Title variant="title">Candidatos</Title>
				<List>
						<ListItem>
              <ListItemAvatar>
                <AvatarUser>
                  <PersonIcon />
                </AvatarUser>
              </ListItemAvatar>
              <ListItemText
									primary="Nome do candidato"
									secondary="Bio do candidato"
								/>
              <ListItemSecondaryAction>
								<ButtonIcon variant="fab" mini color="primary" aria-label="Aprove">
									<AproveIcon/>
								</ButtonIcon>
                <ButtonIcon variant="fab" mini color="secondary" aria-label="Delete">
                  <DeleteIcon/>
                </ButtonIcon>
              </ListItemSecondaryAction>
            </ListItem>
						<Divider/>




					<ListItem>
						<ListItemAvatar>
							<AvatarUser>
								<PersonIcon />
							</AvatarUser>
						</ListItemAvatar>
						<ListItemText
							primary="Nome do candidato"
							secondary="Bio do candidato"
						/>
						<ListItemSecondaryAction>
							<ButtonIcon variant="fab" mini color="primary" aria-label="Aprove">
								<AproveIcon/>
							</ButtonIcon>
							<ButtonIcon variant="fab" mini color="secondary" aria-label="Delete">
								<DeleteIcon/>
							</ButtonIcon>
						</ListItemSecondaryAction>
					</ListItem>
					<Divider/>
					<ListItem>
					<ListItemAvatar>
						<AvatarUser>
							<PersonIcon />
						</AvatarUser>
					</ListItemAvatar>
					<ListItemText
						primary="Nome do candidato"
						secondary="Bio do candidato"
					/>
					<ListItemSecondaryAction>
						<ButtonIcon variant="fab" mini color="primary" aria-label="Aprove">
							<AproveIcon/>
						</ButtonIcon>
						<ButtonIcon variant="fab" mini color="secondary" aria-label="Delete">
							<DeleteIcon/>
						</ButtonIcon>
					</ListItemSecondaryAction>
				</ListItem>
					<Divider/>
					<ListItem>
					<ListItemAvatar>
						<AvatarUser>
							<PersonIcon />
						</AvatarUser>
					</ListItemAvatar>
					<ListItemText
						primary="Nome do candidato"
						secondary="Bio do candidato"
					/>
					<ListItemSecondaryAction>
						<ButtonIcon variant="fab" mini color="primary" aria-label="Aprove">
							<AproveIcon/>
						</ButtonIcon>
						<ButtonIcon variant="fab" mini color="secondary" aria-label="Delete">
							<DeleteIcon/>
						</ButtonIcon>
					</ListItemSecondaryAction>
				</ListItem>
					<Divider/>
					<ListItem>
					<ListItemAvatar>
						<AvatarUser>
							<PersonIcon />
						</AvatarUser>
					</ListItemAvatar>
					<ListItemText
						primary="Nome do candidato"
						secondary="Bio do candidato"
					/>
					<ListItemSecondaryAction>
						<ButtonIcon variant="fab" mini color="primary" aria-label="Aprove">
							<AproveIcon/>
						</ButtonIcon>
						<ButtonIcon variant="fab" mini color="secondary" aria-label="Delete">
							<DeleteIcon/>
						</ButtonIcon>
					</ListItemSecondaryAction>
				</ListItem>
					<Divider/>
					<ListItem>
					<ListItemAvatar>
						<AvatarUser>
							<PersonIcon />
						</AvatarUser>
					</ListItemAvatar>
					<ListItemText
						primary="Nome do candidato"
						secondary="Bio do candidato"
					/>
					<ListItemSecondaryAction>
						<ButtonIcon variant="fab" mini color="primary" aria-label="Aprove">
							<AproveIcon/>
						</ButtonIcon>
						<ButtonIcon variant="fab" mini color="secondary" aria-label="Delete">
							<DeleteIcon/>
						</ButtonIcon>
					</ListItemSecondaryAction>
				</ListItem>
					<Divider/>
					<ListItem>
					<ListItemAvatar>
						<AvatarUser>
							<PersonIcon />
						</AvatarUser>
					</ListItemAvatar>
					<ListItemText
						primary="Nome do candidato"
						secondary="Bio do candidato"
					/>
					<ListItemSecondaryAction>
						<ButtonIcon variant="fab" mini color="primary" aria-label="Aprove">
							<AproveIcon/>
						</ButtonIcon>
						<ButtonIcon variant="fab" mini color="secondary" aria-label="Delete">
							<DeleteIcon/>
						</ButtonIcon>
					</ListItemSecondaryAction>
				</ListItem>
					<Divider/>
					<ListItem>
					<ListItemAvatar>
						<AvatarUser>
							<PersonIcon />
						</AvatarUser>
					</ListItemAvatar>
					<ListItemText
						primary="Nome do candidato"
						secondary="Bio do candidato"
					/>
					<ListItemSecondaryAction>
						<ButtonIcon variant="fab" mini color="primary" aria-label="Aprove">
							<AproveIcon/>
						</ButtonIcon>
						<ButtonIcon variant="fab" mini color="secondary" aria-label="Delete">
							<DeleteIcon/>
						</ButtonIcon>
					</ListItemSecondaryAction>
				</ListItem>
					<Divider/>
					<ListItem>
						<ListItemAvatar>
							<AvatarUser>
								<PersonIcon />
							</AvatarUser>
						</ListItemAvatar>
						<ListItemText
							primary="Nome do candidato"
							secondary="Bio do candidato"
						/>
						<ListItemSecondaryAction>
							<ButtonIcon variant="fab" mini color="primary" aria-label="Aprove">
								<AproveIcon/>
							</ButtonIcon>
							<ButtonIcon variant="fab" mini color="secondary" aria-label="Delete">
								<DeleteIcon/>
							</ButtonIcon>
						</ListItemSecondaryAction>
					</ListItem>
					<Divider/>
					<ListItem>
					<ListItemAvatar>
						<AvatarUser>
							<PersonIcon />
						</AvatarUser>
					</ListItemAvatar>
					<ListItemText
						primary="Nome do candidato"
						secondary="Bio do candidato"
					/>
					<ListItemSecondaryAction>
						<ButtonIcon variant="fab" mini color="primary" aria-label="Aprove">
							<AproveIcon/>
						</ButtonIcon>
						<ButtonIcon variant="fab" mini color="secondary" aria-label="Delete">
							<DeleteIcon/>
						</ButtonIcon>
					</ListItemSecondaryAction>
				</ListItem>
					<Divider/>
					<ListItem>
					<ListItemAvatar>
						<AvatarUser>
							<PersonIcon />
						</AvatarUser>
					</ListItemAvatar>
					<ListItemText
						primary="Nome do candidato"
						secondary="Bio do candidato"
					/>
					<ListItemSecondaryAction>
						<ButtonIcon variant="fab" mini color="primary" aria-label="Aprove">
							<AproveIcon/>
						</ButtonIcon>
						<ButtonIcon variant="fab" mini color="secondary" aria-label="Delete">
							<DeleteIcon/>
						</ButtonIcon>
					</ListItemSecondaryAction>
				</ListItem>
					<Divider/>


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
