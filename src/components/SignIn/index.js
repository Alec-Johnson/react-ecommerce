import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './styles.scss'
import Button from './../Forms/Button'
import FormInput from './../Forms/FormInput'
import { signInWithGoogle, auth } from './../../firebase/utils'
import AuthWrapper from './../AuthWrapper'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const resetForm = () => {
    setEmail('')
    setPassword('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await auth.signInWithEmailAndPassword(email, password)
      resetForm()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <AuthWrapper headline='Login'>
      <div className='formWrap'>
        <form onSubmit={handleSubmit}>
          <FormInput
            type='email'
            name='email'
            value={email}
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
          />

          <FormInput
            type='password'
            name='password'
            value={password}
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
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

export default SignIn
