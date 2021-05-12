import { useAuth } from './../hooks'
import { withRouter } from 'react-router-dom'

const WithAuth = (props) => useAuth(props) && props.children

export default withRouter(WithAuth)
// Allows us to have access to the history within react router
