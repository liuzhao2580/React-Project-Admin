import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import Login from '@/views/login'
import Layout from '@/layout'
import ErrorPage404 from '@/views/errorPage/404'
import PrivateRoute from '@/routes/PrivateRoute'
const App = () => {
  return (
    <div id="App">
      <Router>
        <Switch>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/404" exact component={ErrorPage404}></Route>
          <PrivateRoute path="/" component={Layout}></PrivateRoute>
        </Switch>
      </Router>
    </div>
  )
}

export default App
