import './main.scss'
import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { checkUserSession } from './redux/User/user.actions'

// Components
import AdminTools from './components/AdminTools'

// Higher order components
import WithAuth from './hoc/withAuth'
import WithAdmin from './hoc/withAdmin'

// Layouts
import DefaultLayout from './layouts/DefaultLayout'
import HomepageLayout from './layouts/HomepageLayout'
import AdminLayout from './layouts/AdminLayout'
import DashboardLayout from './layouts/DashboardLayout'

// Pages
import Homepage from './pages/Homepage'
import Registration from './pages/Registration'
import Login from './pages/Login'
import Recovery from './pages/Recovery'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'
import Search from './pages/Search'

const App = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkUserSession())
  }, [])

  return (
    <div className='App'>
      <AdminTools />
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
          path='/search'
          render={() => (
            <DefaultLayout>
              <Search />
            </DefaultLayout>
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
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </WithAuth>
          )}
        />
        <Route
          path='/admin'
          render={() => (
            <WithAdmin>
              <AdminLayout>
                <Admin />
              </AdminLayout>
            </WithAdmin>
          )}
        />
      </Switch>
    </div>
  )
}

export default App
