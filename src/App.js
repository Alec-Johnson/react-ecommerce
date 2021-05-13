import './main.scss'
import React, { useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { auth, handleUserProfile } from './firebase/utils'
import { setCurrentUser } from './redux/User/user.actions'

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
    const authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth)
        userRef.onSnapshot((snapshot) => {
          dispatch(
            setCurrentUser({
              id: snapshot.id,
              ...snapshot.data(),
            })
          )
        })
      }
      dispatch(setCurrentUser(userAuth))
    })
    return () => {
      authListener() /// onAuthStateChanged returns a function you can call to unsubscribe from the event listener
    }
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
