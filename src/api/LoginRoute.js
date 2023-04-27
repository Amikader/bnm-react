import { useContext } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import AuthContext from '../context/AuthContext'


const LoginRoute = ()=>{
    const {auth} = useContext(AuthContext)
    const access = localStorage.getItem('access')

    const location = useLocation()
    return(
        auth != null && access != null ?
            <Navigate to='/' />:
            <Outlet /> 
        
    )
}
export default LoginRoute