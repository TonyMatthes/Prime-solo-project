/* global google */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GoogleApiWrapper } from 'google-maps-react';
import { FormControl, TextField, Button } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class AddBathroom extends Component {
    state = {
        open: false,
        position: {},
        address: {},
        name: '',
        type: '',
        additionalDirections: '',
    };

    handleClose = () => {
        this.setState({ open: false, });
    };

    componentDidMount() {
        this.renderAutoComplete();
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'ADD_BATHROOM', payload: this.state })
        //reset the state
        this.setState({
            open: true,
            position: {},
            address: {},
            name: '',
            type: '',
            additionalDirections: '',
        })
        //reset uncontrolled autocomplete
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
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Submitted!"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Bathroom Added
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            okay
                </Button>
                    </DialogActions>
                </Dialog>

            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyB675LdwmXlgKaIpAvXeOUIjlZU8Zl1TkQ'),
    libraries: ['places']
})(connect()(AddBathroom));