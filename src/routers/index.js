import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../views/home'
import About from '../views/about'
export default (
    <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/about" component={About}></Route>
    </Switch>
)
