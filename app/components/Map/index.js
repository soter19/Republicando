import React, { Fragment } from 'react';
import styled from 'styled-components';
import { compose, withProps, withStateHandlers} from 'recompose';
import SearchIcon from '@material-ui/icons/Search';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import { Typography, Button ,Card, TextField } from '@material-ui/core';
import {
  GoogleMap,
  InfoWindow,
  Marker,
  withGoogleMap,
  withScriptjs,
} from 'react-google-maps';
import {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import PlacesAutocomplete from 'react-places-autocomplete';
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';

const SeeMoreLink = styled(Button).attrs({variant: 'raised'})`
  cursor: pointer;
  margin: 15px 0;
  transition: all 50ms linear;
  color: dodgerblue;
`;

const SearchBox = styled(Card)`
  position: absolute;
  top: 30px;
  width: 80%;
  left: 0;
  right: 0;
  margin: 0 auto;
  padding: 15px;
  
  & > input {
    width: 100%;
  }
`;

const LocationIconButton = styled(Button)`
  position: absolute;
  left: 10px;
  bottom: 10px;
`;

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyA70pIpiayu0GmfYAvG1CP9UeeZZX2wMN4&libraries=places&v=3',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ position: 'relative' }} />,
    mapElement: <div style={{ height: `calc(100vh - 56px)` }} />,
  }),
  withStateHandlers(() => ({
    currentDetail: null,
    currSearch: '',
    isGettingLocation: false,
    center: { lat: -23.573, lng: -46.635 },
    zoom: 12,
  }), {
    openDetails: () => ({ currentDetail, center }) => ({
      currentDetail,
      center,
    }),
    resetDetails: () => () => ({
      currentDetail: null,
    }),
    setSearch: () => (str) => ({
      currSearch: `${str}`,
    }),
    setCenter: () => (latLng) => ({
      center: latLng
    }),
    setZoom: () => (zoom) => ({
      zoom,
    }),
    toggleGettingLocation: ({ isGettingLocation }) => () => ({
      isGettingLocation: !isGettingLocation,
    })
  }),
  withScriptjs,
  withGoogleMap,
)(props => {
  const translateCenter = async (address) => {
    props.setSearch(address);
    const geocode = (await geocodeByAddress(address))[0];
    let zoom = 12;
    switch(geocode.types.length) {
      case 1:
        zoom = 18;
        break;
      case 2:
        zoom = 13;
        break;
      case 3:
        zoom = 14;
        break;
      case 4:
        zoom = 2;
        break;
      default:
        break;
    };
    const latLng = await getLatLng(geocode);
    props.setZoom(zoom);
    props.setCenter(latLng);
  };
  const getGeoLocation = () => {
    if (navigator.geolocation) {
      props.toggleGettingLocation();
      navigator.geolocation.getCurrentPosition(
        position => {
          props.setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          props.toggleGettingLocation();
        },
        (error) => {
          console.error(error);
          props.toggleGettingLocation();
        }
      )
    }
  };
  return (
    <GoogleMap
      zoom={props.zoom}
      center={props.center}
      defaultOptions={{
        // these following 7 options turn certain controls off see link below
        streetViewControl: false,
        scaleControl: false,
        mapTypeControl: false,
        panControl: false,
        zoomControl: true,
        rotateControl: false,
        fullscreenControl: false
      }}
    >
      {props.markers &&
      props.markers.map(m => (
        <Marker
          key={m.id}
          position={{ ...m.location }}
          onClick={() => props.openDetails({ currentDetail: m.id, center: m.location })}
          title={m.data.name}
        >
          { props.currentDetail === m.id ? (
            <InfoWindow
              onCloseClick={props.resetDetails}
              options={{
                maxWidth: 300,
              }}
            >
              <Fragment>
                <Typography variant='subheading'>{m.data.name}</Typography>
                <Typography variant='body1'>{m.data.description.substring(0, 120)}...</Typography>
                <Typography variant='body1'>{m.data.address}</Typography>
                <SeeMoreLink onClick={() => props.goToDetail(m.id)} fullWidth>
                  Ver mais detalhes
                </SeeMoreLink>
              </Fragment>
            </InfoWindow>
          ) : null
          }
        </Marker>
      ))}
      <PlacesAutocomplete
        value={props.currSearch}
        onChange={props.setSearch}
        onSelect={translateCenter}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <SearchBox>
            <TextField
              fullWidth
              {...getInputProps({
                placeholder: 'Busque por locais',
                className: 'location-search-input',
              })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </SearchBox>
        )}
      </PlacesAutocomplete>
      <LocationIconButton onClick={getGeoLocation} variant="fab">
        { props.isGettingLocation ? (<CircularProgress />) : (<MyLocationIcon />)}
      </LocationIconButton>
    </GoogleMap>
  )
});

export default MyMapComponent;
