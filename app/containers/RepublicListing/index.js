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
import { createStructuredSelector } from "reselect";
import {
  makeSelectFirestoreClients, makeSelectLoading,
  makeSelectRepublics,
  makeSelectUserData,
} from '../App/selectors';
import { getRepublics } from '../App/actions';
import { DefaultNavBar } from '../../components/Header/NavBar';
import IconButton from '@material-ui/core/IconButton/IconButton';
import FilterIcon from '@material-ui/icons/FilterList';
import FilterDialog from '../../components/FilterDialog';
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

const NavBar = styled.div`
  display: grid;
`;


const HomePageAppBar = ({ action }) => (
  <DefaultNavBar>
    <NavBar>
      <IconButton
        color="inherit"
        onClick={action}
      >
        <FilterIcon />
      </IconButton>
    </NavBar>
  </DefaultNavBar>
);

/* eslint-disable react/prefer-stateless-function */
export class RepublicListing extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      filterIsOpen: false,
      isLoading: true,
    }
  }

  toggleFilterDialog = () => {
    this.setState({filterIsOpen: !this.state.filterIsOpen})
  };

  componentWillMount() {
    const { getRepublics, republics } = this.props;
    if(republics.length === 0){
      getRepublics();
    }
  }

  render() {
    const { republics, isLoading, goToDetail } = this.props;
    return (
      <Fragment>
        { isLoading && <LoadingIndicator />}
        <List>
          <HomePageAppBar action={this.toggleFilterDialog} />
          {republics.map(rep => (
            <ListItem button onClick={() => goToDetail(rep.id)}>
              <RepublicCard republic={rep} />
            </ListItem>
          ))}
          <FilterDialog
            isOpen={this.state.filterIsOpen}
            onClose={this.toggleFilterDialog}
          />
        </List>
      </Fragment>
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
  isLoading: makeSelectLoading(),
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
