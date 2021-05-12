import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './styles.scss'
import Button from './../Forms/Button'
import FormInput from './../Forms/FormInput'
import { signInWithGoogle, auth } from './../../firebase/utils'
import AuthWrapper from './../AuthWrapper'

const initialState = {
  email: '',
  password: '',
}

class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = { ...initialState }
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const { email, password } = this.state

    try {
      await auth.signInWithEmailAndPassword(email, password)
      this.setState({
        ...initialState,
      })
    } catch (err) {
      console.log(err)
    }
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState({
      [name]: value,
    })
  }

  render() {
    const { email, password } = this.state

    return (
      <AuthWrapper headline='Login'>
        <div className='formWrap'>
          <form onSubmit={this.handleSubmit}>
            <FormInput
              type='email'
              name='email'
              value={email}
              placeholder='Email'
              handleChange={this.handleChange}
            />

            <FormInput
              type='password'
              name='password'
              value={password}
              placeholder='Password'
              handleChange={this.handleChange}
            />

            <Button type='submit'>Login</Button>

            <div className='socialSignin'>
              <div className='row'>
                <Button onClick={signInWithGoogle}>Sign in with Google</Button>
              </div>
            </div>

            <div className='links'>
              <Link to='/recovery'>Forgot Password?</Link>
            </div>
          </form>
        </div>
      </AuthWrapper>
    )
  }
}

export default SignIn
