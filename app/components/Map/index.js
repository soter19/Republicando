import { compose, withProps } from 'recompose';
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
} from 'react-google-maps';
import React from 'react';

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyA70pIpiayu0GmfYAvG1CP9UeeZZX2wMN4&v=3',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
)(props => (
  <GoogleMap defaultZoom={12} defaultCenter={{ lat: -23.573, lng: -46.635 }}>
    {props.markers &&
      props.markers.map(m => (
        <Marker
          position={{ ...m.location }}
          onClick={() => props.goToDetail(m.id)}
          title={m.data.name}
        />
      ))}
  </GoogleMap>
));

export default MyMapComponent;
