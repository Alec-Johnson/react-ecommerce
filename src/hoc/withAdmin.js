import { useAdmin } from './../hooks'

const WithAdmin = (props) => useAdmin(props) && props.children

export default WithAdmin
