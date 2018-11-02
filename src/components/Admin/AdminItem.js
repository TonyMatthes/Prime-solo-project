import React, { Component } from 'react';
import { connect } from 'react-redux'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'


class AdminItem extends Component {
    handleDelete = (id) => {
        this.props.dispatch({ type: 'DELETE_BATHROOM', payload: id })
    }
    render() {
        return (
            <TableRow>
                <TableCell component="th" scope="row">{this.props.bathroom.place_name}</TableCell>
                <TableCell> {this.props.bathroom.address}</TableCell>
                <TableCell><ul>{this.props.bathroom.type[0]===null?"no types added":this.props.bathroom.type.map((item, index)=> <li key={index}>{item}</li>)}</ul></TableCell>
                <TableCell>{this.props.bathroom.additional_directions}</TableCell>
                <TableCell>
                    <ul>
                        {this.props.bathroom.type[0]===null?"no amenities added":this.props.bathroom.amenities_present.map((amenity, index) => <li key={index}>{amenity}</li>)}
                    </ul>
                </TableCell>
                <TableCell>
                    <IconButton onClick={() => this.handleDelete(this.props.bathroom.id)}>
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
        );
    }
}

export default connect()(AdminItem);