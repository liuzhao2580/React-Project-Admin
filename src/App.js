import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import routes from './routers/index'
import Layout from './views/layout'
function App() {
    return (
        <div className="App">
            <Router routes={routes}>
                <Layout />
            </Router>
        </div>
    )
}

export default App
