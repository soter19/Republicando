/**
 *
 * RepublicListingAdmin
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from "styled-components";
import MUIListItem from "@material-ui/core/ListItem/ListItem";
import MUIList from "@material-ui/core/List/List";
import RepublicCard from "../../components/RepublicCard";
import {createStructuredSelector} from "reselect";
import {makeSelectFirestoreClients, makeSelectRepublics, makeSelectUserData} from "../App/selectors";
import {push} from "react-router-redux";
import {getRepublics} from "../App/actions";
import ListSubheader from '@material-ui/core/ListSubheader/ListSubheader';
import Divider from '@material-ui/core/Divider/Divider';
import LoadingIndicator from '../../components/LoadingIndicator';

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

/* eslint-disable react/prefer-stateless-function */
export class RepublicListingAdmin extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		const { getRepublics, republics } = this.props;
		if(republics.length === 0){
			getRepublics();
		}
	}

	render() {
		const { republics, goToDetail, user } = this.props;
		const reps = republics.filter((r) => r.id === user.republicId); //TODO WILL BREAK WHEN ADMIN HAS MULTIPLE REPUBLIC IDS

		return (
			<List>
				<ListSubheader component="div" color={"primary"} style={{ backgroundColor: 'white' }}>Minhas Repúblicas</ListSubheader>
				<Divider/>
				{reps.length === 0 && <LoadingIndicator />}
				{reps.map(rep => (
					<ListItem button onClick={() => goToDetail(rep.id)}>
						<RepublicCard republic={rep} />
					</ListItem>
				))}
			</List>
		);
	}
}

RepublicListingAdmin.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
	user: makeSelectUserData(),
	republics: makeSelectRepublics(),
});

function mapDispatchToProps(dispatch) {
	return {
		dispatch,
		goToDetail: republicId => dispatch(push(`/republic-detail/${republicId}`)),
		getRepublics: () => getRepublics(dispatch),
	};
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps,
);

export default compose(withConnect)(RepublicListingAdmin);
