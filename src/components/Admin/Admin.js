import React, { Component } from 'react';
import {connect} from 'react-redux'
import AdminItem from './AdminItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class Admin extends Component {
 



    componentDidMount = () => {
        this.props.dispatch({type:'GET_ALL_BATHROOMS'});
    }

    render() {
        return (
            <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Place Name</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Notes</TableCell>
                    <TableCell>Delete</TableCell>
                    <TableCell>Amenities</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    {this.props.bathrooms.map(bathroom => <AdminItem key={bathroom._id} bathroom={bathroom} />)}
                </TableBody>
              </Table>
            </Paper>
        );
    }
}
const mapReduxStateToProps = ({bathrooms,location})=>({bathrooms,location})
export default connect(mapReduxStateToProps) (Admin);