import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Navbar extends Component {

  render() {
    return (
      <nav className="grey darken-4">
        <div className="nav-wrapper">
          <ul className="left">
            <Link to={'/'}>
              <li><i className="medium material-icons">arrow_back</i></li>
            </Link>
          </ul>
        </div>
      </nav>
    )
  }
}

export default connect()(Navbar)