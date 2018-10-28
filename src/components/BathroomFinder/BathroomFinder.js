import React, { Component } from 'react';
import { connect } from 'react-redux';
import MapComponent from '../MapComponent/MapComponent';


class BathroomFinder extends Component {


    render() {
        return (
            <div>
            {/* container for the map element must have the same width and height as the map component */}
                <div>
                    <MapComponent />
                </div>
                <div>
                    <ol>
                        {this.props.directions.steps.map((step, index) => <li key={index}>{step}</li>)}
                    </ol>
                </div>
            </div>
        )
    }
}
const mapStateToProps = ({ bathrooms, location, directions }) => ({ bathrooms, location, directions });


export default connect(mapStateToProps)(BathroomFinder);


