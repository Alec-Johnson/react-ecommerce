import './main.scss'
import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { auth, handleUserProfile } from './firebase/utils'

// Layouts
import DefaultLayout from './layouts/DefaultLayout'
import HomepageLayout from './layouts/HomepageLayout'

// Pages
import Homepage from './pages/Homepage'
import Registration from './pages/Registration'
import Login from './pages/Login'

const initialState = {
  currentUser: null,
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { ...initialState }
  }

  authListener = null

  componentDidMount() {
    this.authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth)
        userRef.onSnapshot((snapshot) => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data(),
            },
          })
        })
      }

      this.setState({
        ...initialState,
      })
    })
  }

  componentWillUnmount() {
    this.authListener()
  }

  render() {
    const { currentUser } = this.state
    return (
      <div className='App'>
        <Switch>
          <Route
            exact
            path='/'
            render={() => (
              <HomepageLayout currentUser={currentUser}>
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
                <DefaultLayout currentUser={currentUser}>
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
                <DefaultLayout currentUser={currentUser}>
                  <Login />
                </DefaultLayout>
              )
            }
          />
        </Switch>
      </div>
    )
  }
}

export default App
