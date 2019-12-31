import { showLoading, hideLoading } from 'react-redux-loading'
import { saveQuestion, saveVote } from '../utils/api'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_VOTE = 'ADD_VOTE'

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

function addVote (question, user, option) {
  console.log("Question: ", question)
  return {
    type: ADD_VOTE,
    question,
    user,
    option,
  }
}

export function handleAddQuestion ({optionOneText, optionTwoText}) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    dispatch(showLoading())

    return saveQuestion({
      optionOneText,
      optionTwoText, 
      author: authedUser
    })
      .then((question) => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()))
  }
}

export function handleAddVote ({user, question, option}) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())

    return saveVote({
      question,
      authedUser,
      option
    })
      .then((question) => dispatch(addVote(question, authedUser, option)))
      .then(() => dispatch(hideLoading()))
  }
}