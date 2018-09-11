import React from 'react';
import styled from 'styled-components';
import { compose, withProps, withStateHandlers} from 'recompose';
import {
  GoogleMap, InfoWindow,
  Marker,
  withGoogleMap,
  withScriptjs,
} from 'react-google-maps';
import { Typography } from '@material-ui/core';

const SeeMoreLink = styled.div`
  cursor: pointer;
  margin: 15px 0;
  transition: all 50ms linear;
  color: dodgerblue;
`

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyA70pIpiayu0GmfYAvG1CP9UeeZZX2wMN4&v=3',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `calc(100vh - 56px)` }} />,
  }),
  withStateHandlers(() => ({
    currentDetail: null
  }), {
    openDetails: () => ({ currentDetail }) => ({
      currentDetail,
    }),
    resetDetails: () => () => ({
      currentDetail: null,
    })
  }),
  withScriptjs,
  withGoogleMap,
)(props => (
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat: -23.573, lng: -46.635 }}
    defaultOptions={{
      // these following 7 options turn certain controls off see link below
      streetViewControl: false,
      scaleControl: false,
      mapTypeControl: false,
      panControl: false,
      zoomControl: false,
      rotateControl: false,
      fullscreenControl: false
    }}
  >
    {props.markers &&
      props.markers.map(m => (
        <Marker
          key={m.id}
          position={{ ...m.location }}
          onClick={() => props.openDetails({ currentDetail: m.id })}
          title={m.data.name}
        >
          { props.currentDetail === m.id ? (
            <InfoWindow
              onCloseClick={props.resetDetails}
              options={{
                maxWidth: 300,
              }}
            >
              <div>
                <Typography variant='body1'>Nome: {m.data.name}</Typography>
                <Typography variant='body1'>Endereço: {m.data.address}</Typography>
                <SeeMoreLink onClick={() => props.goToDetail(m.id)}>
                  Ver mais detalhes
                </SeeMoreLink>
              </div>
            </InfoWindow>
          ) : null
          }
        </Marker>
      ))}
  </GoogleMap>
));

export default MyMapComponent;
