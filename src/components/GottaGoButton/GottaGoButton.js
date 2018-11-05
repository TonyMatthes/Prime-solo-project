import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core'



class GottaGoButton extends Component {

    gottaGo = () => {
        this.props.close();
        this.props.gottaGo === true &&
            this.props.history.location.pathname === '/bathroomfinder' ?
                this.props.dispatch({ type: 'GOTTA_GO_TOGGLE' }) : 
                this.props.dispatch({ type: 'FORCE_GOTTA_GO' })
        this.props.history.push('/bathroomfinder')
        this.props.dispatch({ type: 'CLEAR_DIRECTIONS' })

    }

    render() {
        return (
            <Button fullwidth="true" color="secondary" onClick={this.gottaGo}>
                {this.props.gottaGo === true && 
                    this.props.history.location.pathname === '/bathroomfinder' ?
                        'SHOW MORE BATHROOMS' : 
                        'GOTTA GO'}
            </Button>
        )
    };
}
const mapReduxStateToProps = ({ location, gottaGo, }) => ({ location, gottaGo, })
export default withRouter(connect(mapReduxStateToProps)(GottaGoButton));