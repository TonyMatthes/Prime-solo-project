import React, { Component } from 'react';
import { connect } from 'react-redux';
import MapComponent from '../MapComponent/MapComponent';
import { Typography, Grid, Button } from '@material-ui/core/'

class BathroomFinder extends Component {
    componentWillUnmount() {
        this.props.dispatch({ type: 'CLEAR_GOTTA_GO' })
    }
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
                        <Button onClick={() => this.props.dispatch({ type: 'CLEAR_DIRECTIONS' })}>Clear directions</Button>
                        <ol>
                            {this.props.directions.steps.map((step, index) => <Typography key={index} variant="body1"> <li > {step}</li></Typography>)}
                        </ol>
                    </Grid>
                    <Grid item md={6}>
                        <Typography variant="h6">Features</Typography>
                        {   /* this obtuse double ternary displays features if they're there, 
                                a message if they're not, and nothing if nothing's selected, in reverse order */
                            !this.props.selectedBathroom.amenitiesPresent ?
                                <></>
                                :
                                this.props.selectedBathroom.amenitiesPresent[0] === null ?
                                    <Typography variant="body1">No reported features, someone should get on that.</Typography>
                                    :
                                    <ul>
                                        {this.props.selectedBathroom.amenitiesPresent.map((amenity, index) =>
                                            <li key={index}>{amenity}</li>)}
                                    </ul>
                        }
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}
const mapStateToProps = ({ bathrooms, location, directions, gottaGo, selectedBathroom, }) => ({ bathrooms, location, directions, gottaGo, selectedBathroom, });


export default connect(mapStateToProps)(BathroomFinder);


