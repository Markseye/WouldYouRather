import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
// import { useAlert } from 'react-alert'
import { Redirect, useHistory } from 'react-router-dom'
// import { RECEIVE_USERS } from '../actions/users'

class LoginModal extends Component {
  state = {
    isLoggedIn : false
  }

  handleLogin(user_id) {
    // let history = useHistory();  
    const user = this.props.dispatch(setAuthedUser(user_id)).id
    this.setState({isLoggedIn: true})
    this.props.handleClose()
    // history.push("/")
  }

  resetLogin() { this.setState({isLoggedIn: false}) }

  render () {
    const { users, handleClose } = this.props
    // let history = useHistory
    if(this.props.display === true) {
      if (this.state.isLoggedIn === true) {
        this.resetLogin()
        return <Redirect to='/' />
      }
      // const alert = useAlert()
      //&& alert.show('You are now logged in as ', user.id)
      return (
        <div className='modal'>
          <div className='modal-main'>
            <button onClick={handleClose}>X</button>
            <div className='modal-user-section'>
              <h3>Please select your user</h3>
              <ul className='modal-user-list'>
                {users.map((user) => (
                  <li className='modal-user-item'
                      key={user.id}
                      onClick={() => this.handleLogin(user.id)}>
                    <p>{user.id}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>)
    } else {
      return null
    }
  }
}

function mapStateToProps ({users}) {
  return {
    users: Object.values(users).map((user) => user )
  }
}

export default connect(mapStateToProps)(LoginModal)