import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const options = [
    'high',
    'middle',
    'low',
  ];

class Modal extends React.Component {
        
  state = {
    status: 'high',
    text: '',
  }

  submit = () => {
    const data = this.state
    this.props.closeModal(data);
  };

  handleChange = (value) => {
    this.setState({ status: value });
  };

  handleAdd = (value) => {
    this.setState({ text: value });
  };

  render() {
    const { open, closeModal } = this.props
    const { status } = this.state
    return (
      <Dialog
        open={open}
        onClose={() => closeModal()}
      >
        <DialogTitle id="form-dialog-title">Новая заметка</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="newTask"
            label="new task"
            type="text"
            fullWidth
            onChange={(e) => this.handleAdd(e.target.value)}
          />
          <DialogContentText>
            Выбери приоритет для заметки
          </DialogContentText>
          <RadioGroup
            ref={ref => { this.radioGroupRef = ref;}}
            name="status"
            value={status}
            onChange={(e) => this.handleChange(e.target.value)}
          >
            { options.map(option => (
                <FormControlLabel value={option} key={option} control={<Radio />} label={option} />
            ))}
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => closeModal()} color="primary">
            Cancel
          </Button>
          <Button onClick={this.submit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default Modal;