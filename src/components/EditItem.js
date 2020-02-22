import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navbar from './Navbar'
import Item from '../models/Item'
import Employee from '../models/Employee'
import Desktop from '../models/Desktop'
import moment from 'moment'

class EditItem extends Component {
  state = {
    name: '',
    type: '',
    desktop: '',
    calculator: '',
    keyboard: '',
  }

  componentDidMount() {
    this.setState({
      name: this.props.item.name,
      type: this.props.item.type,
      desktop: this.props.item.type === 'Employee' ? this.props.item.desktop : '',
      calculator: this.props.item.type === 'Desktop' ? this.props.item.calculator : '',
      keyboard: this.props.item.type === 'Desktop' ? this.props.item.keyboard : '',
    })
  }

  exit = () => {
    this.setState({
      name: '',
      type: '',
      desktop: '',
      calculator: '',
      keyboard: ''
    })
    this.props.history.push('/')
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

  handleSelect = (e) => {
    switch (e.target.id) {
      case 'select-desktop':
        return this.setState({ desktop: JSON.parse(e.target.value) })
      case 'select-calculator':
        return this.setState({ calculator: JSON.parse(e.target.value) })
      case 'select-keyboard':
        return this.setState({ keyboard: JSON.parse(e.target.value) })
      default:
        return
    }
  }

  handleDelete = (e) => {
    switch (this.state.type) {
      case 'Employee':
        this.props.dispatch({ type: 'EDIT_ITEM', item: new Employee(this.props.item.id, this.state.name, this.state.type, this.props.item.date, false, null) })
        this.props.dispatch({ type: 'DISCHARGE_ITEM', item: this.state.desktop })
        break
      case 'Desktop':
        if (e.target.id === 'delete-calculator') {
          this.props.dispatch({ type: 'EDIT_ITEM', item: new Desktop(this.props.item.id, this.state.name, this.state.type, this.props.item.date, this.props.item.assigned, null, this.state.keyboard) })
          this.props.dispatch({ type: 'DISCHARGE_ITEM', item: this.state.calculator })
        }
        if (e.target.id === 'delete-keyboard') {
          this.props.dispatch({ type: 'EDIT_ITEM', item: new Desktop(this.props.item.id, this.state.name, this.state.type, this.props.item.date, this.props.item.assigned, this.state.calculator, null) })
          this.props.dispatch({ type: 'DISCHARGE_ITEM', item: this.state.keyboard })
        }
        break
      default:
    }
    this.exit()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    switch (this.state.type) {
      case 'Employee':
        this.props.dispatch({ type: 'EDIT_ITEM', item: new Employee(this.props.item.id, this.state.name, this.state.type, this.props.item.date, false, this.state.desktop) })
        break
      case 'Desktop':
        this.props.dispatch({ type: 'EDIT_ITEM', item: new Desktop(this.props.item.id, this.state.name, this.state.type, this.props.item.date, this.props.item.assigned, this.state.calculator, this.state.keyboard) })
        break
      default:
        this.props.dispatch({ type: 'EDIT_ITEM', item: new Item(this.props.item.id, this.state.name, this.state.type, this.props.item.date, this.props.item.assigned) })
    }
    if (this.state.desktop && this.state.desktop !== '') {
      this.props.dispatch({ type: 'ASSIGN_ITEM', item: this.state.desktop })
    }
    if (this.state.calculator && this.state.calculator !== '') {
      this.props.dispatch({ type: 'ASSIGN_ITEM', item: this.state.calculator })
    }
    if (this.state.keyboard && this.state.keyboard !== '') {
      this.props.dispatch({ type: 'ASSIGN_ITEM', item: this.state.keyboard })
    }
    this.exit()
  }

  render() {
    const item = this.props.item ? (
      <div className="padding">
        <form onSubmit={this.handleSubmit}>
          <label>
            <h6>Type:</h6>
            <select className="browser-default" value={this.state.type} onChange={this.handleType}>
              <option value="">Select one...</option>
              <option value="Employee">Employee</option>
              <option value="Desktop">Desktop</option>
              <option value="Calculator">Calculator</option>
              <option value="Keyboard">Keyboard</option>
            </select>
          </label>
          <label><h6>Name:</h6></label>
          <input type="text" onChange={this.handleName} value={this.state.name} />
          {/* SELECT OR CURRENT DESKTOP */}
          {this.props.item.type === 'Employee' && !this.props.item.desktop ?
            <div><label><h6>Desktop:</h6></label>
              <select className="browser-default" id="select-desktop" value={JSON.stringify(this.state.desktop)} onChange={this.handleSelect}>
                <option value="">Select one...</option>
                {
                  this.props.desktops.map(item => !item.assigned ? <option value={JSON.stringify(item)} key={item.id}>{item.name}</option> : null)
                }
              </select></div> : this.props.item.type === 'Employee' && this.props.item.desktop ?
              <div>
                <span className="btn disabled">
                  Current desktop: {this.props.item.desktop.name}
                </span>
                <span className="btn btn-flat blue lighten-2" onClick={this.handleDelete}>
                  <i id="delete-desktop" className="material-icons">clear</i>
                </span>
              </div>
              : null
          }
          {/* SELECT OR CURRENT CALCULATOR */}
          {this.props.item.type === 'Desktop' && !this.props.item.calculator ?
            <div><label><h6>Calculator:</h6></label>
              <select className="browser-default" id="select-calculator" value={JSON.stringify(this.state.calculator)} onChange={this.handleSelect}>
                <option value="">Select one...</option>
                {
                  this.props.calculators.map(item => <option value={JSON.stringify(item)} key={item.id}>{item.name}</option>)
                }
              </select></div> : this.props.item.type === 'Desktop' && this.props.item.calculator ?
              <div>
                <span className="btn disabled">
                  Current calculator: {this.props.item.calculator.name}
                </span>
                <span className="btn btn-flat blue lighten-2" onClick={this.handleDelete}>
                  <i id="delete-calculator" className="material-icons">clear</i>
                </span>
              </div>
              : null
          }
          {/* SELECT OR CURRENT KEYBOARD */}
          {this.props.item.type === 'Desktop' && !this.props.item.keyboard ?
            <div><label><h6>Keyboard:</h6></label>
              <select className="browser-default" id="select-keyboard" value={JSON.stringify(this.state.keyboard)} onChange={this.handleSelect} >
                <option value="">Select one...</option>
                {
                  this.props.keyboards.map(item => <option value={JSON.stringify(item)} key={item.id}>{item.name}</option>)
                }
              </select></div> : this.props.item.type === 'Desktop' && this.props.item.keyboard ?
              <div>
                <span className="btn disabled">
                  Current keyboard: {this.props.item.keyboard.name}
                </span>
                <span className="btn btn-flat blue lighten-2" onClick={this.handleDelete}>
                  <i id="delete-keyboard" className="material-icons">clear</i>
                </span>
              </div>
              : null
          }
          <h6>Description:</h6>
          <p>{
            `${this.props.item.type === 'Employee' ?
              'Entry date: ' :
              'Bought on '}${moment(new Date(this.props.item.date)).format('YYYY-MM-DD')}`}</p>
          <div className="center">
            <input className="waves-effect waves-light btn-small blue lighten-2" type="submit" value="Save" />
          </div>
        </form>
      </div>
    ) : (
        <div className="center">
          Loading item...
        </div>
      )

    return (
      <div className="">
        <Navbar />
        {item}
      </div>
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.item_id
  return {
    item: state.find(item => item.id === id),
    desktops: state.filter(item => item.type === 'Desktop'),
    calculators: state.filter(item => item.type === 'Calculator'),
    keyboards: state.filter(item => item.type === 'Keyboard'),
  }
}

export default connect(mapStateToProps)(EditItem)