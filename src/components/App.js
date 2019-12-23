import React, { Component, Fragment } from 'react'
// import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import QuestionList from './QuestionList'
import NewQuestion from './NewQuestion'
import Question from './Question'
import Header from './Header';
import LoadingBar from 'react-redux-loading'
import LoginModal from './LoginModal';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    props.authedUser
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  // create tabbed version of question list, filter unanswered by user ones as default

  render() {
    return (
      <Router>
        <Fragment>
          <Header />
          <LoadingBar />
          <div>
            <header />
              <div>
                <Route path='/' exact component={QuestionList} />
                <Route path='/question/:id' component={Question} />
                <Route path='/login' component={LoginModal} />
                <PrivateRoute path='/new' component={NewQuestion} />
              </div>
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    authedUser,
    loading: authedUser
  }
}

export default connect(mapStateToProps)(App)