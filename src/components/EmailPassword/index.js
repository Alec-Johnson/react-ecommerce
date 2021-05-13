import './styles.scss'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  resetPasswordStart,
  resetUserState,
} from './../../redux/User/user.actions'

import AuthWrapper from './../AuthWrapper'
import FormInput from './../Forms/FormInput'
import Button from './../Forms/Button'

const mapState = ({ user }) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  userError: user.userError,
})

const EmailPassword = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { resetPasswordSuccess, userError } = useSelector(mapState)
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState([])

  useEffect(() => {
    if (resetPasswordSuccess) {
      dispatch(resetUserState())
      history.push('/login')
    }
  }, [resetPasswordSuccess])

  useEffect(() => {
    if (Array.isArray(userError) && userError.length > 0) {
      setErrors(userError)
    }
  }, [userError])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(resetPasswordStart({ email }))
  }

  return (
    <AuthWrapper headline='Reset Password'>
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

          <Button type='submit'>Send Email</Button>
        </form>
      </div>
    </AuthWrapper>
  )
}

export default EmailPassword