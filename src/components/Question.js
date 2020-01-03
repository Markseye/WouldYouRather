import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

function Question(props) {
  const { question } = props

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

function mapStateToProps ({ questions }, { id }) {
  const question = questions[id]

  return {
    question: question,
  }
}

export default connect(mapStateToProps)(Question)