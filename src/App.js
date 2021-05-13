import './main.scss'
import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { checkUserSession } from './redux/User/user.actions'

// Higher order components
import WithAuth from './hoc/withAuth'

// Layouts
import DefaultLayout from './layouts/DefaultLayout'
import HomepageLayout from './layouts/HomepageLayout'

// Pages
import Homepage from './pages/Homepage'
import Registration from './pages/Registration'
import Login from './pages/Login'
import Recovery from './pages/Recovery'
import Dashboard from './pages/Dashboard'

const App = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkUserSession())
  }, [])

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
        <Route
          path='/login'
          render={() => (
            <DefaultLayout>
              <Login />
            </DefaultLayout>
          )}
        />
        <Route
          path='/recovery'
          render={() => (
            <DefaultLayout>
              <Recovery />
            </DefaultLayout>
          )}
        />

        <Route
          path='/dashboard'
          render={() => (
            <WithAuth>
              <DefaultLayout>
                <Dashboard />
              </DefaultLayout>
            </WithAuth>
          )}
        />
      </Switch>
    </div>
  )
}

export default App
