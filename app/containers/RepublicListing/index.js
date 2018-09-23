/**
 *
 * RepublicListing
 *
 */

import React, { Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { compose } from 'redux';
import RepublicCard from '../../components/RepublicCard';
import MUIList from '@material-ui/core/List';
import MUIListItem from '@material-ui/core/ListItem';
import { getRepublicsApi } from '../../api';
import { getCurrentUser } from '../../api/auth';
import { createStructuredSelector } from "reselect";
import { makeSelectFirestoreClients, makeSelectRepublics, makeSelectUserData } from '../App/selectors';
import { getRepublics } from '../App/actions';

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
export class RepublicListing extends React.PureComponent {
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
    const { republics, goToDetail } = this.props;
    return (
      <List>
        {republics.map(rep => (
          <ListItem button onClick={() => goToDetail(rep.id)}>
            <RepublicCard republic={rep} />
          </ListItem>
        ))}
      </List>
    );
  }
}

RepublicListing.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  clients: makeSelectFirestoreClients(),
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

export default compose(withConnect)(RepublicListing);
