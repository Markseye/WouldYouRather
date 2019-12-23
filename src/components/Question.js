import React, { Component } from 'react'
import { connect } from 'react-redux'

class Question extends Component {
  render() {
    return(
      <div>
        <h3> Would You Rather? </h3>
        <p>{this.props.question.optionOne.text}</p>
        <p>{this.props.question.optionTwo.text}</p>
      </div>
    );
  }
}

function mapStateToProps ({authedUser, users, questions}, { id }) {
  const question = questions[id]

  return {
    authedUser,
    question: question,
  }
}

export default connect(mapStateToProps)(Question)