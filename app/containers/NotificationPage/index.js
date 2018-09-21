/**
 *
 * NotificationPage
 *
 */

import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import NotificationCard from '../../components/NotificationCard';
import {connect} from 'react-redux';
import {compose} from 'redux';
import styled from "styled-components";
import MUIListItem from "@material-ui/core/ListItem/ListItem";
import MUIList from "@material-ui/core/List/List";
import Typography from "@material-ui/core/Typography/Typography";
import {getNotifications} from "../../api";

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

export class NotificationPage extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			notifications: [],
		};
	}

	componentWillMount() {
		getNotifications().then(notifications => {
			this.setState({ notifications });
		});
	}

	render() {
		const {notifications} = this.state;
		return (
			<List>
				{notifications && notifications.map(notif => (
					<ListItem>
						<NotificationCard notification={notif}/>
					</ListItem>
				))}
			</List>
		);
	}
}

NotificationPage.propTypes = {
	dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
	return ({
		dispatch
	});
}

const withConnect = connect(
	null,
	mapDispatchToProps,
);

export default compose(withConnect)(NotificationPage);
