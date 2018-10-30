import React from 'react';
import { connect } from 'react-redux'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import NavButton from '../NavButton/NavButton'
import Crapper from './thomas_crapper.jpg'

class SwipeableTemporaryDrawer extends React.Component {
    state = {
        left: false,
        imageToAdd: {
            path: '',
            description: '',
        }
    };

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

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
                        <Typography variant="h6">
                            Crappr
                            </Typography>
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

                    {this.props.user.id &&(
                        <>
                    <NavButton close={this.toggleDrawer('left', false)} path="/info" name="Info Page" />
                    <NavButton close={this.toggleDrawer('left', false)} path="/addbathroom" name="Add Bathroom" />
                    </>
                    )}

                    {/* Always show this link since the about page is not protected */}
                    <NavButton close={this.toggleDrawer('left', false)} path="/about" name="About" />
                </SwipeableDrawer>
            </div>
        );
    }
}

const mapReduxStateToProps= ({user}) => ({user})
export default connect(mapReduxStateToProps)(SwipeableTemporaryDrawer);
