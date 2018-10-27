import React, { Component } from 'react';
import { connect } from 'react-redux';
import MapComponent from '../MapComponent/MapComponent';
import {Grid} from '@material-ui/core'


class BathroomFinder extends Component {


    render() {
        return (
            <Grid container>
                <Grid item style={{width: '50vh', height:'50vh', float: 'left' }}>
                    <MapComponent />
                </Grid>
                <Grid item>
                    <ol>
                        {this.props.directions.steps.map((step, index) => <li key={index}>{step}</li>)}
                    </ol>
                </Grid>
            </Grid>
        )
    }
}
const mapStateToProps = ({ bathrooms, location, directions }) => ({ bathrooms, location, directions });


export default connect(mapStateToProps)(BathroomFinder);


