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
import {getMessages} from "../../api";
import {makeSelectUserData} from "../App/selectors";
import {createStructuredSelector} from "reselect";
import ListSubheader from "@material-ui/core/ListSubheader/ListSubheader";
import Divider from "@material-ui/core/Divider/Divider";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer/SwipeableDrawer";
import LoadingIndicator from '../../components/LoadingIndicator';


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

export class NotificationPage extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			notifications: [],
			loading: true,
		};
	}

	componentDidUpdate(prevProps){
		const { user } = this.props;
		if(prevProps.user !== user){
			getMessages(user.republicId).then(notifications => {
				const bla = notifications.reverse();
				this.setState({ notifications: bla, loading: false });
			});
		}
	}

	render() {
		const { notifications, loading } = this.state;
		const { user } = this.props;
		if(user && notifications.length === 0) {
			getMessages(user.republicId).then(notifications => {
        this.setState({ notifications, loading: false });
			});
		}
		return (
			<Fragment>
				{ notifications && (<List
					subheader={<ListSubheader component="div" color={"primary"} style={{ backgroundColor: 'white' }}>Mensagens</ListSubheader>}
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

NotificationPage.propTypes = {
	dispatch: PropTypes.func.isRequired,
};


const mapStateToProps = createStructuredSelector({
	user: makeSelectUserData(),
});

function mapDispatchToProps(dispatch) {
	return ({
		dispatch,
	});
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps,
);

export default compose(withConnect)(NotificationPage);
