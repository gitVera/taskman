import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { List, ListItem, ListItemText, Button, Checkbox } from '@material-ui/core';
import { deleteNote, updateNoteStatus } from '../actions'
import Status from '../Status'
import './style.css';

class ListContainer extends Component {

  state = {
    openModal: false,
    activeView: 'ALL',
    notelist: this.props.notelist,
    direction: {
      status: 'asc',
      text: 'asc',
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.notelist !== nextProps.notelist) {
      this.setState({ notelist: nextProps.notelist })
    }
  }

  handleCheck = (id) => (event) => {
      const ready = event.target.checked
      const data = {
        id,
        ready,
      }
    this.props.updateNoteStatus(data)
  };

  handleView = (name) => {
    if (name === 'ALL') {
      this.setState({
        activeView: name,
        notelist: this.props.notelist,
      })
    } else if (name === 'DONE') {
      this.setState({
        activeView: name,
        notelist: this.props.notelist.filter((note) => note.ready)
      })
    } else {
      this.setState({
        activeView: name,
        notelist: this.props.notelist.filter((note) => !note.ready)
      })
    }
  }

  sortBy = (key) => {
    if (key === 'status') {
      const statusValues = {
        'high' : 1, 
        'middle' : 2,
        'low' : 3,
      }
      this.setState({
        notelist: this.props.notelist.sort((note1, note2) => {
          return (
          this.state.direction[key] === 'asc'
          ? (statusValues[note1[key]] < statusValues[note2[key]])
          : (statusValues[note2[key]] < statusValues[note1[key]])
        )}),
        direction: {
          [key]: this.state.direction[key] === 'asc' ? 'desc' : 'asc'
        }
      })
    } else if (key === 'text') {
      this.setState({
        notelist: this.props.notelist.sort((a, b)=> (
          this.state.direction[key] === 'asc'
          ? a[key] < b[key]
          : b[key] < a[key]
        )),
        direction: {
          [key]: this.state.direction[key] === 'asc' ? 'desc' : 'asc'
        }
      })
    }
  }


  deleteNote = (id) => (event) => {
    this.props.deleteNote(id)
  }

  render() {
    const { notelist } =  this.state
    return (
      <div>
        <div className="top-nav">
          <div className="left-nav">
            <Button onClick={() => this.handleView('ALL')}>
              ALL
            </Button>
            <Button onClick={() => this.handleView('DONE')}>
              DONE
            </Button>
            <Button onClick={() => this.handleView('NOT_READY')}>
              NOT READY
            </Button>
          </div>
          <div className="right-nav">
            <span>Сортировать:</span>
            <Button onClick={() => this.sortBy('status')}>
              По приоритету
            </Button>
            <Button onClick={() => this.sortBy('text')}>
              По алфавиту
            </Button>
          </div>
        </div>
        <List>
          {
            notelist.map((note, index) =>  
              <ListItem key={note.id} divider>
                <span>{ index+ 1}</span>
                <Status status={ note.status }/>
                <ListItemText primary={ note.text } />
                <span>{ note.ready }</span>
                <Checkbox
                  checked={note.ready}
                  onChange={this.handleCheck(note.id)}
                  value="check"
                  color="primary"
                />
                <Button onClick={this.deleteNote(note.id)}>Удалить</Button>
              </ListItem>
            )
          }
        </List>
      </div>
    );
  }
}

const mapStateToProps = ({ notelist }) => ({
  notelist,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  deleteNote,
  updateNoteStatus,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);
