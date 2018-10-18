import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Button } from '@material-ui/core';
import Modal from '../Modal';
import ListContainer from '../ListContainer';
import { createNote } from '../actions';
import './style.css';

class Todolist extends Component {

  state = {
    openModal: false
  }

  openModal = () => {
    this.setState({
      openModal: true
    })
  }

  closeModal = (data) => {
    this.setState({
      openModal: false
    })
    this.props.createNote(data)
  }

  render() {
    const { openModal } = this.state

    return (
      <Grid container
        direction="row"
        justify="center"
        alignItems="center">
          <Grid item xs={6}>
            <div className="todolist">
            { openModal && 
              <Modal closeModal={this.closeModal} open={openModal} /> 
            }
              <div className="addtask">
                <Button 
                variant="contained" 
                color="primary"
                onClick={this.openModal}>Новая заметка</Button>
              </div>
              <ListContainer />
            </div>
          </Grid>
      </Grid>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  createNote,
}, dispatch)

export default connect(null, mapDispatchToProps)(Todolist);
