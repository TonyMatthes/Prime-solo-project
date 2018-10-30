/* global google */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GoogleApiWrapper } from 'google-maps-react';

class Contents extends Component {
    state = {
        position: null,
        address: {},
        name: '',
        type: '',
        additionalDirections: '',
    };

    componentDidMount() {
        this.renderAutoComplete();
    }

    onSubmit = (event)=> {
        event.preventDefault();
        this.props.dispatch({ type: 'ADD_BATHROOM', payload: this.state });
    }

    handleChange = (input) => event => {
        this.setState({
            ...this.state,
            [input]: event.target.value,
        })
    }

    renderAutoComplete() {

        const autocomplete = new google.maps.places.Autocomplete(this.autocomplete);

        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            this.setState({
                position: place.geometry.location,
                address: place.formatted_address,
                name: place.name
            });
        });
    }

    render() {
        const { position } = this.state;

        return (
            <div >
                <pre>{JSON.stringify(this.state)}</pre>
                <div>
                    <form onSubmit={this.onSubmit}>
                        <input style={{ width: 400 }}
                            placeholder="Enter a location"
                            ref={ref => (this.autocomplete = ref)}
                            type="text"
                        />
                        <input
                            placeholder='type of bathrooms present'
                            onChange={this.handleChange('type')}
                        />
                        <input
                            placeholder='Any additional directions?'
                            onChange={this.handleChange('additionalDirections')}
                        />

                        <input type="submit" value="Go" />
                    </form>

                    <div>
                        <div>Lat: {position && position.lat()}</div>
                        <div>Lng: {position && position.lng()}</div>
                        <div>Lng: {position && this.state.name}</div>
                        <div>Lng: {position && this.state.address}</div>
                        <div>Lng: {position && JSON.stringify(position)}</div>
                    </div>

                </div>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyB675LdwmXlgKaIpAvXeOUIjlZU8Zl1TkQ'),
    libraries: ['places']
})(connect()(Contents));