import React, { Component } from 'react';
import ReactDOM from "react-dom";
import locationIcon from './location-icon-1024x1024.png'
import { connect } from 'react-redux';
import { Map, InfoWindow, Marker, Polyline, GoogleApiWrapper } from 'google-maps-react';

class BathroomFinder extends Component {
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

    onInfoWindowOpen(props, e) {
        const content = (
            <div>
            <p>{this.state.selectedPlace.address}</p>
            <p>{this.state.selectedPlace.type} bathrooms</p>
            <p>notes: {this.state.selectedPlace.additionalDirections}</p>
            <button onClick={this.onDirectionsClick}>Directions</button>
            </div>
        );
        ReactDOM.render(
            React.Children.only(content),
            document.getElementById("iwc")
        );
    }

    onGottaGoClicked = () => {
        this.props.dispatch({
            type: 'GET_CLOSEST_BATHROOM',
            payload: this.props.location
        })
        this.setState({
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
        })
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
        const style = {
            height: '50vh',
            width: '50vh'
        }
        return (
            <div>
                <h1>results</h1>
                <pre>{this.props.directions.steps}</pre>
                <button onClick={this.onDirectionsClick}>Get Directions</button>
                <button onClick={this.onGottaGoClicked}>GOTTA GO</button>
                <ol>
                    {this.props.directions.steps.map((step, index) => <li key={index}>{step}</li>)}
                </ol>
                <Map google={this.props.google} style={style} zoom={14}
                    initialCenter={{ lat: 0, lng: 0 }}
                    centerAroundCurrentLocation={true}
                    onClick={this.onMapClicked}>
                    <Marker
                        icon={locationIcon}
                        position={
                            {
                                lat: this.props.location.latitude,
                                lng: this.props.location.longitude
                            }
                        } />
                    {this.props.bathrooms.map(bathroom => (
                        <Marker key={bathroom.id} onClick={this.onMarkerClick}
                            address={bathroom.address}
                            position={{ lat: bathroom.latitude, lng: bathroom.longitude, }}
                            additionalDirections={bathroom.additional_directions}
                            type={bathroom.type} />
                    ))}
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
const mapStateToProps = ({ bathrooms, location, directions }) => ({ bathrooms, location, directions });


export default GoogleApiWrapper({
    apiKey: ('AIzaSyB675LdwmXlgKaIpAvXeOUIjlZU8Zl1TkQ')
})(connect(mapStateToProps)(BathroomFinder));


