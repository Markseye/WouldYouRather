import React, { Component } from 'react'
import LoginModal from './LoginModal';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

class Header extends Component {
  state = {
    isOpen: false
  }

  toggleLoginModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return(
      <nav className='nav'>
        <ul>
          <li>
            {this.props.authedUser === null || Object.keys(this.props.authedUser).length === 0 ? <button className='login-button' onClick={() => this.toggleLoginModal()}> Login </button>
              : <h3> User {this.props.authedUser} </h3>}
            <LoginModal display={this.state.isOpen} handleClose={this.toggleLoginModal} />
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