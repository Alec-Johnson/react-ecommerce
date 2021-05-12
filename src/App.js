import './main.scss'
import React, { useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { auth, handleUserProfile } from './firebase/utils'
import { connect } from 'react-redux'
import { setCurrentUser } from './redux/User/user.actions'

// Layouts
import DefaultLayout from './layouts/DefaultLayout'
import HomepageLayout from './layouts/HomepageLayout'

// Pages
import Homepage from './pages/Homepage'
import Registration from './pages/Registration'
import Login from './pages/Login'
import Recovery from './pages/Recovery'

const App = (props) => {
  const { setCurrentUser, currentUser } = props

  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth)
        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          })
        })
      }

      setCurrentUser(userAuth)
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
          render={() =>
            currentUser ? (
              <Redirect to='/' />
            ) : (
              <DefaultLayout>
                <Registration />
              </DefaultLayout>
            )
          }
        />
        <Route
          path='/login'
          render={() =>
            currentUser ? (
              <Redirect to='/' />
            ) : (
              <DefaultLayout>
                <Login />
              </DefaultLayout>
            )
          }
        />
        <Route
          path='/recovery'
          render={() => (
            <DefaultLayout>
              <Recovery />
            </DefaultLayout>
          )}
        />
      </Switch>
    </div>
  )
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
})

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
