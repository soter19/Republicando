/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { Fragment } from 'react';
import { push } from 'react-router-redux';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import Map from 'components/Map';
import Geocode from 'react-geocode';

import {makeSelectFirestoreClients, makeSelectUserData} from '../App/selectors';
import { DefaultNavBar } from '../../components/Header/NavBar';
import { getRepublics } from '../../api';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton/IconButton';
import FilterIcon from '@material-ui/icons/FilterList';
import FilterDialog from '../../components/FilterDialog';

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
    Geocode.setApiKey('AIzaSyA70pIpiayu0GmfYAvG1CP9UeeZZX2wMN4');
    getRepublics().then(async republics => {
      const res = await republics.map(async rep => ({
        ...rep,
        location: (await Geocode.fromAddress(rep.data.address)).results[0].geometry.location,
      }));
      Promise.all(res).then(response => {
        this.setState({ republics: response });
      });
    });
  }

  toggleFilterDialog = () => {
    const { filterIsOpen: old } = this.state;
    this.setState({ filterIsOpen: !old })
  };

  render() {
    console.log(this.props.user);
    return (
      <Fragment>
        <HomePageAppBar action={this.toggleFilterDialog} />
        <Map
          goToDetail={this.props.goToDetail}
          markers={this.state.republics}
        />
        <FilterDialog
          isOpen={this.state.filterIsOpen}
          onClose={this.toggleFilterDialog}
        />
      </Fragment>

    );
  }
}

HomePage.propTypes = {};

const mapStateToProps = createStructuredSelector({
  clients: makeSelectFirestoreClients(),
  user: makeSelectUserData(),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  goToDetail: republicId => dispatch(push(`/republic-detail/${republicId}`)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(HomePage);
