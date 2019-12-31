import React, { Component } from 'react'
import Question from './Question'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

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
      <div className='tabs'>
        <ul className='tab-list'>
          <h3 className={this.styleTab('unanswered')}
              onClick={() => this.handleTabClick('unanswered')}>
            Unanswered Questions
          </h3>
          <span style={{display: this.state.openTab === 'unanswered' ? null : 'none' }}>
           {this.props.loadingBar.default === 0 ? 
             (this.props.unansweredQuestions.length > 0) ?
              Object.values(this.props.unansweredQuestions).map((question) => (
                <li key={question.id}>
                  <Question id={question.id} />
                </li>
              ))
              : <h2>You've answered all questions! <br/>
                  <Link to='/add'>Now create one!</Link>
                </h2>
           : null
          }
          </span>
        </ul>
        <ul className='tab-list'>
          <h3 className={this.styleTab('answered')}
              onClick={() => this.handleTabClick('answered')}>
            Answered Questions
          </h3>
          <span style={{display: this.state.openTab === 'answered' ? null : 'none' }}>
            {(this.props.answeredQuestions.length > 0) ?
              Object.values(this.props.answeredQuestions).map((question) => (
                <li key={question.id}>
                  <Question id={question.id} />
                </li>
              ))
            : <h2>Login to answer questions!</h2>
            }
          </span>
        </ul>
      </div>
    );
  }
}

function mapStateToProps ({questions, users, authedUser, loadingBar}) {
  return {
    users,
    unansweredQuestions: Object.values(questions)
      .filter((question) => !userAnsweredQuestion(question, authedUser))
      .sort((a,b) => questions[b.id].timestamp - questions[a.id].timestamp),
    answeredQuestions: Object.values(questions)
      .filter((question) => userAnsweredQuestion(question, authedUser))
      .sort((a,b) => questions[b.id].timestamp - questions[a.id].timestamp),
    loadingBar
  }
}

function userAnsweredQuestion (question, authedUserId) {
  return (question.optionOne.votes.includes(authedUserId) ||
    question.optionTwo.votes.includes(authedUserId))
}

export default connect(mapStateToProps)(QuestionList)