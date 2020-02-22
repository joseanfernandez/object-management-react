import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navbar from './Navbar'
import Item from '../models/Item'
import Employee from '../models/Employee'
import Desktop from '../models/Desktop'
import uuidv4 from 'uuid/v4'

class AddItem extends Component {
  state = {
    name: '',
    type: ''
  }
  handleName = (e) => {
    this.setState({
      name: e.target.value
    })
  }
  handleType = (e) => {
    this.setState({
      type: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    switch (this.state.type) {
      case 'Employee':
        this.props.dispatch({ type: 'ADD_ITEM', item: new Employee(uuidv4(), this.state.name, this.state.type, new Date().toISOString(), false, null) })
        break
      case 'Desktop':
        this.props.dispatch({ type: 'ADD_ITEM', item: new Desktop(uuidv4(), this.state.name, this.state.type, new Date().toISOString(), false, null, null) })
        break
      default:
        this.props.dispatch({ type: 'ADD_ITEM', item: new Item(uuidv4(), this.state.name, this.state.type, new Date().toISOString(), false) })
    }

    this.setState({
      name: '',
      type: ''
    })
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="padding">
          <form onSubmit={this.handleSubmit}>
            <label>
              <h5>Type:</h5>
              <select className="browser-default" value={this.state.type} onChange={this.handleType}>
                <option value="">Select one...</option>
                <option value="Employee">Employee</option>
                <option value="Desktop">Desktop</option>
                <option value="Calculator">Calculator</option>
                <option value="Keyboard">Keyboard</option>
              </select>
            </label>
            <label>Name:</label>
            <input type="text" onChange={this.handleName} value={this.state.name} />
            <div className="center">
              <input className="waves-effect waves-light btn-small blue lighten-2" type="submit" value="Save" />
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default connect()(AddItem)