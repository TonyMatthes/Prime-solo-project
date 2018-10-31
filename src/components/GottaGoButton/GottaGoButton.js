import React,{Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Button} from '@material-ui/core'



class InfoPage extends Component{ 

    gottaGo = () =>{
       
       this.props.dispatch({type:'GET_CLOSEST_BATHROOM', payload:{
           latitude:this.props.location.latitude,
           longitude:this.props.location.longitude,
           limit:this.props.gottaGo===false && this.props.history.location.pathname==='/bathroomfinder' ? 1:10
       }});
       this.props.close();
       this.props.gottaGo===true && this.props.history.location.pathname==='/bathroomfinder'?this.props.dispatch({type: 'GOTTA_GO_TOGGLE'}) : this.props.dispatch({type: 'FORCE_GOTTA_GO'})
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
const mapReduxStateToProps = ({location, gottaGo})=>({location, gottaGo})
export default withRouter (connect (mapReduxStateToProps) (InfoPage));