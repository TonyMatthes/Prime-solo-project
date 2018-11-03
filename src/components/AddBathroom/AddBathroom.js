/* global google */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GoogleApiWrapper } from 'google-maps-react';
import { FormControl, FormGroup, FormControlLabel, Checkbox, TextField, Button } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
class AddBathroom extends Component {
    state = {
        open: false,
        bathroomToAdd: {
            position: {},
            address: {},
            name: '',
            amenities: {},
            additionalDirections: '',
        }


    };

    handleClose = () => {
        this.setState({ open: false, });
    };

    componentDidMount() {
        this.renderAutoComplete();
        this.props.dispatch({ type: 'GET_AMENITIES' })
    }



    onSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'ADD_BATHROOM', payload: this.state.bathroomToAdd })
        //reset the state
        this.setState({
            open: true,
            bathroomToAdd: {
                position: {},
                address: {},
                name: '',
                amenities: {},
                additionalDirections: '',
            }
        })
        //reset uncontrolled autocomplete
        event.target.reset()
    }

    handleChange = (input, target) => event => {
        this.setState({bathroomToAdd:{
            ...this.state.bathroomToAdd,
            [input]: event.target[target],
        }})
    }
    handleAmenityChange = (input, target) => event => {
        this.setState({bathroomToAdd:{
            ...this.state.bathroomToAdd,
            amenities: {...this.state.bathroomToAdd.amenities,
                [input] : event.target[target]},
        }})
    }

    renderAutoComplete() {

        const autocomplete = new google.maps.places.Autocomplete(this.autocomplete);

        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            this.setState({ bathroomToAdd:{
                ...this.state.bathroomToAdd,
                position: place.geometry.location,
                address: place.formatted_address,
                name: place.name
            }});
        });
    }

    render() {
        return (this.props.amenities ?
            <div >
                <form onSubmit={this.onSubmit}>
                    <FormControl>
                        <TextField style={{ width: 400 }}
                            placeholder="Enter a location"
                            inputRef={ref => (this.autocomplete = ref)}
                            type="text"
                        />
                        <FormGroup row>
                            {this.props.amenities.map((amenity) =>
                                <FormControlLabel key={amenity.id}
                                    control={
                                        <Checkbox
                                            // checked={this.state.types[amenity.id]}
                                            onChange={this.handleAmenityChange(amenity.id, 'checked')}
                                            value={amenity.id}
                                        />}

                                    label={amenity.name}
                                />
                            )}
                        </FormGroup>
                        <TextField
                            placeholder='Any additional directions?'
                            onChange={this.handleChange('additionalDirections', 'value')}
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

            </ div>
            :
            <p>loading...</p>
        );
    }
}

const mapReduxStateToProps = ({ amenities }) => ({ amenities })

export default GoogleApiWrapper({
    apiKey: ('AIzaSyB675LdwmXlgKaIpAvXeOUIjlZU8Zl1TkQ'),
    libraries: ['places']
})(connect(mapReduxStateToProps)(AddBathroom));