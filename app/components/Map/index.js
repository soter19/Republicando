import React, { Fragment } from 'react';
import styled from 'styled-components';
import { compose, withProps, withStateHandlers} from 'recompose';
import SearchIcon from '@material-ui/icons/Search';
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
import { Typography, Button ,Card, TextField } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment';

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

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyA70pIpiayu0GmfYAvG1CP9UeeZZX2wMN4&libraries=places&v=3',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px`, position: 'relative' }} />,
    mapElement: <div style={{ height: `calc(100vh - 56px)` }} />,
  }),
  withStateHandlers(() => ({
    currentDetail: null,
    currSearch: '',
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
                <Typography variant='headline'>{m.data.name}</Typography>
                <Typography variant='body1'>{m.data.address}</Typography>
                <SeeMoreLink onClick={() => props.goToDetail(m.id)}>
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
    </GoogleMap>
  )
});

export default MyMapComponent;
