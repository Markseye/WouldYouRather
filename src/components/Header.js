import React, { Component } from 'react'
import LoginModal from './LoginModal';
// import { connect } from 'react-redux'

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
        <button className='login-button' onClick={this.toggleLoginModal}> Login </button>
        <LoginModal display={this.state.isOpen} handleClose={this.toggleLoginModal} />
      </div>
    );
  }
}

export default Header