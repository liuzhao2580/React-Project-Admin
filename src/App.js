import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import routes from './routers/index'
function App() {
    return (
        <div className="App">
            <Router routes={routes}>
                {routes}
            </Router>
        </div>
    )
}

export default App
