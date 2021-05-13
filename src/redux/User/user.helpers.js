import { auth } from './../../firebase/utils'

export const handleResetPasswordAPI = (email) => {
  const config = {
    url: 'http://localhost:3000/login', // Enter domain of depolyed app, redirects to this url after password reset
  }

  return new Promise((resolve, reject) => {
    auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        resolve()
      })
      .catch(() => {
        const error = ['Email not valid. Please try again.']
        reject(error)
      })
  })
}
