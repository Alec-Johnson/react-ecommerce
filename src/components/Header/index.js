import './styles.scss'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { signOutUserStart } from './../../redux/User/user.actions'
import { Link } from 'react-router-dom'
import Logo from './../../assets/logo.png'

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
})

const Header = (props) => {
  const dispatch = useDispatch()
  const { currentUser } = useSelector(mapState)

  const signOut = () => {
    dispatch(signOutUserStart())
  }

  return (
    <header className='header'>
      <div className='wrap'>
        <div className='logo'>
          <Link to='/'>
            <img src={Logo} alt='Store logo' />
          </Link>
        </div>

        <div className='callToActions'>
          {currentUser && (
            <ul>
              <li>
                <Link to='/dashboard'>ACCOUNT</Link>
              </li>
              <li>
                <span onClick={signOut}>LOGOUT</span>
              </li>
            </ul>
          )}
          {!currentUser && (
            <ul>
              <li>
                <Link to='/register'>REGISTER</Link>
              </li>
              <li>
                <Link to='/login'>LOGIN</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  )
}

Header.defaultProps = { currentUser: null }

export default Header
