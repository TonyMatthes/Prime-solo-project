import React, { Component } from 'react';
import {connect} from 'react-redux'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'


class AdminItem extends Component {
    handleDelete = (id) =>{
        this.props.dispatch({type:'DELETE_BATHROOM',payload:id})
    }
    render() {
        return (
            <TableRow>
              <TableCell component="th" scope="row">{this.props.bathroom.place_name}</TableCell>
              <TableCell> {this.props.bathroom.address}</TableCell>
              <TableCell>{this.props.bathroom.type}</TableCell>
              <TableCell>{this.props.bathroom.additional_directions}</TableCell>
              <TableCell>
              <IconButton onClick={()=>this.handleDelete(this.props.bathroom.id)}>
                      <DeleteIcon />
                    </IconButton>
               </TableCell>
               <TableCell>
                   <ul>
                   {this.props.bathroom.amenities_present.map((amenity, index)=><li key={index}>{amenity}</li>)}
                   </ul>
                </TableCell>     
            </TableRow>
        );
    }
}

export default connect() (AdminItem);