import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'

class LoginModal extends Component {
  state = {
    isLoggedIn: false,
    display: true
  }

  handleLogin(user_id) {
    this.props.dispatch(setAuthedUser(user_id))
    this.setState({isLoggedIn: true})
    // return <Redirect to={this.props.prevPath} />
    // this.props.history.goBack(-1)
  }

  handleClose() {
    this.setState({isLoggedIn: true})
    // return <Redirect to={this.props.prevPath} />
    // this.props.history.goBack(-2)
  }

  // resetLogin() { this.setState({isLoggedIn: false}) }

  render () {
    const { users } = this.props

    if (this.state.isLoggedIn === true) {
      // return this.props.history.goBack()
      return <Redirect to='/' />
    }

    return (
      <div className='modal'>
        <div className='modal-main'>
          <button onClick={() => this.handleClose()}>X</button>
          <div className='modal-user-section'>
            <h3>Please select your user</h3>
            <ul className='modal-user-list'>
              {users.map((user) => (
                <li className='modal-user-item'
                    key={user.id}
                    onClick={() => this.handleLogin(user.id)}>
                  <img
                    src={user.avatarURL}
                    alt={`Avatar of ${user.name}`}
                    className='avatar'
                  />
                  <p>{user.id}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({users}) {
  return {
    users: Object.values(users)
  }
}

export default connect(mapStateToProps)(LoginModal)