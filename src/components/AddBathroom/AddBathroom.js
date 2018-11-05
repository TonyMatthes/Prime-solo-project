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
    this.props.history.push('./bathroomfinder')
  };
  componentDidMount() {
    this.renderAutoComplete();
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
        amenities: { ...this.state.bathroomToAdd.amenities },
        additionalDirections: '',
      }
    })
    //reset uncontrolled autocomplete
    event.target.reset()
  }

  handleChange = (input, target) => event => {
    this.setState({
      bathroomToAdd: {
        ...this.state.bathroomToAdd,
        [input]: event.target[target],
      }
    })
  }
  handleAmenityChange = (input, target) => event => {
    this.setState({
      bathroomToAdd: {
        ...this.state.bathroomToAdd,
        amenities: {
          ...this.state.bathroomToAdd.amenities,
          [input]: event.target[target]
        },
      }
    })
  }

  renderAutoComplete() {

    const autocomplete = new google.maps.places.Autocomplete(this.autocomplete);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      this.setState({
        bathroomToAdd: {
          ...this.state.bathroomToAdd,
          position: place.geometry.location,
          address: place.formatted_address,
          name: place.name
        }
      });
    });
  }

  render() {
    return (this.props.amenities ?
      <div >
        <form onSubmit={this.onSubmit}>
          <FormGroup>
            <FormControl>
              <TextField
                placeholder="Enter a location"
                inputRef={ref => (this.autocomplete = ref)}
                type="text"
              />

              {this.props.amenities.map((amenity) =>

                <FormControlLabel key={amenity.id}
                  control={
                    <Checkbox
                      checked={!this.props.amenities ? false : this.state.bathroomToAdd.amenities[amenity.id]}
                      onChange={this.handleAmenityChange(amenity.id, 'checked')}
                      value={amenity.id}
                    />}

                  label={amenity.name}
                />
              )}

              <TextField
                placeholder='Any additional directions?'
                onChange={this.handleChange('additionalDirections', 'value')}
                value={this.state.additionalDirections}
              />

              <Button type="submit" >Submit</Button>

            </FormControl>
          </FormGroup>
        </form>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}

        >
          <DialogTitle>Submitted!</DialogTitle>
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

      </ div >
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