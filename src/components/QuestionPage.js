import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddVote } from '../actions/questions'
import NotFound from './NotFound'

class QuestionPage extends Component {

  handleVote(option) {
    const { authedUser, question, dispatch } = this.props
    dispatch(handleAddVote({authedUser, question, option}))
  }

  render() {
    const { question, options } = this.props
    return(
      question ?
        (<div style={{textAlign:'center'}}>
          <h3> Would You Rather? </h3>
          <img
            src={this.props.avatar}
            alt={`Avatar of ${question.author}`}
            className='avatar'
          />
          <ul className='options-container'>
            {options.map((option, index) => (
              <li key={option.text} className='option-container'>
                <p><b>{option.text}</b></p>
                <p>Number of votes: {option.votes.length}</p>
                <p>Percentage: {(option.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length) * 100) || 0} %</p>
                <p>{option.userVoted ? "🎉 You voted for this! 🎉" : null}</p>
                <button className='vote-button' disabled={option.userVoted} onClick={() => this.handleVote(option)}> Vote For this Option </button>
              </li>
            ))}
          </ul>
        </div>)
      : (<NotFound />)
    );
  }
}

function mapStateToProps ({ authedUser, users, questions }, props) {
  const { id } = props.match.params
  const question = questions[id]

  if(!question) {
    return {}
  }

  return {
    authedUser,
    question: question,
    avatar: users[question.author].avatarURL,
    options: optionsList(question, authedUser)
  }
}

function optionsList (question, authedUserId) {
  console.log(question)
  return ([{text: question.optionOne.text,
            votes: question.optionOne.votes,
            userVoted: question.optionOne.votes.includes(authedUserId),
            number: 1},
           {text: question.optionTwo.text,
            votes: question.optionTwo.votes,
            userVoted: question.optionTwo.votes.includes(authedUserId),
            number: 2}]
         )
}

export default connect(mapStateToProps)(QuestionPage)