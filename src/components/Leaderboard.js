import React, { Component } from 'react'
import { connect } from 'react-redux'

class Leaderboard extends Component {
  render(){
    return(
      <div>
        <ul className='leaderboard-list'>
          {this.props.users.map((user) => (
            <li className='leaderboard-list-item' key={user.id}>
              <img
                src={user.avatarURL}
                alt={`Avatar of ${user.name}`}
                className='avatar'
              />
              <p>{user.name}</p>
              <p> Questions Asked: {user.questionsAskedCount} </p>
              <p> Questions Answered: {user.questionsAnsweredCount} </p>
              <p> Total Questions Answered/Asked: {user.totalQuestionCount} </p>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ questions, users }) {
  return {
    questions: questions,
    users: getUserData(Object.values(users), Object.values(questions))
      .sort((a,b) => b.totalQuestionCount - a.totalQuestionCount)
  }
}

function getUserData (users, questions) {
  const userData = users.map((user) => {
    const userAskTotal = userAskCount(user, questions)
    const userAnswerTotal = userAnswerCount(user, questions)
    const totalQuestionCount = userAskTotal + userAnswerTotal

    return {
      id: user.id,
      avatarURL: user.avatarURL,
      name: user.name,
      questionsAskedCount: userAskTotal,
      questionsAnsweredCount: userAnswerTotal,
      totalQuestionCount: totalQuestionCount
    }
  })
  
  return userData
}

function userAskCount (user, questions) {
  const askedQuestions = questions.filter((question) => (
    question.author === user.id
  ))
  return askedQuestions.length
}

function userAnswerCount (user, questions) {
  const questionsAnswered = questions.filter((question) => (
    question.optionOne.votes.includes(user.id) ||
      question.optionTwo.votes.includes(user.id)
  ))

  return questionsAnswered.length
}

export default connect(mapStateToProps)(Leaderboard)