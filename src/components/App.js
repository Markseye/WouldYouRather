import React, { Component, Fragment } from 'react'
// import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import QuestionList from './QuestionList'
import NewQuestion from './NewQuestion'
import QuestionPage from './QuestionPage'
import Leaderboard from './Leaderboard'
import Header from './Header';
import LoadingBar from 'react-redux-loading'
import LoginModal from './LoginModal';
import NotFound from './NotFound';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

const PrivateRouteComponent = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => {
    return(rest.isAuthed === null || rest.isAuthed instanceof Object
      ? <Redirect to='/login' />
      : <Component {...props} />)
  }} />
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
          <Switch>
            <Route path='/' exact component={QuestionList} />
            <PrivateRoute path='/question/:id' component={QuestionPage} isAuthed={this.props.authedUser}/>
            <Route path='/leaderboard' component={Leaderboard} />
            <Route path='/login' component={LoginModal} />
            <PrivateRoute path='/add' component={NewQuestion} isAuthed={this.props.authedUser}/>
            <Route component={NotFound} />
          </Switch>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser, questions, users }) {
  return {
    authedUser,
  }
}

const PrivateRoute = connect(mapStateToProps, null)(PrivateRouteComponent);
export default connect(mapStateToProps)(App)