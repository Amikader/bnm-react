import { Avatar } from "@mui/material";
import { makeStyles } from "@mui/styles"
import { useContext, useEffect } from "react";
import { useState } from "react";
import API from "../api/API";
import Calendar from "../calendar/Calendar";
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faMessage, faPhone } from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../context/AuthContext";

const styles = makeStyles({
    content:{
        display: 'grid',
        width: '100%',
        height: '100%',
        gridTemplateColumns: '66% 33%',
        backgroundColor: '#efefef',
    },
    greeting:{
        display: 'grid',
        justifyItems: 'center',
        alignItems: 'center',
    },
    greetimg:{
        backgroundImage: 'linear-gradient(350deg, #365ecf, #b33f3f5e)',
        width: '95%',
        height: '95%',
        borderRadius: 8,
        boxShadow: 'rgb(104 92 205 / 20%) 0px 7px 29px 0px',
    },
    auter:{
        display: 'grid',
        gridTemplateRows: '50% 50%',
    },
    my:{
        display: 'grid',
        gridTemplateRows: '42.5% 55%',
        alignContent: 'space-between',
        justifyItems: 'center',
    },
    calendar: {
        width: '98%',
    },
    profile:{
        backgroundColor: "white",
        width: '95%',
        height: '94%',
        borderRadius: 8,
        boxShadow: 'rgb(104 92 205 / 20%) 0px 7px 29px 0px',
        display: 'grid',
        gridTemplateRows: '70% 30%',
        alignItems: 'center',
    },
    proav: {
        width: 150,
        height: 150,
        borderRadius: 20,
    },
    fms:{
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: '100%',
        color: 'white',
    },
    zgnyne: {
        width: '42px',
        height: '41px',
        borderRadius: '50%',
        backgroundImage: 'linear-gradient(348deg, #282c34, #213270d1)',
        border: '1px solid white',
    },
    contacte:{
        width: '100%',
        height: '94%',
        borderRadius: 8,
        display: "grid",
        alignItems: "center",
        justifyItems: "center",
        color: '#44507b',
    },
    msgdrdm:{
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'flex-end',
    },
    msg:{
        fontSize: '24px',
        fontFamily: 'serif',
        fontWeight: 'bolder',
        marginLeft: '10%',
        backgroundColor: '#ffffff38',
        padding: 5,
    },
    dmns:{
        width: '95%',
        borderRadius: 8,
        display: 'grid',
        alignItems: 'center',
        padding:3,
        fontSize: 14,
    },
    dmnh:{
        width: '99%',
        height: '100%',
        display: 'grid',
        alignItems:"end",
        gridTemplateColumns: 'repeat(6,16.6%)',
        margin: 8,
        fontWeight: "bold"
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
        padding: 2,
    },
    rejeter:{
        color:"red",
        backgroundColor: "#f4433629",
        borderRadius:8,
        padding: 2,
    },
    null:{
        backgroundColor: "#403c3b29",
        borderRadius:8,
        fontWeight: 'bolder',
        color: '#857f7f',
        fontSize: 20,
    }
})

const Content = ()=>{
    const classes = styles();
    
    const [demands,setDemands] = useState([])
    const {auth} = useContext(AuthContext)
    const [me,setMe] = useState()

    const nouvelle = ()=>{
        try{
            API.get(`api/info-demande/?user=${auth.user_id}&ordering=-id`)
            .then((response)=>{
                setDemands(response?.data?.results)
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
    const utilisateur = ()=>{
        API.get(`api/profile/?user=${auth.user_id}`)
        .then((response)=>{
            setMe(response?.data[0])
        })
    }
    useEffect(()=>{
        nouvelle()
        utilisateur()
    },[])
    return(
        <div className={classes.content}>
            <div className={classes.auter}>
                <div className={classes.greeting}>
                    <div className={classes.greetimg}>

                    </div>
                </div>
                <div className={classes.contacte}>
                    <div className={classes.msgdrdm}>
                        <span className={classes.msg}>Vos dernières demandes:</span>
                    </div>
                    <div className={classes.dmnh}>
                        <span></span>
                        <span>A</span>
                        <span>Date </span>
                        <span>Type </span>
                        <span>Duree</span>
                        <span>Decision</span>
                    </div>
                    <div className={classes.dmns}>
                        {demands.length > 1 ? demands.slice(0,3).map((element,index)=>(
                                <div key={index} className={classes.dmn}>
                                    <span><Avatar src={element.user.profile.photo} sx={{ width: 30, height: 30 }} /></span>
                                    <span>{element.created_date} {element.created_time}</span>
                                    <span>{element.dateCongee}</span>
                                    <span>{element.typecongee}</span>
                                    <span>{element.dureeCongee}</span>
                                    {element.decision === true ? 
                                        <span className={classes.approuver}>
                                            approuver
                                        </span> : element.decision === false ?
                                        <span className={classes.rejeter}>
                                            rejeter
                                        </span> : 
                                        <span className={classes.null}>
                                            ...
                                        </span>
                                        }
                                </div>
                            ))
                            : <div className={classes.dmn} style={{height:20}}></div>}
                    </div>        
                </div>
            </div>
            <div className={classes.my}>
                <div className={classes.calendar}>
                    <Calendar />
                </div>
                <div className={classes.profile}>
                    <div className={classes.avatar}>
                        <img src={me?.photo} className={classes.proav} />
                        <h3>{auth.fname} {auth.lname}</h3>
                    </div>
                    <div className={classes.fms}>
                        <button className={classes.zgnyne}>
                            <FontAwesomeIcon icon={faPhone} color="white" />
                        </button>
                        <button className={classes.zgnyne}>
                            <FontAwesomeIcon icon={faEnvelope} color="white" />    
                        </button>
                        <button className={classes.zgnyne}>
                            <FontAwesomeIcon icon={faMessage} color="white" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Content