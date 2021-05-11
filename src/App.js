import './main.scss'
import React from 'react'
import { Switch, Route } from 'react-router-dom'

// Layouts
import DefaultLayout from './layouts/DefaultLayout'
import HomepageLayout from './layouts/HomepageLayout'
// Pages
import Homepage from './pages/Homepage'
import Registration from './pages/Registration'

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route
          exact
          path='/'
          render={() => (
            <HomepageLayout>
              <Homepage />
            </HomepageLayout>
          )}
        />
        <Route
          path='/register'
          render={() => (
            <DefaultLayout>
              <Registration />
            </DefaultLayout>
          )}
        />
      </Switch>
    </div>
  )
}

export default App
