import React, { Component } from 'react'
import Question from './Question'
import { connect } from 'react-redux'

class QuestionList extends Component {
  
  state = {
    openTab: 'unanswered'
  }

  handleTabClick = (tab) => {
    if(this.state.openTab !== tab) {
      this.setState({ openTab: tab })
    }
  }

  styleTab = (tab) => {
    const tabStatus = tab === this.state.openTab ? 'tab-active' : 'tab-inactive'
    return 'tab-item ' + tabStatus
  }

  render() {
    return (
      <div className='tab-list'>
        <ul>
          <h3 className={this.styleTab('unanswered')}
              onClick={() => this.handleTabClick('unanswered')}>
            Unanswered Questions
          </h3>
          <span style={{display: this.state.openTab === 'unanswered' ? null : 'none' }}>
            {Object.values(this.props.unansweredQuestions).map((question) => (
              <li style={{listStyle: 'none'}} key={question.id}>
                <Question id={question.id} />
              </li>
            ))}
          </span>
        </ul>
        <ul>
          <h3 className={this.styleTab('answered')}
              onClick={() => this.handleTabClick('answered')}>
            Answered Questions
          </h3>
          <span style={{display: this.state.openTab === 'answered' ? null : 'none' }}>
            {(this.props.answeredQuestions.size > 0) ?
              Object.values(this.props.answeredQuestions).map((question) => (
                <li key={question.id}>
                  <Question id={question.id} />
                </li>
              ))
            : <h2>You've answered all the questions. Now create one!</h2>
            }
          </span>
        </ul>
      </div>
    );
  }
}

function mapStateToProps ({questions, users, authedUser}) {
  return {
    users,
    unansweredQuestions: Object.values(questions)
      .filter((question) => !userAnsweredQuestion(question, authedUser)),
    answeredQuestions: Object.values(questions)
      .map((question) => userAnsweredQuestion(question, authedUser))
  }
}

function userAnsweredQuestion (question, authedUserId) {
  question.optionOne.votes.includes(authedUserId) ||
    question.optionTwo.votes.includes(authedUserId)
}

export default connect(mapStateToProps)(QuestionList)