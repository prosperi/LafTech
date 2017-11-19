import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import App from './pages/App.jsx'
import Landing from './pages/Landing.jsx'
import Visualization3 from './pages/Visualization3.jsx'

export default (
  <Router>
    <Route path='/' component={App}>
      <IndexRoute component={Landing} />
      <Route path='visualization' component={Visualization3} />
      <Route path='*' component={Landing} />
    </Route>
  </Router>
)