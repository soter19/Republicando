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

import { makeSelectFirestoreClients } from '../App/selectors';
import { DefaultNavBar } from '../../components/Header/NavBar';
import { getRepublics } from '../../api';

const NavBar = styled.div`
  display: grid;
`;

const HomePageAppBar = () => (
  <DefaultNavBar>
    <NavBar />
  </DefaultNavBar>
);

export class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      republics: [],
    };
  }
  componentWillMount() {
    Geocode.setApiKey('AIzaSyA70pIpiayu0GmfYAvG1CP9UeeZZX2wMN4');
    getRepublics().then(async republics => {
      const res = await republics.map(async rep => ({
        ...rep,
        location: this.latLongFromPayload(
          await Geocode.fromAddress(rep.data.address),
        ),
      }));
      Promise.all(res).then(response => {
        this.setState({ republics: response });
      });
    });
  }

  latLongFromPayload(payload) {
    return payload.results[0].geometry.location;
  }

  render() {
    return (
      <Fragment>
        <HomePageAppBar />
        <Map
          goToDetail={this.props.goToDetail}
          markers={this.state.republics}
        />
      </Fragment>

    );
  }
}

HomePage.propTypes = {};

const mapStateToProps = createStructuredSelector({
  clients: makeSelectFirestoreClients(),
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
