import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Question extends Component {

  render() {
    const { question } = this.props

    return(
      <Link to={`/question/${question.id}`} className='question'>
        <div>
          <h3> Would You Rather? </h3>
          <p>{question.optionOne.text}</p>
          <p>{question.optionTwo.text}</p>
        </div>
      </Link>
    );
  }
}

function mapStateToProps ({ authedUser, users, questions }, { id }) {
  const question = questions[id]

  return {
    authedUser,
    question: question,
  }
}

export default connect(mapStateToProps)(Question)