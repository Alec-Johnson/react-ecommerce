import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import './styles.scss'

import AuthWrapper from './../AuthWrapper'
import FormInput from './../Forms/FormInput'
import Button from './../Forms/Button'

import { auth } from './../../firebase/utils'

const EmailPassword = (props) => {
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const config = {
        url: 'http://localhost:3000/login', // Enter domain of depolyed app, redirects to this url after password reset
      }

      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          props.history.push('/login')
        })
        .catch(() => {
          const err = ['Email not valid. Please try again.']
          setErrors(err)
        })
    } catch (err) {
      console.log(err)
    }
  }

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

        <form onSubmit={handleSubmit}>
          <FormInput
            type='email'
            name='email'
            value={email}
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button type='submit'>Reset Password</Button>
        </form>
      </div>
    </AuthWrapper>
  )
}

export default withRouter(EmailPassword)
