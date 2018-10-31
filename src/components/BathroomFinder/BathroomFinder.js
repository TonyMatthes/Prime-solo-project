import React, { Component } from 'react';
import { connect } from 'react-redux';
import MapComponent from '../MapComponent/MapComponent';
import {Typography, Grid} from '@material-ui/core/'


class BathroomFinder extends Component {

    render() {
        return (
            <Grid container direction="column">
                <Grid item>
                    <MapComponent />
                </Grid>
                <Grid 
                container
                direction="row"
                justify="space-around"
                alignItems="flex-start">
                   <Grid item md={6}>
                    <ol>
                       {this.props.directions.steps.map((step, index) =><Typography key={index} variant="body1"> <li > {step}</li></Typography>)}
                    </ol>
                    </Grid>
                    <Grid item md={6}>
                        <Typography variant="h6">This is where more specific info will go</Typography>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}
const mapStateToProps = ({ bathrooms, location, directions, gottaGo }) => ({ bathrooms, location, directions, gottaGo });


export default connect(mapStateToProps)(BathroomFinder);


