import jwtDecode from 'jwt-decode'
import React, { createContext, useState } from 'react'

const AuthContext = createContext({})

export  const AuthProvider =({children})=>{
    const [auth ,setAuth]=useState(localStorage.access ? (jwtDecode(localStorage.access)) : null)
    const [refresh ,setRefresh]=useState(localStorage.token ? localStorage.token : null)
    const [recherche,setRecherche] = useState('')
    return (
        <AuthContext.Provider value={{auth,setAuth,refresh,setRefresh,recherche,setRecherche}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext