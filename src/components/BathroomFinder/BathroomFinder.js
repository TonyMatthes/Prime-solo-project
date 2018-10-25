import React, { Component } from 'react';
import locationIcon from './location-icon-1024x1024.png'
import { connect } from 'react-redux';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';


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
                <pre>{JSON.stringify(this.props.location, null, 2)}</pre>
                <Map google={this.props.google} style={style} zoom={14}
                    initialCenter={{ lat: 0, lng: 0 }}
                    centerAroundCurrentLocation={true}>
                    <Marker icon={locationIcon} position={{lat: this.props.location.latitude, lng: this.props.location.longitude}} />
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
                            <p>{this.state.selectedPlace.address} has</p>
                            <p>{this.state.selectedPlace.type} bathrooms</p>
                            <p>additional directions: {this.state.selectedPlace.additionalDirections}</p>
                        </div>
                    </InfoWindow>

                </Map>
            </div>
        )
    }
}
const mapStateToProps = ({ bathrooms, location }) => ({ bathrooms, location });


export default GoogleApiWrapper({
    apiKey: ('AIzaSyB675LdwmXlgKaIpAvXeOUIjlZU8Zl1TkQ'),
    // libraries: ['places']
})(connect(mapStateToProps)(BathroomFinder));


