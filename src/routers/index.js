import React from 'react'
import { Route } from 'react-router-dom'
import Home from '../views/home'
export default (
    <div>
        <Route exact path='/' component={Home}></Route>
    </div>
)