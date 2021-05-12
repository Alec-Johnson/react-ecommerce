import React, { useState } from 'react'
import './styles.scss'
import FormInput from './../Forms/FormInput'
import Button from './../Forms/Button'
import { auth, handleUserProfile } from './../../firebase/utils'
import AuthWrapper from './../AuthWrapper'

const Signup = () => {
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState([])

  const reset = () => {
    setDisplayName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      const error = ['Passwords do not match, try again']
      setErrors(error)
      return
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      )

      await handleUserProfile(user, { displayName })
      reset()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <AuthWrapper headline='Registration'>
      <div className='formWrap'>
        {errors.length > 0 && (
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
        <form onSubmit={handleFormSubmit}>
          <FormInput
            type='text'
            name='displayName'
            value={displayName}
            placeholder='Full Name'
            handleChange={(e) => setDisplayName(e.target.value)}
          />

          <FormInput
            type='email'
            name='email'
            value={email}
            placeholder='Email'
            handleChange={(e) => setEmail(e.target.value)}
          />

          <FormInput
            type='password'
            name='password'
            value={password}
            placeholder='Password'
            handleChange={(e) => setPassword(e.target.value)}
          />

          <FormInput
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            placeholder='Confirm Password'
            handleChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button type='submit'>Register</Button>
        </form>
      </div>
    </AuthWrapper>
  )
}

export default Signup
