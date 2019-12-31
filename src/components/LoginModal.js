import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'

class LoginModal extends Component {
  state = {
    isLoggedIn : false
  }

  handleLogin(user_id) {
    this.props.dispatch(setAuthedUser(user_id))
    this.setState({isLoggedIn: true})
    this.props.handleClose()
  }

  resetLogin() { this.setState({isLoggedIn: false}) }

  render () {
    const { users, handleClose } = this.props

    if (this.state.isLoggedIn === true) {
      return <Redirect to='/' />
    }
    // let history = useHistory
    if(this.props.display === true) {
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
    users: Object.values(users)
  }
}

export default connect(mapStateToProps)(LoginModal)