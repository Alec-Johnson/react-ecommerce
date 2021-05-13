import './styles.scss'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signUpUserStart } from '../../redux/User/user.actions'

import FormInput from './../Forms/FormInput'
import Button from './../Forms/Button'
import AuthWrapper from './../AuthWrapper'

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  userError: user.userError,
})

const Signup = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { currentUser, userError } = useSelector(mapState)
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState([])

  useEffect(() => {
    if (currentUser) {
      resetForm()
      history.push('/')
    }
  }, [currentUser])

  useEffect(() => {
    if (Array.isArray(userError) && userError.length > 0) {
      setErrors(userError)
    }
  }, [userError])

  const resetForm = () => {
    setDisplayName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setErrors([])
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    dispatch(
      signUpUserStart({
        displayName,
        email,
        password,
        confirmPassword,
      })
    )
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
