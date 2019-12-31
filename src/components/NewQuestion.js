import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
    toHome: false,
  }

  handleChange = (e, option) => {
    const text = e.target.value
    if (option === 1) {
      this.setState(() => ({
        optionOneText: text
      }))
    } else {
      this.setState(() => ({
        optionTwoText: text
      }))
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { optionOneText, optionTwoText } = this.state
    const { dispatch, id } = this.props

    dispatch(handleAddQuestion({optionOneText, optionTwoText}))

    this.setState(() => ({
      optionOneText: '',
      optionTwoText: '',
      toHome: id ? false : true,
    }))
  }

  render() {
    const { optionOneText, optionTwoText, toHome } = this.state

    if (toHome === true) {
      return <Redirect to='/' />
    }

    return (
      <div>
        <h3 className='center'>Compose new Would You Rather? ..</h3>
        <form className='new-question' onSubmit={this.handleSubmit}>
          <textarea
            placeholder="Would you rather this.."
            value={optionOneText}
            onChange={(e) => this.handleChange(e, 1)}
            className='textarea'
            maxLength={280}
          />
          <textarea
            placeholder="Would you rather that.."
            value={optionTwoText}
            onChange={(e) => this.handleChange(e, 2)}
            className='textarea'
            maxLength={280}
          />
          <button
            className='btn'
            type='submit'
            disabled={optionOneText === '' || optionTwoText === ''}>
              Submit
          </button>
        </form>
      </div>
    )
  }
}

export default connect()(NewQuestion)
