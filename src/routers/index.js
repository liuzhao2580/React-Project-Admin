import React from 'react'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import Layout from '@/layout'
import Dashboard from '@/views/dashboard'
import About from '@/views/about'
import Login from '@/views/login'
import { ErrorPage404 } from '@/views/errorPage'
export default () => (
    <Router>
        <Switch>
            <Route path="/login" component={Login}></Route>
            <Redirect exact from='/' to='/dashboard'></Redirect>
            <Layout exact path='/dashboard'>
                <Route component={Dashboard}></Route>
            </Layout>
            <Layout exact path='/about'>
                <Route component={About}></Route>
            </Layout>
            <Route path="*" component={ErrorPage404}></Route>
        </Switch>
    </Router>
)
