import React, { useContext, useEffect, useState } from 'react'
import { Avatar } from '@mui/material'
import { makeStyles } from '@mui/styles'
import AuthContext from '../context/AuthContext'
import API from '../api/API'

const styles = makeStyles({
    dmns:{
        width: '95%',
        borderRadius: 8,
        display: 'grid',
        alignItems: 'center',
        padding:3,
    },
    dmn:{
        backgroundColor: "white",
        display: 'grid',
        gridTemplateColumns: 'repeat(6,16.6%)',
        alignItems:"center",
        padding: 5,
        margin: 5,
        boxShadow: 'rgb(104 92 205 / 20%) 0px 7px 29px 0px',
    },
    approuver:{
        color:"green",
        backgroundColor: "#00800026",
        borderRadius:8,
        padding: 5,
    },
    rejeter:{
        color:"red",
        backgroundColor: "#f4433629",
        borderRadius:8,
        padding: 5,
    },
    null:{
        color: '#857f7f',
        width: '80%',
        border: 'none',
        outline: 'none',
        fontSize: 25,
        backgroundColor: 'transparent',
    },
    wait:{
        color: '#061650',
        width: '80%',
        border: 'none',
        outline: 'none',
        fontSize: 25,
        backgroundColor: 'transparent',
    }
})
const MesDemands = ({page,setPage,setTotalPages,dateConge,dureeConge,typeConge}) => {
    const [demands,setDemands] = useState([])
    const {auth} = useContext(AuthContext)

    const nouvelle = ()=>{
        try{
            API.get(`api/info-demande/?dateCongee=${dateConge}&dureeCongee=${dureeConge}&typecongee=${typeConge}&p=${page}&user=${auth.user_id}&ordering=-id`)
            .then((response)=>{
                setDemands(response?.data?.results)
                setTotalPages(response?.data?.total_pages)
            })
        }catch(err){
            if(!err?.response){
                console.error('aucune response du serveur')
            }
            else{
                console.error('connexion echoue')
            }
        }
    }
    useEffect(()=>{
        nouvelle()
    },[page,dateConge,dureeConge,typeConge])
    const classes = styles()
  return (
    <tbody className={classes.dmns}>
        {demands.map((element,index)=>(
                <tr key={index} className={classes.dmn}>
                    <td><Avatar src={element.user.profile.photo} sx={{ width: 30, height: 30 }} /></td>
                    <td>{element.created}</td>
                    <td>{element.dateCongee}</td>
                    <td>{element.typecongee}</td>
                    <td>{element.dureeCongee}</td>
                    {element.approuver === true ? 
                    <td className={classes.approuver}>
                        approuver
                    </td> : element.approuver === false ?
                    <td className={classes.rejeter} >
                        rejeter
                    </td> : 
                    <td className={element.decision ?classes.wait : classes.null}>
                        ...
                    </td>
                    }
                </tr>
            ))
            }
    </tbody>
  )
}

export default MesDemands