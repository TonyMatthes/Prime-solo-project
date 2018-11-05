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
                    justify="center"
                    alignItems="flex-start">

                    {!this.props.directions.polyline[0] ? <></> :
                        <Grid item lg={6}>
                            <Button onClick={() => this.props.dispatch({ type: 'CLEAR_DIRECTIONS' })}>Clear directions</Button>
                            <ol>
                                {this.props.directions.steps.map(
                                    (step, index) =>
                                        <Typography key={index} variant="body1"> <li > {step}</li></Typography>
                                )}
                            </ol>
                        </Grid>
                    }

                    <Grid item lg={6}>
                        {   /* this double ternary displays features if they're there, 
                                a message if they're not, and nothing if nothing's selected, in reverse order */
                            !this.props.selectedBathroom.amenities_present ?
                                <></>
                                :
                                !this.props.selectedBathroom.amenities_present[0] ?
                                    <>
                                        <Typography variant="h6">Features</Typography>
                                        <Typography variant="body1">No reported features, someone should get on that.</Typography>
                                    </>
                                    :
                                    <>  
                                        <Typography variant="h6">Rating: {this.props.selectedBathroom.rating===null ? 'No Ratings' : Math.round(this.props.selectedBathroom.rating * 10)/10}</Typography>
                                        <Typography variant="h6">Features</Typography>
                                        <ul>
                                            {this.props.selectedBathroom.amenities_present.map(
                                                (amenity, index) =>
                                                    <li key={index}><Typography variant="body1">{amenity}</Typography></li>)}
                                        </ul>

                                    </>
                        }
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}
const mapStateToProps = ({ bathrooms, location, directions, gottaGo, selectedBathroom, }) =>
    ({ bathrooms, location, directions, gottaGo, selectedBathroom, });


export default connect(mapStateToProps)(BathroomFinder);


