import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Login from '@/views/login'
import Layout from '@/layout'
import ErrorPage404 from '@/views/errorPage/404'
import PrivateRoute from '@/routes/PrivateRoute'
import ROUTE_PATH from '@/routes/routePath'
const App = () => {
  return (
    <div id="App">
      <Router>
        <Switch>
          <Route path={ROUTE_PATH.LOGIN} exact component={Login}></Route>
          <Route path="/404" exact component={ErrorPage404}></Route>
          <PrivateRoute path="/" component={Layout}></PrivateRoute>
        </Switch>
      </Router>
    </div>
  )
}

export default App
