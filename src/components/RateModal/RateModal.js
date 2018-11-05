import React,{ Component } from 'react'
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button
} from '@material-ui/core'
import { connect } from 'react-redux'

class RateModal extends Component {
  state = {
    submitted: false,
    rating: '',
  }

  handleChange = () => event => {
    this.setState({
      rating: event.target.value
    })
  }

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}

      >
        <DialogTitle>Rate this Bathroom!</DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-description">
              {this.props.bathroom.place_name}
            </DialogContentText>
            </DialogContent>
        <DialogActions>
          <FormControl>
            <FormLabel component="legend">Rate:</FormLabel>
            <RadioGroup
              row
              aria-label="Rating"
              name="rating"
              value={this.state.rating}
              onChange={this.handleChange()}
            >
              <FormControlLabel value="1" control={<Radio />} label="1" />
              <FormControlLabel value="2" control={<Radio />} label="2" />
              <FormControlLabel value="3" control={<Radio />} label="3" />
              <FormControlLabel value="4" control={<Radio />} label="4" />
              <FormControlLabel value="5" control={<Radio />} label="5" />
            </RadioGroup>
            <Button
              onClick={() =>{ this.props.dispatch({
                type: 'RATE_BATHROOM',
                payload: {
                  id: this.props.bathroom.id,
                  rating: Number(this.state.rating)
                }
              })
              this.props.handleClose()}
              }>
              Submit
              </Button>
          </FormControl>
        </DialogActions>
      </Dialog>
    )
  }
}

export default connect()(RateModal)