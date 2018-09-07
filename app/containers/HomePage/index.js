/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { withFirestore } from 'react-redux-firebase';
import WhiteTextField from 'components/WhiteTextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Map from 'components/Map';
import Geocode from "react-geocode";


import injectReducer from 'utils/injectReducer';
import reducer from './reducer';

import { makeSelectFirestoreClients } from '../App/selectors';
import { DefaultNavBar } from '../../components/Header/NavBar';
import { getRepublics } from '../../api';

const NavBar = styled.div`
  display: grid;
`

const HomePageAppBar = ({ onChange }) => (
  <DefaultNavBar>
    <NavBar>
      <WhiteTextField
        onChange={onChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </NavBar>
  </DefaultNavBar>
);

export class HomePage extends React.PureComponent {
  constructor(props){
    super(props);
    this.state = {
      republics: [],
      markers: [],
    }
  }
  componentWillMount() {
    Geocode.setApiKey("AIzaSyA70pIpiayu0GmfYAvG1CP9UeeZZX2wMN4");
    getRepublics().then(async (republics) => {
      const res = await republics.map( async (rep) => {
        return {...rep, location: this.latLongFromPayload(await Geocode.fromAddress(rep.data.address))}
      });
      Promise.all(res).then((test) => {
        this.setState({republics: test})
      })
    });
  }

  latLongFromPayload(payload){
    return payload.results[0].geometry.location;
  }

  handleSearch({ target }) {
    if(!target.value || target.value.length < 5) return;
    // Geocode.fromAddress(target.value).then(this.latLongFromPayload)
  }

  render() {
    return (
      <Fragment>
        <HomePageAppBar onChange={this.handleSearch} />
        <Map
          markers={this.state.republics}
        />
      </Fragment>
    );
  }
}

HomePage.propTypes = {
  firestore: PropTypes.object,
  clients: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  clients: makeSelectFirestoreClients(),
});

const withConnect = connect(mapStateToProps);

const withReducer = injectReducer({ key: 'home', reducer });

export default compose(
  withReducer,
  withConnect,
  withFirestore,
)(HomePage);
