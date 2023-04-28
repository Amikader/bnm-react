import { Avatar } from '@mui/material'
import {useContext, useEffect, useState} from 'react'
import {styles} from '../css/Demand.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons'
import Calendar0 from '../calendar/Calendar0'
import API from '../api/API'
import dayjs from 'dayjs'
import AuthContext from '../context/AuthContext'
import FormApprouver from '../cards/FormApprouver'
import Load from '../cards/Load'

const NewDemands = ({page,setPage,setTotalPages,dateConge,dureeConge,typeConge,fname,mat}) => {
    const [debut,setDebut] = useState('2023-11-11')
    const [fin,setFin] = useState('2023-11-20')
    const [direction,setDirection] = useState()
    const [demands,setDemands] = useState([])
    const {auth} = useContext(AuthContext)
    const [infoDemande,setInfoDemande] = useState({id:null,duree:null,date:null,decision:null})
    const [isLoading,setIsLoading] = useState(true)

    
    const nouvelle = ()=>{
        try{
            if(auth['direction_nom'] === 'rh'){
                API.get(`api/rh-nouvelle-demande/?dateCongee=${dateConge}&dureeCongee=${dureeConge}&typecongee=${typeConge}&direction=&p=${page}&user__first_name=${fname}&user__profile__matricule=${mat}&ordering=-id`)
                .then((response)=>{
                    setDemands(response?.data?.results)
                    setTotalPages(response?.data?.total_pages)
                    setIsLoading(false)
                })
            }else{
                API.get(`api/nouvelle-demande/?dateCongee=${dateConge}&dureeCongee=${dureeConge}&typecongee=${typeConge}&direction=${auth['direction_id']}&p=${page}&user__first_name=${fname}&user__profile__matricule=${mat}&ordering=-id`)
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
    const showCalendar = (d,f,dir)=>{
        setDebut(d)
        setFin(f)
        setDirection(dir)
        document.getElementById('hide').style.display = 'grid'
    }
    useEffect(()=>{
        nouvelle()
    },[page,dateConge,dureeConge,typeConge])
    const classes = styles()

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
    const decisioner = async (id,du,de,da)=>{
        if(auth['direction_nom'] === 'rh'){
            await API.patch(`api/demandes/${id}/`,{approuver:false})
            .then((response)=>{
                if(response?.status === 200){
                    alert('Vous avez rejeté la demande de code '+id)
                    nouvelle()
                }else{
                    alert('echou')
                }
            })
        }else{
            await API.patch(`api/demandes/${id}/`,{decision:de,decisioner_by:auth.user_id,approuver:false})
            .then((response)=>{
                if(response?.status === 200){
                    alert('Vous avez rejeté la demande de code '+id)
                    nouvelle()
                }else{
                    alert('echou')
                }
            })
        }
    }
    const accepter = async(id)=>{
        await  API.patch(`api/demandes/${id}/`,{decisioner_by:auth['user_id'],decision:true})
        .then((response)=>{
            if(response?.status === 200){
                alert('Vous avez accepté la demande de code '+id)
                nouvelle()
            }else{
                alert('echou')
            }
        })
    }
    useEffect(()=>{

    },[infoDemande])
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
                        onClick={()=> showCalendar(element.dateCongee,dayjs(element.dateCongee).add(element.dureeCongee-1,'day').format('YYYY-MM-DD'),element.direction.id)} 
                        style={{cursor:'pointer'}}
                    >
                        {element.dateCongee}
                    </span>
                </td>
                <td className={classes.thtd}>
                    <span 
                        onClick={()=> showCalendar(element.dateCongee,dayjs(element.dateCongee).add(element.dureeCongee-1,'day').format('YYYY-MM-DD'),element.direction.id)} 
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
                {element.user.id === auth.user_id ?<td colSpan={2} className={classes.thtd}>
                    <button className={classes.myd}>...</button>
                    </td> :
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
                }
            </tr>
        )): <h1>Aucune Resultat</h1>}
            <Calendar0 debut={debut} fin={fin} direction={direction}/>
            <FormApprouver 
                id={infoDemande.id} 
                duree={infoDemande.duree} 
                date={infoDemande.date} 
                decision={infoDemande.decision} 
                nouvelle={nouvelle} 
            />

    </>
  )
}

export default NewDemands
