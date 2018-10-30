import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';



class CustomerInfo extends Component {
    state = {
        bathroomToAdd: {
            name: '',
            address: '',
            latitude: '',
            longitude: '',
            additionalDirections: ''
        }
    }

    handleChange = (input) => event => {
        this.setState({
            bathroomToAdd: {
                ...this.state.bathroomToAdd,
                [input]: event.target.value,
            }
        })
    }


    addSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'POST_BATHROOM', payload: this.state.bathroomToAdd });
        this.setState({
            bathroomToAdd: {
                name: '',
                address: '',
                latitude: '',
                longitude: '',
                additionalDirections:''
            },
        })
    }
    render() {
        return (
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={40}
            >
                <form onSubmit={this.addSubmit}>
                    <Grid item>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Order info:</FormLabel>

                            <TextField
                                label="Name"
                                value={this.state.bathroomToAdd.name}
                                onChange={this.handleChange('name')}
                            />
                            <TextField
                                label="Street Address"
                                value={this.state.bathroomToAdd.address}
                                onChange={this.handleChange('address')}
                            />
                            <TextField
                                label="latitude"
                                value={this.state.bathroomToAdd.latitude}
                                onChange={this.handleChange('latitude')}
                            />
                            <TextField
                                label="longitude"
                                type="number"
                                maxLength="5"
                                value={this.state.bathroomToAdd.longitude}
                                onChange={this.handleChange('longitude')}
                            />
                            <TextField
                                label="Additional Directions"                             
                                value={this.state.bathroomToAdd.additionalDirections}
                                onChange={this.handleChange('additionalDirections')}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <Button type="submit">Submit</Button>
                    </Grid>
                </form>
            </Grid>
        )
    }
}
const mapReduxStateToProps = props => props;

export default connect(mapReduxStateToProps)(CustomerInfo);