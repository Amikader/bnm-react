import { faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import jwtDecode from 'jwt-decode'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import API from '../api/API'
import AuthContext from '../context/AuthContext'
import dayjs from 'dayjs'
import axios from 'axios'

const Login1 = () => {
    const [username,setUsername] = useState('')
    const [pwd,setPwd] = useState('')
    const [errMsg,setErrMsg] = useState('')
    const {auth,setAuth,setRefresh} = useContext(AuthContext)
    const errRef = useRef()

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/"

    const login = async (e)=>{
        e.preventDefault()
        try{
            await API.post('http://127.0.0.1:8000/api/token/',{username:username,password:pwd})
            .then((response)=>{
                localStorage.setItem('token',response?.data?.refresh)
                localStorage.setItem('access',response?.data?.access)
                setAuth(localStorage.access ? jwtDecode((localStorage.access))  : null)
                setRefresh(localStorage.refresh ? (localStorage.refresh) : null)
                navigate(from,{replace: true})
            })
        }catch(err){
            if(!err?.response){
                setErrMsg ('aucune response du serveur')
            }else if(err.response?.status===400){
                setErrMsg('les champs utilisateur et mot de passe sont obligatoire')
            }else if(err.response?.status===401){
                setErrMsg("le nom d'utilisateur ou le mot de passe est incorrecte")
            }
            else{
                setErrMsg('connexion echoue')
            }
        }
    }
    useEffect(()=>{setErrMsg('')},[username,pwd])
    return (
        <div className='bag'>
            <p
                style={
                    {
                        backgroundColor: '#2203032b',
                        color: '#fff',
                        position: 'fixed',
                        fontSize: 13,
                        padding: 5,
                        zIndex: 1,
                        bottom: '25%',
                        borderRadius: 10,
                    }
                }
                ref={errRef} aria-live="assertive"
            >{errMsg}</p>
            <div className="form-box">
                <div className="form-value">
                    <form onSubmit={login} >
                        <div className="inputbox">
                            <FontAwesomeIcon icon={faUser} className='icon'/>
                            <input 
                                type='text' 
                                value={username}
                                onChange={(e)=>setUsername(e.target.value)}
                                required 
                            />
                            <label htmlFor="">utilisateur</label>
                        </div>
                        <div className="inputbox">
                            <FontAwesomeIcon icon={faLock} className='icon'/> 
                            <input 
                                type='password' 
                                value={pwd}
                                onChange={(e)=>setPwd(e.target.value)}
                                required 
                            />
                            <label htmlFor="">mot de passe</label>
                        </div>
                        <button>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login1