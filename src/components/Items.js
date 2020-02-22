import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import M from 'materialize-css'
import moment from 'moment'

class Items extends Component {
  state = {
    items: [],
    filter: ''
  }

  componentDidMount() {
    this.setState({
      items: this.props.items
    })
  }

  handleFilter = event => {
    this.setState({ filter: event.target.value })
    event.target.value !== '' ? this.props.dispatch({ type: 'FILTERED_ITEMS', filter: event.target.value }) : this.props.dispatch({ type: 'ALL_ITEMS' })
  }

  render() {
    const { filter } = this.state
    const itemList = this.props.items.length ? (
      this.props.items.map(item => {
        const text = item.type === 'Employee' ? 'Entry date: ' : 'Bought on '
        return (
          <div className="collection-item row" key={item.id}>
            <div className="col s11">
              <p><strong>{item.type}:</strong> {item.name}</p>
              <p className="date"><small>{text}{moment(new Date(item.date)).format('YYYY-MM-DD')}</small></p>
            </div>
            <div className="col s1 center">
              <Link to={'/' + item.id}>
                <span className="blue-text lighten-2"><i className="material-icons">edit</i></span>
              </Link>
              <span onClick={() => {
                if (item.assigned || item.desktop || item.calculator || item.keyboard) {
                  const elems = document.querySelectorAll('.can-not-delete')
                  const instance = M.Modal.init(elems[0], {})
                  instance.open()
                  return
                }
                this.props.dispatch({ type: 'DELETE_ITEM', id: item.id })
              }} className="red-text lighten-2">
                <i className="material-icons icon-hoverable">delete_forever</i>
              </span>
            </div>
          </div>
        )
      })
    ) : (
        <p className="center">{this.state.filter.length > 0 ? 'Nothing to show' : 'You have no items yet'}</p>
      )
    return (
      <div className="padding">
        <div>
          <input placeholder="Search" type="text" value={filter} onChange={this.handleFilter} />
        </div>
        <Link to='/addItem'>
          <div className="fixed-action-btn">
            <button className="btn-floating btn-large waves-effect waves-light blue lighten-2"><i className="material-icons">add</i></button>
          </div>
        </Link>
        <div className="collection">
          {itemList}
        </div>
        <div id="modal-can-not-delete" className="modal can-not-delete">
          <div className="modal-content">
            <h4>Sorry!</h4>
            <p>You cant't delete assigned items</p>
          </div>
          <div className="modal-footer">
            <a href="#!" className="modal-close waves-effect waves-light blue lighten-2 btn-flat">Close</a>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    items: state
  }
}

export default connect(mapStateToProps)(Items)