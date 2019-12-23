import {
  _getUsers,
  _getQuestions,
  _getAuthedUser,
  _loginUser,
  _saveQuestion,
} from './_DATA.js'

export function getInitialData () {
  return Promise.all([
    _getUsers(),
    _getQuestions(),
    _getAuthedUser(),
  ]).then(([users, questions, authedUser]) => ({
    users,
    questions,
    authedUser,
  }))
}

export function setAuthedUser (user) {
  return _loginUser(user)
}

export function saveQuestion (question) {
  return _saveQuestion(question)
}