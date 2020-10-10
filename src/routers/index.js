import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { constRoutes } from './routerConfig'
export default () => (
    <Router>
        <Switch>
            {
                constRoutes.map(router => {
                    return <Route key={router.path} path={router.path} exact render={props => 
                        <router.component {...props} routes={router.routes}/>
                    }>
                    </Route>
                })
            }
        </Switch>
    </Router>
)
