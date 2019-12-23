import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './App.css'
import App from './components/App'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const store = createStore(reducer, middleware)

ReactDOM.render(

  <Provider store={store}>
    <AlertProvider template={AlertTemplate} >
      <App />
    </AlertProvider>
  </Provider>,
  document.getElementById('root')
)
