import React, { Component } from 'react';
import { connect } from 'react-redux';
import MapComponent from '../MapComponent/MapComponent';
import {Grid} from '@material-ui/core'


class BathroomFinder extends Component {


    render() {
        return (
            <Grid container direction="row" alignItems="center">
            {/* container for the map element must have the same width and height as the map component */}
                <div style={{float: 'left', height:'50vh', width:'50vh' }}>
                    <MapComponent />
                </div>
                <div>
                    <ol>
                        {this.props.directions.steps.map((step, index) => <li key={index}>{step}</li>)}
                    </ol>
                </div>
            </Grid>
        )
    }
}
const mapStateToProps = ({ bathrooms, location, directions }) => ({ bathrooms, location, directions });


export default connect(mapStateToProps)(BathroomFinder);


