/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import Map from 'components/Map';

import { makeSelectFirestoreClients, makeSelectRepublics, makeSelectUserData } from '../App/selectors';
import { DefaultNavBar } from '../../components/Header/NavBar';
import IconButton from '@material-ui/core/IconButton/IconButton';
import FilterIcon from '@material-ui/icons/FilterList';
import FilterDialog from '../../components/FilterDialog';
import { getRepublics } from '../App/actions';

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

export class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      republics: [],
      filterIsOpen: false,
    };
  }
  componentWillMount() {
    const { getRepublics } = this.props;
    getRepublics();
  }

  toggleFilterDialog = () => {
    const { filterIsOpen: old } = this.state;
    this.setState({ filterIsOpen: !old })
  };

  render() {
    return (
      <Fragment>
        <HomePageAppBar action={this.toggleFilterDialog} />
        <Map
          goToDetail={this.props.goToDetail}
          markers={this.props.republics}
        />
        <FilterDialog
          isOpen={this.state.filterIsOpen}
          onClose={this.toggleFilterDialog}
        />
      </Fragment>

    );
  }
}

HomePage.propTypes = {
  republics: PropTypes.array.isRequired,
  getRepublics: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  clients: makeSelectFirestoreClients(),
  user: makeSelectUserData(),
  republics: makeSelectRepublics(),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  goToDetail: republicId => dispatch(push(`/republic-detail/${republicId}`)),
  getRepublics: () => getRepublics(dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(HomePage);
