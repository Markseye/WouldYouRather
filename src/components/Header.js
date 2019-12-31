import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'

class Header extends Component {
  state = {
    isOpen: false
  }

  logout() {
    this.props.dispatch(setAuthedUser(null))
  }

  render() {
    return(
      <nav className='nav'>
        <ul>
          <li>
            {this.props.authedUser === null || Object.keys(this.props.authedUser).length === 0 ? <NavLink className='login-button' to='/login'> Login </NavLink>
              : <h3> User {this.props.authedUser} <button onClick={() => this.logout()}>LogOut</button></h3>}
          </li>
          <li>
            <NavLink to='/add' exact activeClassName='active'>
              Add WYR
            </NavLink>
          </li>
          <li>
            <NavLink to='/leaderboard' exact activeClassName='active'>
              Leaderboard
            </NavLink>
          </li>
          <li>
            <NavLink to='/' exact activeClassName='active'>
              Home
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(Header)