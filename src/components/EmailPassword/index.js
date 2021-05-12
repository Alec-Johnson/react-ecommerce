import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './styles.scss'

import AuthWrapper from './../AuthWrapper'
import FormInput from './../Forms/FormInput'
import Button from './../Forms/Button'

import { auth } from './../../firebase/utils'

const initialState = {
  email: '',
  errors: [],
}

class EmailPassword extends Component {
  constructor(props) {
    super(props)
    this.state = { ...initialState }

    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const { email } = this.state

      const config = {
        url: 'http://localhost:3000/login', // Enter domain of depolyed app, redirects to this url after password reset
      }

      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          this.props.history.push('/login')
        })
        .catch(() => {
          const err = ['Email not valid. Please try again.']
          this.setState({ errors: err })
        })
    } catch (err) {
      console.log(err)
    }
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  render() {
    const { email, errors } = this.state
    return (
      <AuthWrapper headline='Email Password'>
        <div className='formWrap'>
          {errors.length > 0 && (
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          )}

          <form onSubmit={this.handleSubmit}>
            <FormInput
              type='email'
              name='email'
              value={email}
              placeholder='Email'
              onChange={this.handleChange}
            />

            <Button type='submit'>Reset Password</Button>
          </form>
        </div>
      </AuthWrapper>
    )
  }
}

export default withRouter(EmailPassword)
