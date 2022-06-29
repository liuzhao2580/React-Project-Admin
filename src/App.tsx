import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import setting from '@/setting'
import { BaseRouter } from './routes'
const App = () => {
  return (
    <div id="App">
      <Router basename={setting.basePath}>
        <BaseRouter />
      </Router>
    </div>
  )
}

export default App
