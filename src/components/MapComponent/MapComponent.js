import React, { Component } from 'react';
import ReactDOM from "react-dom";
import locationIcon from './location-icon-1024x1024.png'
import { Typography, Button } from '@material-ui/core'
import { connect } from 'react-redux';
import { Map, InfoWindow, Marker, Polyline, GoogleApiWrapper } from 'google-maps-react';

class MapComponent extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
    };

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });


    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: {},
                selectedPlace: {}
            })
        }
    };
    //Below is a workaround to get around react-google-maps not dealing well with callback functions in an info window
    onInfoWindowOpen(props, e) {
        const content = (
            <div>
                <Typography variant="h6">{this.state.selectedPlace.name}</Typography>

                <Typography variant="body1">{this.state.selectedPlace.address}</Typography>
                <Typography variant="body1">{this.state.selectedPlace.type} bathrooms</Typography>
                <Typography variant="body1">notes: {!this.state.selectedPlace.additionalDirections ? "none" : this.state.selectedPlace.additionalDirections}</Typography>

                <Button onClick={this.onDirectionsClick}>Directions</Button>
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

    render() {
        const mapStyle = {
            height: '50vh',
            width: '100%',
            position: 'relative'
        }
        const bounds = new this.props.google.maps.LatLngBounds();
        if (this.props.gottaGo === false) {
            for (let i = 0; i < this.props.bathrooms.length; i++) {
                bounds.extend({ lat: this.props.bathrooms[i].latitude, lng: this.props.bathrooms[i].longitude });
            }
        } else {
            bounds.extend({ lat: this.props.bathrooms[0].latitude, lng: this.props.bathrooms[0].longitude })
        };
        bounds.extend({ lat: this.props.location.latitude, lng: this.props.location.longitude })
        return (

            <div style={mapStyle}>
                <Map google={this.props.google} style={mapStyle} zoom={14}
                    initialCenter={{ lat: this.props.location.latitude, lng: this.props.location.longitude }}
                    containerStyle={mapStyle}
                    onClick={this.onMapClicked}
                    mapTypeControl={false}
                    fullscreenControl={false}
                    bounds={bounds}
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
                    {this.props.gottaGo === false ? this.props.bathrooms.map(bathroom => (
                        <Marker key={bathroom.id} onClick={this.onMarkerClick}
                            name={bathroom.place_name}
                            address={bathroom.address}
                            position={{ lat: bathroom.latitude, lng: bathroom.longitude, }}
                            additionalDirections={bathroom.additional_directions}
                            type={bathroom.type} />
                    )) : <Marker
                            onClick={this.onMarkerClick}
                            name={this.props.bathrooms[0].place_name}
                            address={this.props.bathrooms[0].address}
                            position={{ lat: this.props.bathrooms[0].latitude, lng: this.props.bathrooms[0].longitude, }}
                            additionalDirections={this.props.bathrooms[0].additional_directions}
                            type={this.props.bathrooms[0].type} />
                    }
                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                        maxWidth='200'
                        onOpen={e => {
                            this.onInfoWindowOpen(this.props, e);
                        }}>
                        <div id="iwc" />
                    </InfoWindow>
                    {<Polyline
                        path={this.props.directions.polyline}
                        strokeColor="#0000FF"
                        strokeOpacity={0.8}
                        strokeWeight={2} />}
                </Map>
            </div>
        )
    }
}
const mapStateToProps = ({ bathrooms, location, directions, gottaGo }) => ({ bathrooms, location, directions, gottaGo });


export default GoogleApiWrapper({
    apiKey: ('AIzaSyB675LdwmXlgKaIpAvXeOUIjlZU8Zl1TkQ')
})(connect(mapStateToProps)(MapComponent));


