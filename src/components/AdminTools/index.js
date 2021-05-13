import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { checkUserIsAdmin } from './../../utils'

import './styles.scss'

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
})

const AdminTools = () => {
  const { currentUser } = useSelector(mapState)

  const isAdmin = checkUserIsAdmin(currentUser)
  if (!isAdmin) return null // user !admin, entire component is null

  return (
    <div className='adminToolbar'>
      <ul>
        <li>
          <Link to='/admin'>My admin</Link>
        </li>
      </ul>
    </div>
  )
}

export default AdminTools
