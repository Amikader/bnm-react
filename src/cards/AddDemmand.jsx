import React, { useContext, useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import API from '../api/API'
import AuthContext from '../context/AuthContext'

const styles = makeStyles({
    couch1:{
        display: 'none',
        width: '86.1%',
        height: '92.5%',
        top: '7.5%',
        right: '0%',
        backgroundColor: '#d1c9c945',
        position: 'fixed',
        zIndex:1000,
    },
    couch2:{
        width: '86.1%',
        height: '92.5%',
        right: '0%',
        top: '7.5%',
        backgroundColor: '#181717b5',
        position: 'fixed',
        display: 'grid',
        alignItems: 'center',
        justifyItems: 'center',
    },
    dmcontainer:{
        backgroundColor: '#efefef',
        color: '#37405c',
        borderRadius:10,
        boxShadow:'rgb(104 92 205 / 20%) 0px 7px 29px 0px',
        paddingBottom: 7,
    },
    input:{
        outline: 'none',
        border: 'none',
        borderBottom: '1px solid black',
        borderBottomColor: '#37405c',
        backgroundColor: 'transparent',
        padding: 2,
        textAlign: 'center',
        margin: '5px 10px',
    },
    b:{
        width: '30%',
        height: '25px',
        margin: '2px',
        borderRadius: '10px',
        outline: 'none',
        border: 'none',
        color: '#3d486b',
        backgroundColor: 'white',
        fontWeight: 'bolder',
        boxShadow: 'rgb(104 92 205 / 20%) 0px 7px 29px 0px',
        marginTop: 10,
        float: 'right',
        '&:hover':{
            backgroundColor: '#3d486b',
            color: '#fff'
        }
    }
})
const hideAdd = ()=>{
    document.getElementById('ch1').style.display = 'none'
}
const AddDemmand = () => {
    const classes = styles()
    const [excep,setExcep] = useState(null)
    const [nbrEnf,setNbEnf] = useState(0)
    const {auth} = useContext(AuthContext)
    const [profile,setProfile] = useState()
    const [except,setExcept] = useState(false)
    const [decision,setDecision] = useState(auth['post_nom']==='responsable' || auth['direction_nom']==='rh' ? true : null)

    const nouvelle = async ()=>{
        try{
            await API.get(`api/profile/?user=${auth.user_id}`)
            .then((response)=>{
                setProfile(response?.data?.results[0])
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
    
    const envoyer = (e)=>{
        e.preventDefault()
        API.post('api/set-demande/',
            {
                'user':auth.user_id,
                'dateCongee':e.target.date_cng.value,
                'dureeCongee':e.target.periode.value,
                'typecongee':e.target.type.value,
                'nbenf':nbrEnf ,
                'excep':excep,
                'direction':auth['direction_id'],
                'decision':decision
            }
        ).then((res)=>{
            if (res?.status===201){
                alert('La demande a été envoyée avec succès')
                setInterval(hideAdd(), 1000);
            }
            else{
                alert('votre demande est echoue !!')
                setInterval(hideAdd(), 1000);
            }
        })
        
    }
    
    const exceptionnel = ()=>{
        if(except ) {
            return(<>
                <ul style={{
                        listStyle: 'none',
                        marginLeft: 20,
                    }}>
                    <li><input type='radio' name='exception' value='m' onClick={(e)=>setExcep(e.target.value)}/><label>Mariage</label></li>
                    <li><input type='radio' name='exception' value='mf' onClick={(e)=>setExcep(e.target.value)} /><label>Mariage d'un(e) fils/fille ou d'un(e) frere/soeur</label></li>
                    <li><input type='radio' name='exception' value='deJE' onClick={(e)=>setExcep(e.target.value)} /><label>deces du conjoint ou d'un enfant</label></li>
                    <li><input type='radio' name='exception' value='deMP' onClick={(e)=>setExcep(e.target.value)} /><label>deces de la mere ou  du pere</label></li>
                    <li><input type='radio' name='exception' value='naisE' onClick={(e)=>setExcep(e.target.value)} /><label>Naissance d'un enfant</label></li>
                    <li><input type='radio' name='exception' value='batE' onClick={(e)=>setExcep(e.target.value)} /><label>Bateme d'un enfant</label></li>
                    <li><input type='radio' name='exception' value='auter' onClick={(e)=>setExcep(e.target.value)} /><label>permission autre</label></li>
                </ul>
            </>)
        }else{
            return null
        }
    }
    useEffect(()=>{
        exceptionnel()
    },[except])
    return (
        <div className={classes.couch1} id='ch1'>
            <div className={classes.couch2}>
                <div className={classes.dmcontainer}>
                    <span 
                        style={{float: 'right',paddingRight:15,paddingTop:15,paddingBottom:7,cursor:'pointer'}}
                        onClick={hideAdd}
                    >X</span>
                    <div className=''>
                        <h1
                        style={
                            {
                                fontSize: 23,
                                padding: 3,
                                boxShadow: 'rgb(104 92 205 / 20%) 0px 7px 29px 0px',
                            }
                        }>Formulaire de demande de congé</h1>
                        <div>
                            <form style={{
                                textAlign: 'left',
                                margin: 10,
                                padding: 10,
                            }} onSubmit={envoyer}>
                                

                                <h3>Type congé</h3>
                                <ul style={{
                                    listStyle: 'none',
                                    marginLeft: 10,
                                }}>
                                    <li><input type='radio' value='Annuel'name='type' onClick={()=>setExcept(false)} /><label>Annuel</label></li>
                                    <li><input type='radio' value='Malade'name='type' onClick={()=>setExcept(false)} /><label>Malade</label></li>
                                    {auth?.gender ==='F'? <>
                                    <li><input type='radio' value='Maternite'name='type' onClick={()=>setExcept(false)} /><label>Maternite</label></li></>:null}
                                    <li><input type='radio' value='Exceptionnelle'name='type' onClick={()=>setExcept(true)} /><label>Exceptionnelle</label></li>
                                    <li>
                                        {exceptionnel()}
                                    </li>
                                <br />
                                </ul>
                                <div>
                                    <label>Nombre de jours ouvrés demandés: </label>
                                    <input 
                                        type='number' 
                                        value={24}
                                        readOnly
                                        className={classes.input}
                                    /><br />
                                </div>
                                <div>
                                    <label>Date: </label>
                                    <input 
                                        type='date' 
                                        name='date_cng'
                                        className={classes.input}
                                    />
                                    <label>Période Sollicitée</label>
                                    <input 
                                        type='number' 
                                        min={1}
                                        name='periode'
                                        className={classes.input}
                                    /><br />
                                </div>
                                <div>
                                    <label>Date de Reprise Réelle: </label>
                                    <input 
                                        type='date' 
                                        name='dr_reel'
                                        className={classes.input}
                                    /><br />
                                </div>
                                {auth?.gender === 'F' ?
                                <>
                                    <label>Nomber d'enfants moins de 14ans</label>
                                    <input 
                                        type='number' 
                                        value={nbrEnf}
                                        onChange={(e)=>setNbEnf(e.target.value)}
                                        className={classes.input} 
                                    /><br />
                                </>: null}
                                <button type='reset' className={classes.b}>Annuler</button>
                                <button type='submit' className={classes.b}>Envoyer</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddDemmand