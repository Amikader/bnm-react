import { Avatar } from '@mui/material'
import {useContext, useEffect, useState} from 'react'
import {styles} from '../css/Demand.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons'
import API from '../api/API'
import dayjs from 'dayjs'
import AuthContext from '../context/AuthContext'
import Load from '../cards/Load'
import FormApprouver from '../cards/FormApprouver'

const Tous = ({page,setPage,setTotalPages,dateConge,dureeConge,typeConge,fname,mat}) => {
    const [demands,setDemands] = useState([])
    const {auth} = useContext(AuthContext)
    const [isLoading,setIsLoading] = useState(true)
    const [infoDemande,setInfoDemande] = useState({id:null,duree:null,date:null,decision:null})


    const nouvelle = ()=>{
        try{
            if(auth['direction_nom'] === 'rh'){
                API.get(`api/info-demande/?dateCongee=${dateConge}&dureeCongee=${dureeConge}&typecongee=${typeConge}&p=${page}&direction=&user__first_name=${fname}&user__profile__matricule=${mat}`)
                .then((response)=>{
                    setDemands(response?.data?.results)
                    setTotalPages(response?.data?.total_pages)
                    setIsLoading(false)
                })
            }else{
                API.get(`api/info-demande/?dateCongee=${dateConge}&dureeCongee=${dureeConge}&typecongee=${typeConge}&p=${page}&direction=${auth['direction_id']}&user__first_name=${fname}&user__profile__matricule=${mat}`)
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

    const decisioner = async (id,du,de,da)=>{
        try{
            const res = await API.patch(`api/demandes/${id}/`,{dateCongee:da,dureeCongee:du,decision:de,decisioner_by:auth.user_id })
            nouvelle()
        }catch(err){
            if(!err?.response){
                console.error('aucune response du serveur')
            }else if(err.response?.status===400){
                console.error('les champs sont obligatoire')
            }
            else{
                console.error('connexion echoue')
            }
        }
    }
    const accepter = async(id)=>{
        try{
            await  API.patch(`api/demandes/${id}/`,{decisioner_by:auth['user_id'],decision:true})
            .then((response)=>{
                if(response?.status === 200){
                    alert('Vous avez accepté la demande de code '+id)
                    nouvelle()
                }else{
                    alert('echou')
                }
            })
        }catch(err){
            if(!err?.response){
                console.error('aucune response du serveur')
            }else if(err.response?.status===400){
                console.error('les champs sont obligatoire')
            }
            else{
                console.error('connexion echoue')
            }
        }
    }
    const partieRH = (eid,educ,edac) =>{
        if(auth['direction_nom'] === 'rh'){
            document.getElementById('rh').style.display='block'
            setInfoDemande({id:eid,duree:educ,date:edac,decision:true})
        }else{
            accepter(eid)
        }
    }
    useEffect(()=>{
        nouvelle()
    },[fname,mat])
  return (
    <>
    {isLoading ? <Load /> :
    demands.length >= 1 ?(demands.map((element,index)=>
            <tr className={classes.trtd} key={index}>
                <td className={classes.thtd}>{element.id}</td>
                <td className={classes.thtd}>
                    <Avatar sx={{ width: 24, height: 24 }} src={element.user.profile.photo} />
                </td>
                <td className={classes.thtd}> {element.user.first_name} {element.user.last_name}</td>
                <td className={classes.thtd}>
                    <span 
                        style={{cursor:'pointer'}}
                    >
                        {element.dateCongee}
                    </span>
                </td>
                <td className={classes.thtd}>
                    <span  
                        style={{cursor:'pointer'}}
                    >
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
                {element.user.id === auth.user_id && element.decision === null ?
                    <td colSpan={2} className={classes.thtd}>
                    <button className={classes.myd}>...</button>
                    </td> 
                    : element.decision === null ?
                    <>
                        <td className={classes.thtd}>
                            <button 
                                className={classes.approuver}
                                onClick={()=>decisioner(element.id,element.dureeCongee,true,element.dateCongee)}
                            >
                                <FontAwesomeIcon icon={faCheck} color='green' />
                            </button>
                        </td>
                        <td className={classes.thtd}>
                            <button 
                                className={classes.rejeter} key={index}
                                onClick={()=>decisioner(element.id,element.dureeCongee,false,element.dateCongee)}
                            >
                                <FontAwesomeIcon icon={faX} color='red' />
                            </button>
                        </td>
                    </>

                    : element.decision === true && element.approuver === null && auth['direction_nom'] === 'rh' ?
                    <>
                        <td className={classes.thtd}>
                            <button 
                                className={classes.approuver}
                                onClick={()=>partieRH(element.id,element.dureeCongee,element.dateCongee)}
                            >
                                <FontAwesomeIcon icon={faCheck} color='green' />
                            </button>
                        </td>
                        <td className={classes.thtd}>
                            <button 
                                className={classes.rejeter} key={index}
                                onClick={()=>decisioner(element.id,element.dureeCongee,false,element.dateCongee)}
                            >
                                <FontAwesomeIcon icon={faX} color='red' />
                            </button>
                        </td>
                    </>

                    : element.approuver === true ?
                    <>
                        <td colSpan={2} className={classes.thtd}>
                        <button 
                            className={classes.approuver}
                            disabled
                            style={{backgroundColor:'#415641c9'}}
                        >
                            <FontAwesomeIcon icon={faCheck} color='white' />
                        </button>
                    </td>
                    </> : <>
                    <td colSpan={2} className={classes.thtd}>
                        <button 
                            className={classes.rejeter} key={index}
                            style={{backgroundColor:'#415641c9'}}
                        >
                            <FontAwesomeIcon icon={faX} color='white' />
                        </button>
                    </td>
                    </>
                }
            </tr>
            
        )): <h1>Aucune Resultat</h1>}
            <FormApprouver id={infoDemande.id} duree={infoDemande.duree} date={infoDemande.date} decision={infoDemande.decision} />
    </>
    
  )
}

export default Tous