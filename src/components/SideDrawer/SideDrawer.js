import React from 'react';
import { connect } from 'react-redux'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuIcon from '@material-ui/icons/Menu';
import UserIcon from '@material-ui/icons/Person';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import NavButton from '../NavButton/NavButton'
import Crapper from './thomas_crapper.jpg'
import GottaGoButton from '../GottaGoButton/GottaGoButton'

class SwipeableTemporaryDrawer extends React.Component {
    state = {
        left: false,
        right: false,
        amenitiesToSearch: ''
    };

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };
    handleAmenityChange = () => event => {
        this.setState({
            amenitiesToSearch: event.target.value
        })
    }
    filterSearch = () => {
        this.props.dispatch({
            type: 'GET_FILTERED_BATHROOMS',
            payload: {
                amenities: this.state.amenitiesToSearch,
                latitude: this.props.location.latitude,
                longitude: this.props.location.longitude,
                limit: 25
            }
        })
    }
    render() {

        return (
            <div>
                <AppBar position="sticky">
                    <Toolbar>
                        <IconButton
                            onClick={this.toggleDrawer('left', true)}
                            aria-label="Open drawer">
                            <MenuIcon />
                        </IconButton>
                        <GottaGoButton close={this.toggleDrawer('left', false)} />
                        <Typography style={{ flex: 1 }} variant="h6">
                            Crappr
                            </Typography>
                        <IconButton
                            onClick={this.toggleDrawer('right', true)}
                            aria-label="Open drawer">
                            <UserIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <SwipeableDrawer
                    open={this.state.left}
                    onClose={this.toggleDrawer('left', false)}
                    onOpen={this.toggleDrawer('left', true)}
                >
                    <img src={Crapper} alt="Thomas Crapper" style={{ width: 240 }} />
                    <NavButton close={this.toggleDrawer('left', false)} name="Bathroom Finder" path="/bathroomfinder" />

                    <NavButton close={this.toggleDrawer('left', false)} path="/home" name={this.props.user.id ? 'Home' : 'Login / Register'} />
                    {/* Show this link if they are logged in or not,
                    but call this link 'Home' if they are logged in,
                    and call this link 'Login / Register' if they are not */}

                    {this.props.user.id && (
                        <>
                            <NavButton close={this.toggleDrawer('left', false)} path="/info" name="Info Page" />
                            <NavButton close={this.toggleDrawer('left', false)} path="/addbathroom" name="Add Bathroom" />
                        </>
                    )}

                    {/* Always show this link since the about page is not protected */}
                    <NavButton close={this.toggleDrawer('left', false)} path="/about" name="About" />
                    <GottaGoButton close={this.toggleDrawer('left', false)} />
                </SwipeableDrawer>
                <SwipeableDrawer
                    open={this.state.right}
                    anchor="right"
                    onClose={this.toggleDrawer('right', false)}
                    onOpen={this.toggleDrawer('right', true)}
                >
                <pre>{JSON.stringify(this.state)}</pre>
                    <Button onClick={this.filterSearch}>Narrow Your search</Button>
                    <RadioGroup
                        value={this.state.amenitiesToSearch}
                        onChange={this.handleAmenityChange()}
                    >
                        {this.props.amenities.map((amenity) =>
                            <FormControlLabel key={amenity.id}
                                control={
                                    <Radio
                                    />}
                                value={`${amenity.id}`}
                                label={amenity.name}
                            />
                        )}
                    </RadioGroup>
                </SwipeableDrawer>
            </div>
        );
    }
}

const mapReduxStateToProps = ({ user, amenities, location }) => ({ user, amenities, location })
export default connect(mapReduxStateToProps)(SwipeableTemporaryDrawer);
