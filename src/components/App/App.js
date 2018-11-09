import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';
import { GoogleApiWrapper } from 'google-maps-react'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import BathroomFinder from '../BathroomFinder/BathroomFinder'
import SideDrawer from '../SideDrawer/SideDrawer'
import AddBathroom from '../AddBathroom/AddBathroom';
import Admin from '../Admin/Admin'

class App extends Component {
  state = {
    recievedLocationPermission: false
  }
  getUserLocation = () => new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      location => resolve(this.setLocation(location)),
      error => reject(error),
    )
  })
  setLocation=(resolution)=>{
    this.setState({recievedLocationPermission:true});
    this.props.dispatch({ type: "SET_LOCATION", payload: resolution.coords })
    this.props.dispatch({ 
      type: "GET_CLOSEST_BATHROOM", 
      payload: {
        latitude:resolution.coords.latitude, 
        longitude:resolution.coords.longitude, 
        limit:25}}) 
  }

  componentDidMount() {
    this.getUserLocation()
    this.props.dispatch({ type: 'FETCH_USER' })
    this.props.dispatch({ type: 'GET_AMENITIES' })

  }

  render() {
    if (this.state.recievedLocationPermission === true) {
      return (
        <Router>
          <div>
            <SideDrawer />
            <Switch>
              {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
              <Redirect exact from="/" to="/bathroomfinder" />

              <Route
                exact
                path="/bathroomfinder"
                component={BathroomFinder} />
              {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
              <Route
                exact
                path="/about"
                component={AboutPage}
              />
              {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
              <ProtectedRoute
                exact
                path="/home"
                component={UserPage}
              />
              {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
              <ProtectedRoute
                exact
                path="/info"
                component={InfoPage}
              />
              <ProtectedRoute
                exact
                path="/addbathroom"
                component={AddBathroom}
              />
              <ProtectedRoute
                exact
                path="/admin"
                component={Admin}
              />
              {/* If none of the other routes matched, we will show a 404. */}
              <Route render={() => <h1>404</h1>} />
            </Switch>
          </div>
        </Router>
      )
    } else return(<p>Loading...</p>)
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyB675LdwmXlgKaIpAvXeOUIjlZU8Zl1TkQ'),
  libraries: ['places']

})(connect()(App));