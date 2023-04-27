import { AppBar, InputBase, Toolbar,InputLabel,MenuItem,FormControl,Select, Avatar } from "@mui/material"
import { AttachEmail, NotificationsActive, Search } from '@mui/icons-material'
import { makeStyles } from "@mui/styles"
import { useContext, useEffect, useState } from "react";
import API from '../api/API'
import AuthContext from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faBell, faCaretDown, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons"
import { Navigate, useNavigate  } from "react-router-dom";


function connect(){    
    const ws = new WebSocket('ws://127.0.0.1:8000/ws/notif/'+ "?user=" + localStorage.getItem('access'))
    ws.onopen = (e)=>{
        // console.log(e.data)
    }
    ws.onclose = ()=>{
        setTimeout(()=>{
            connect()
        },3000)
    }
    ws.onerror = (e)=>{
        // console.error(e)
        ws.close()
    }
    ws.onmessage = (e)=>{
        const data = JSON.parse(e.data)
        document.getElementById('notif-icon-counter').innerHTML = data.count
        // console.log(data)
    }
}

connect()

const useStyles = makeStyles({
    nv: {
      width:'100%',
      minHeight: "50px",
      display: 'grid',
      gridTemplateColumns: "80% 20%",
      alignItems: "center",
      color: '#394366',
    },
    nvb: {  
    },
    search:{
        textAlign: 'left'
    },
    inpSearch:{
        width:'25%',
        height:'1.5em',
        backgroundColor: '#efefef',
        borderRadius: '0.5em',
        marginLeft: 5,
        display: 'flex',
        color: 'black',
    },
    notif:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    mylog:{
        width: 150,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    my:{
        position: 'fixed',
        top: '7%',
        backgroundColor: '#fff',
        width: 100,
        display: 'grid',
        borderRadius: '0 0 5px 5px',
        zIndex: 1000,
        boxShadow: 'rgb(2 1 18 / 85%) 0px 7px 29px 0px',
    },
  });


const NavBar=()=>{
    const ws = new WebSocket('ws://127.0.0.1:8000/ws/notif/'+ "?user=" + localStorage.getItem('access'))
    const classes = useStyles();
    const [langue,setLangue] = useState('fr')
    const {auth,setAuth,recherche,setRecherche} = useContext(AuthContext)
    const [me,setMe] = useState(null)
    const [out,setOut] = useState(false)
    const navigate = useNavigate()

    const redNotifVal = ()=>{
        ws.onmessage = (e)=>{
            const data = JSON.parse(e.data)
            return data.count
            // console.log(data)
        }
    }
    const utilisateur = ()=>{
        API.get(`api/profile/?user=${auth.user_id}`)
        .then((response)=>{
            setMe(response?.data[0])
        })
    }
    
    useEffect(()=>{
        utilisateur()
    },[])
    const handleClick = (e)=>{ 
        setOut(!out)
    }
    const logOut = ()=>{
        localStorage.removeItem('access')
        localStorage.removeItem('token')
        setAuth(null)
        return <Navigate to='/' />
    }
    const red = ()=>{
            return {
                position: 'fixed',
                right: '14.8%',
                color: 'white',
                fontSize: 9,
                padding: 2,
                backgroundColor: 'red',
                width: 10,
                height: 10,
                borderRadius:' 50%',
                top: '1.6%',
            }
        // }
    }
    return(
        <div className={classes.nv}>
            <div className={classes.search}>
                <div 
                    className={classes.inpSearch}
                >
                    <InputBase 
                        style={{backgroundColor: '#fff',
                            borderRadius: 10,
                            border: '0.5px solid #31364e',
                            padding: '2px 5px',
                            fontFamily: 'cursive',
                            color: '#31364e',
                            marginRight: 5,
                            marginLeft:12}
                        } 
                        id='ch'
                    />
                    <FontAwesomeIcon icon={faMagnifyingGlass} 
                        onClick={()=>setRecherche(document.getElementById('ch').value)}
                    />
                </div>
            </div>
            <div className={classes.notif}>
                <FontAwesomeIcon icon={faBell} style={{width:20}} />
                <span 
                    id='notif-icon-counter'
                    style={red()}
                    onClick={()=>{ws.send(JSON.stringify({
                        'type': 'delete'
                    }))
                    navigate("/demande")
                }}
                >{redNotifVal()}</span>
                <button>AR</button>
                <div className={classes.mylog}>
                    <span style={{marginRight: 10}}>{auth.username}</span>
                    <Avatar src={me?.photo} sx={{ width: 24, height: 24 }} style={{marginRight: 5}} />
                    
                    <span onClick={handleClick} id='downlg'>
                        <FontAwesomeIcon icon={faCaretDown} style={{marginRight: 5}} />
                    </span>
                    <div className={classes.my} id='logout' style={out ? {right: 7} : {right: '-50%'}}>
                        <spane style={{margin: '5px 0 5px 0',cursor: 'pointer'}}>profile</spane>
                        <spane 
                            style={{margin: '0 0 5px 0',cursor: 'pointer'}}
                            onClick={logOut}
                        >logout</spane>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar