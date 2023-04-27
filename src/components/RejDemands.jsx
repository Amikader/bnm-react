import { Avatar } from '@mui/material'
import {useContext, useEffect, useState} from 'react'
import {styles} from '../css/Demand.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import API from '../api/API'
import dayjs from 'dayjs'
import AuthContext from '../context/AuthContext'
import Load from '../cards/Load'

const RejDemands = ({page,setPage,setTotalPages,dateConge,dureeConge,typeConge}) => {
    const [demands,setDemands] = useState([])
    const {auth} = useContext(AuthContext)
    const [isLoading,setIsLoading] = useState(true)

    const nouvelle = ()=>{
        try{
            if(auth['direction_nom'] === 'rh'){
                API.get(`api/info-demande/?dateCongee=${dateConge}&dureeCongee=${dureeConge}&typecongee=${typeConge}&p=${page}&approuver=false&direction=`)
                .then((response)=>{
                    setDemands(response?.data?.results)
                    setTotalPages(response?.data?.total_pages)
                    setIsLoading(false)
                })
            }else{
                API.get(`api/info-demande/?dateCongee=${dateConge}&dureeCongee=${dureeConge}&typecongee=${typeConge}&p=${page}&approuver=false&direction=${auth['direction_id']}`)
                .then((response)=>{
                    setDemands(response?.data?.results)
                    setTotalPages(response?.data?.total_pages)
                    setIsLoading(false)
                })
            }
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
    <>
        {isLoading ? <Load/>:
        demands.length >= 1 ?(demands.map((element,index)=>
            <tr className={classes.trtd} key={index}>
                <td className={classes.thtd}>{element.id}</td>
                <td className={classes.thtd}>
                    <Avatar sx={{ width: 24, height: 24 }} src={element.user.profile.photo} />
                </td>
                <td className={classes.thtd}> {element.user.first_name} {element.user.last_name}</td>
                <td className={classes.thtd}>
                    <span >
                        {element.dateCongee}
                    </span>
                </td>
                <td className={classes.thtd}>
                    <span >
                        {dayjs(element.dateCongee).add(element.dureeCongee,'day').format('YYYY-MM-DD')}
                    </span>
                </td>
                <td className={classes.thtd}>{element.dureeCongee}</td>
                <td className={classes.thtd}>{element.typecongee}</td>
                <td className={classes.thtd}>
                    {dayjs().diff(element?.user.profile?.dateCommance,'year') > 1? 
                    dayjs().diff(element?.user.profile?.dateCommance,'year')+'ans':
                    dayjs().diff(element?.user.profile?.dateCommance,'year')+'an'}    
                </td>
                    <td className={classes.thtd}>
                        <button 
                            className={classes.rej} key={index}
                        >
                            <FontAwesomeIcon icon={faX} color='red' />
                        </button>
                    </td>
            </tr>
        )): <h1 style={{padding: 10}}> </h1>}

    </>
  )
}

export default RejDemands