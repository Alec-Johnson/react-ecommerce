export const checkUserIsAdmin = (currentUser) => {
  if (!currentUser || !Array.isArray(currentUser.userRoles)) return false // no access

  const { userRoles } = currentUser
  if (userRoles.includes('admin')) return true // admin access

  return false
}
