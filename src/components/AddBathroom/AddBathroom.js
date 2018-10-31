/* global google */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GoogleApiWrapper } from 'google-maps-react';
import { FormControl, TextField, Button } from '@material-ui/core'

class AddBathroom extends Component {
    state = {
        position: {},
        address: {},
        name: '',
        type: '',
        additionalDirections: '',
    };

    componentDidMount() {
        this.renderAutoComplete();
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'ADD_BATHROOM', payload: this.state })
        this.setState({
            position: {},
            address: {},
            name: '',
            type: '',
            additionalDirections: '',
        })
        event.target.reset()
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
        return (
            <div >
                <div>
                    <form onSubmit={this.onSubmit}>
                        <FormControl>
                        <TextField style={{ width: 400 }}
                            placeholder="Enter a location"
                            inputRef={ref => (this.autocomplete = ref)}
                            type="text"
                        />
                        <TextField
                            placeholder='type of bathrooms present'
                            onChange={this.handleChange('type')}
                            value={this.state.type}
                        />
                        <TextField
                            placeholder='Any additional directions?'
                            onChange={this.handleChange('additionalDirections')}
                            value={this.state.additionalDirections}
                        />

                        <Button type="submit" >Submit</Button>
                        </FormControl>
                    </form>

                </div>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyB675LdwmXlgKaIpAvXeOUIjlZU8Zl1TkQ'),
    libraries: ['places']
})(connect()(AddBathroom));