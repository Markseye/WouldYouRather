import React, { Component } from 'react'
import Question from './Question'
import { connect } from 'react-redux'

class QuestionList extends Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.questionIds.map((id) => (
            <li key={id}>
              <Question id={id} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps ({questions, users}) {
  return {
    users,
    questionIds: Object.keys(questions)
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
  }
}

export default connect(mapStateToProps)(QuestionList)