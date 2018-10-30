import React, { Component } from 'react';
import { connect } from 'react-redux';
import MapComponent from '../MapComponent/MapComponent';
import Typography from '@material-ui/core/Typography'


class BathroomFinder extends Component {

    componentDidMount(){
        this.props.dispatch({type:'GET_BATHROOMS'})
    }

    render() {
        return (
            <div>
                <div>
                    <MapComponent />
                </div>
                <div>
                    <ol>
                       {this.props.directions.steps.map((step, index) =><Typography variant="body1"> <li key={index}> {step}</li></Typography>)}
                    </ol>
                </div>
            </div>
        )
    }
}
const mapStateToProps = ({ bathrooms, location, directions }) => ({ bathrooms, location, directions });


export default connect(mapStateToProps)(BathroomFinder);


