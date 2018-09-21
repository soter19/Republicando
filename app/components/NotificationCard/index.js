/**
 *
 * NotificationCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import CardContent from "@material-ui/core/CardContent/CardContent";
import Card from "@material-ui/core/Card/Card";

const StyleCard = styled(Card)`
  min-height: 70px;
  width: 100%;
`;

class NotificationCard extends React.PureComponent {
	render() {
		const {notification} = this.props;
		console.log(this.props)
		return (
			<StyleCard>
				<CardContent>
					<Typography variant="headline" component="h5">{notification.title}</Typography>
					<Typography component="p">{notification.description}</Typography>
				</CardContent>
			</StyleCard>
		);
	}
}

NotificationCard.propTypes = {
	notification: PropTypes.object.isRequired,
};

export default NotificationCard;
