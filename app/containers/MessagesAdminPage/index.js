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
import {getNotifications} from "../../api";
import styled from "styled-components";
import MUIListItem from "@material-ui/core/ListItem/ListItem";
import MUIList from "@material-ui/core/List/List";

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

/* eslint-disable react/prefer-stateless-function */
export class MessagesAdminPage extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			notifications: [],
			loading: true,
		};
	}

	componentDidMount(){
		const { id } = this.props.match.params;
		if(!id) return;
		getNotifications(id).then(notifications => {
			this.setState({ notifications, loading: false });
		});
	}

  render() {
		const { notifications, loading } = this.state;
		const { user } = this.props;
		if(user && notifications.length === 0) {
			getNotifications(user.republicId).then(notifications => {
				this.setState({ notifications, loading: false });
			});
		}
    return (
			<Fragment>
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
			</Fragment>
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
