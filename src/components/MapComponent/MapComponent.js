import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { Typography, Button } from '@material-ui/core'
import locationIcon from './baseline-my_location-24px.svg'
import { connect } from 'react-redux';
import { Map, InfoWindow, Marker, Polyline, GoogleApiWrapper } from 'google-maps-react';
import RateModal from '../RateModal/RateModal'

class MapComponent extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    open:false
  };

  handleClose = () => {
    this.setState({ open: false, });
  };

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
    this.props.dispatch({ type: 'SET_SELECTED_BATHROOM', payload: props.bathroom })
  }

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
      })
      this.props.dispatch({ type: "CLEAR_SELECTED_BATHROOM" })
    }
  };
  //Below is a workaround to get around react-google-maps not dealing well with callback functions in an info window
  onInfoWindowOpen(props, e) {
    const content = (
      <div>
        <Typography variant="h6">{this.state.selectedPlace.name}</Typography>
        <Typography variant="body1">{this.state.selectedPlace.address}</Typography>
        <br />
        <Typography variant="body1">
          Additional Directions: {!this.state.selectedPlace.additionalDirections ?
            "none" : this.state.selectedPlace.additionalDirections}
        </Typography>
        <span>
          <Button onClick={this.onDirectionsClick}>Directions</Button>
          {this.props.user ? <Button onClick={this.onRateClick}>Rate</Button> : <></>}
        </span>
      </div>
    );
    ReactDOM.render(
      React.Children.only(content),
      document.getElementById("iwc")
    );
  }

  onDirectionsClick = () => {
    this.props.dispatch({
      type: 'GET_DIRECTIONS',
      payload:
      {
        origin: this.props.location,
        destination: this.state.selectedPlace.position
      }
    });
  }
  onRateClick = () => {
    this.setState({open:true})

  }

  render() {
    const mapStyle = {
      height: '50vh',
      width: '100%',
      position: 'relative'
    }
    // const bounds = new this.props.google.maps.LatLngBounds();
    // if (this.props.gottaGo === false) {
    //     for (let i = 0; i < this.props.bathrooms.length; i++) {
    //         bounds.extend({ lat: this.props.bathrooms[i].latitude, lng: this.props.bathrooms[i].longitude });
    //     }
    // } else {
    //     bounds.extend({ lat: this.props.bathrooms[0].latitude, lng: this.props.bathrooms[0].longitude })
    // };
    // bounds.extend({ lat: this.props.location.latitude, lng: this.props.location.longitude })
    return (

      <div style={mapStyle}>
        <Map google={this.props.google} style={mapStyle} zoom={14}
          initialCenter={{ lat: this.props.location.latitude, lng: this.props.location.longitude }}
          containerStyle={mapStyle}
          onClick={this.onMapClicked}
          mapTypeControl={false}
          fullscreenControl={false}
        // bounds={bounds}
        >
          <Marker
            icon={locationIcon}
            position={
              {
                lat: this.props.location.latitude,
                lng: this.props.location.longitude
              }
            } />
          {/* the ternary below determines how many bathrooms display, the whole
                        array, or just one if the GOTTA GO button is pressed */}
          {this.props.gottaGo === false ?
            this.props.bathrooms.map(bathroom => (
              <Marker key={bathroom.id}
                bathroom={bathroom}
                onClick={this.onMarkerClick}
                name={bathroom.place_name}
                address={bathroom.address}
                position={{ lat: bathroom.latitude, lng: bathroom.longitude, }}
                additionalDirections={bathroom.additional_directions}
                amenitiesPresent={bathroom.amenities_present} />))
            :
            <Marker
              onClick={this.onMarkerClick}
              name={this.props.bathrooms[0].place_name}
              address={this.props.bathrooms[0].address}
              position={{ lat: this.props.bathrooms[0].latitude, lng: this.props.bathrooms[0].longitude, }}
              additionalDirections={this.props.bathrooms[0].additional_directions}
              amenitiesPresent={this.props.bathrooms[0].amenities_present} />
          }
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            maxWidth='250'
            onOpen={e => {
              this.onInfoWindowOpen(this.props, e);
            }}>
            <div id="iwc" />
          </InfoWindow>
          {!this.props.directions.polyline[0] ? <></> :
            <Polyline
              path={this.props.directions.polyline}
              strokeColor="#0000FF"
              strokeOpacity={0.8}
              strokeWeight={2} />}
        </Map>
 <RateModal bathroom={this.props.selectedBathroom} open={this.state.open} handleClose={this.handleClose}/>
      </div>
    )
  }
}

const mapStateToProps = ({
  bathrooms,
  location,
  directions,
  gottaGo,
  selectedBathroom,
  user }) => ({ bathrooms, location, directions, gottaGo, selectedBathroom, user });


export default GoogleApiWrapper({
  apiKey: ('AIzaSyB675LdwmXlgKaIpAvXeOUIjlZU8Zl1TkQ')
})(connect(mapStateToProps)(MapComponent));


