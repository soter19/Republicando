/**
 *
 * MessagesAdminPage
 *
 */

import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ListSubheader from "@material-ui/core/ListSubheader/ListSubheader";
import LoadingIndicator from "../../components/LoadingIndicator";
import Divider from "@material-ui/core/Divider/Divider";
import NotificationCard from "../../components/NotificationCard";
import {getMessages} from "../../api";
import styled from "styled-components";
import MUIListItem from "@material-ui/core/ListItem/ListItem";
import Button from "@material-ui/core/Button";
import MUIList from "@material-ui/core/List/List";
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const ListItem = styled(MUIListItem)`
  width: 100%;
  padding: 5px;
`;

const List = styled(MUIList)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const FloatButton = styled(Button)`
		position: absolute;
		bottom: 15px;
		right: 15px;
`;

const PageWrapper = styled.div`
		position: relative;
		height: 90vh;
`;


/* eslint-disable react/prefer-stateless-function */
export class MessagesAdminPage extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			notifications: [],
			loading: true,
			open: false,
		};
	}

	componentDidMount(){
		const { id } = this.props.match.params;
		if(!id) return;
		getMessages(id).then(notifications => {
			this.setState({ notifications, loading: false });
		});
	}

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	handleCreateMessageClick = () => {
		this.setState({ open: false });
	};

	render() {
		const { notifications, loading } = this.state;
    return (
			<PageWrapper>
				{ notifications && (<List
					subheader={<ListSubheader component="div">Notificações</ListSubheader>}
				>
					{ loading && <LoadingIndicator /> }
					<Divider/>
					{notifications.map(notif => (
						<ListItem>
							<NotificationCard notification={notif}/>
						</ListItem>
					))}
				</List>)}
				<FloatButton variant="fab" color="primary" aria-label="Add" onClick={this.handleClickOpen}>
					<AddIcon />
				</FloatButton>
					<Dialog
						open={this.state.open}
						onClose={this.handleClose}
						aria-labelledby="form-dialog-title"
					>
						<DialogTitle id="form-dialog-title">Enviar menssagem</DialogTitle>
						<DialogContent>
							<DialogContentText>
								Insira as informações a baixo para enviar uma mensagem:
							</DialogContentText>
							<TextField
								autoFocus
								margin="dense"
								id="title"
								label="Título"
								type="text"
								fullWidth
							/>
							<TextField
								margin="dense"
								id="description"
								label="Mensagem"
								type="text"
								fullWidth
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={this.handleClose} color="primary">
								Cancelar
							</Button>
							<Button onClick={this.handleCreateMessageClick} color="primary">
								Enviar
							</Button>
						</DialogActions>
					</Dialog>
			</PageWrapper>
    );
  }
}

MessagesAdminPage.propTypes = {
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

export default compose(withConnect)(MessagesAdminPage);
