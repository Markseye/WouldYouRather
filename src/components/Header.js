import React, { Component } from 'react'
import LoginModal from './LoginModal';
import { connect } from 'react-redux'

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
      <div>
        {this.props.authedUser === null || Object.keys(this.props.authedUser).length === 0 ? <button className='login-button' onClick={this.toggleLoginModal}> Login </button>
          : <h3>User {this.props.authedUser}</h3>}
        <LoginModal display={this.state.isOpen} handleClose={this.toggleLoginModal} />
      </div>
    );
  }
}

function mapStateToProps ({authedUser}) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(Header)