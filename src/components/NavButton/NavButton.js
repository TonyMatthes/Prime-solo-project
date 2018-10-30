import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button'

class NavButton extends Component {

    handleClick = () => {
        this.props.history.push(this.props.path)
        this.props.close()
    }

    render() {
        return (
            <Button fullwidth="true" color="secondary" onClick={this.handleClick}>{this.props.name}</Button>
        );
    }
}

export default withRouter(NavButton);