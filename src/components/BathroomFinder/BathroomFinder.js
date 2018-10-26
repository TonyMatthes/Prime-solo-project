import React, { Component } from 'react';
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
                activeMarker: null
            })
        }
    };

    onDirectionsClick = () => {
        this.props.dispatch({
            type: 'GET_DIRECTIONS',
            payload:
                {
                    origin:this.props.location,
                    destination:this.state.selectedPlace.position
                }
        });
    }

    componentDidMount() {
        this.props.dispatch({ type: 'GET_BATHROOMS' });
        this.props.dispatch({ type: 'GET_LOCATION' });
        console.log(this.state)
    }
    render() {
        const style = {
            height: '500px',
            width: '500px'
        }
        return (
            <div>
                <h1>results</h1>
                <button onClick={this.onDirectionsClick}>Get Directions</button>

                <pre>{JSON.stringify(this.props.location, null, 2)}</pre>
                <Map google={this.props.google} style={style} zoom={14}
                    initialCenter={{ lat: 0, lng: 0 }}
                    centerAroundCurrentLocation={true}
                    onClick={this.onMapClicked}>
                    <Marker
                        onClick={this.onMarkerClick}
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
                        visible={this.state.showingInfoWindow}>
                        <div>
                            <p>{this.state.selectedPlace.address}</p>
                            <p>{this.state.selectedPlace.type} bathrooms</p>
                            <p>notes: {this.state.selectedPlace.additionalDirections}</p>
                        </div>
                    </InfoWindow>
                    {<Polyline 
                        path={this.props.directions}
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


