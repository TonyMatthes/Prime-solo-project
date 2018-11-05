import React from 'react';
import { connect } from 'react-redux'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuIcon from '@material-ui/icons/Menu';
import UserIcon from '@material-ui/icons/Person';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import RadioGroup from '@material-ui/core/RadioGroup'
import Checkbox from '@material-ui/core/Checkbox'
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
        amenitiesToSearch: {}
    };

    toggleDrawer = (side, isOpen) => () => {
        this.setState({
            [side]: isOpen,
        });
    };
    handleAmenityChange = (input, target) => event => {
        this.setState({
            amenitiesToSearch: {
                ...this.state.amenitiesToSearch,
                [input]: event.target[target]
            },
        }
        )
    }
    filterSearch = () => {
        this.props.dispatch({
            type: 'GET_FILTERED_BATHROOMS',
            payload: {
                bathrooms: this.props.bathrooms,
                filterProps: this.state.amenitiesToSearch
            }
        })
        this.setState({ amenitiesToSearch: {}, right: false })
    }
    clearSearch = () => {
        this.props.dispatch({
            type: 'GET_CLOSEST_BATHROOM',
            payload: {

                latitude: this.props.location.latitude,
                longitude: this.props.location.longitude,
                limit: 25
            }
        })
        this.setState({ amenitiesToSearch: {}, right: false })
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
                    <pre>{JSON.stringify(this.state, null, 2)}</pre>
                    <Button onClick={this.clearSearch}>Clear Search</Button>
                    <Button onClick={this.filterSearch}>Narrow Your search</Button>

                    {!this.props.amenities ? <></> : this.props.amenities.map((amenity) =>
                        <FormControlLabel key={amenity.id}

                            control={
                                <Checkbox
                                    // checked={!this.props.amenities ? false : this.state.amenitiestToSearch[amenity.name]}
                                    onChange={this.handleAmenityChange(amenity.name, 'checked')}
                                    value={amenity.name}
                                />}

                            label={amenity.name}
                        />
                    )}
                </SwipeableDrawer>
            </div>
        );
    }
}

const mapReduxStateToProps = ({ user, amenities, location, bathrooms }) => ({ user, amenities, location, bathrooms })
export default connect(mapReduxStateToProps)(SwipeableTemporaryDrawer);
