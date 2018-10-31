import React,{Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Button} from '@material-ui/core'



class InfoPage extends Component{ 

    gottaGo = () =>{
       
       this.props.bathrooms.length>1?
       this.props.dispatch({type:'SET_BATHROOMS', payload:[this.props.bathrooms[0]]})
       :
       this.props.dispatch({type:'GET_CLOSEST_BATHROOM', payload:{
           latitude:this.props.location.latitude,
           longitude:this.props.location.longitude,
           limit:10
       }});
       this.props.close();
       this.props.dispatch({type: 'GOTTA_GO_TOGGLE'})
       this.props.history.push('/bathroomfinder')
       
    }

    render(){
        return(
            <Button fullwidth="true" color="secondary" onClick={this.gottaGo}>
            {this.props.gottaGo===true && this.props.history.location.pathname==='/bathroomfinder'
            ?
            'SHOW MORE BATHROOMS':'GOTTA GO'}
            </Button>
        )};
}
const mapReduxStateToProps = ({location, bathrooms, gottaGo})=>({location, bathrooms, gottaGo})
export default withRouter (connect (mapReduxStateToProps) (InfoPage));