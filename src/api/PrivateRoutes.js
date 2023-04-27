import { useContext } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import AuthContext from '../context/AuthContext'


const PrivateRoutes = ()=>{
    const {auth} = useContext(AuthContext)
    const location = useLocation()
    return(
        auth?.token_type =="access" ?
            <Outlet /> :
        <Navigate to='/login' />
        
    )
}
export default PrivateRoutes