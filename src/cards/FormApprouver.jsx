import React, { useContext, useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import API from '../api/API'
import AuthContext from '../context/AuthContext'
import dayjs from 'dayjs'

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
    document.getElementById('rh').style.display = 'none'
}
const FormApprouver = ({id,duree,date,decision,nouvelle}) => {
    const classes = styles()
    const {auth} = useContext(AuthContext)

    const [sj,setSJ] = useState()
    const [jd,setJD] = useState()
    const [vrh,setVRH] = useState()
    const [vdrh,setVDRH] = useState()
    const [dt,setDt] = useState(dayjs())
    const [cmnt,setCmnt] = useState('')

    const decisioner = async ()=>{
        document.getElementById('annuler').disabled = true
        document.getElementById('annuler').style.opacity = 0.5
        document.getElementById('confirmer').disabled = true
        document.getElementById('confirmer').style.opacity = 0.5
        const res = await API.patch(`api/demandes/${id}/`,{approuver:true })
        const resRH = await API.post(`api/rh/`,{'demande':id,'solde_jours':sj,'jours_date':jd,'visa_rh':vrh,'visa_drh':vdrh,'date':dt,'comentaire':cmnt })
        .then((response)=>{
            alert('La Processus est Terminer')
            hideAdd()
            document.getElementById('annuler').disabled = false
            document.getElementById('annuler').style.opacity = 1
            document.getElementById('confirmer').disabled = false
            document.getElementById('confirmer').style.opacity = 1
            nouvelle()
        }
        )     
    }
    return (
        <div className={classes.couch1} id='rh'>
            <div className={classes.couch2}>
                <div className={classes.dmcontainer} 
                style={{
                    maxWidth: '60%',
                    minHeight: 250,
                }}>
                    <div className=''>
                        <h1>Formulaire de Demande de Conge</h1>
                        <div>
                            <form style={{
                                textAlign: 'left',
                                margin: 10,
                                padding: 10,
                            }} onSubmit={(e)=>e.preventDefault()}>
                                <div>
                                    <label>Solde en jours</label>
                                    <input type='number' 
                                        className={classes.input} 
                                        value={sj}
                                        onChange={(e)=>setSJ(e.target.value)}
                                        required
                                    />
                                    <label>jours à la date du</label>
                                    <input type='number' 
                                        className={classes.input} 
                                        value={jd}
                                        onChange={(e)=>setJD(e.target.value)}
                                        required
                                    /><br />
                                    <label>Visa RH</label>
                                    <input type='text' 
                                        className={classes.input} 
                                        value={vrh}
                                        onChange={(e)=>setVRH(e.target.value)}
                                        required
                                    />
                                    <label>Visa DRH</label>
                                    <input type='text' 
                                        className={classes.input}
                                        value={vdrh}
                                        onChange={(e)=>setVDRH(e.target.value)}
                                        required 
                                    /><br />
                                </div>
                                <label>Date</label>
                                <input type='date' 
                                    className={classes.input} 
                                    value={dt}
                                    onChange={(e)=>setDt(e.target.value)}
                                    required
                                /><br /><br />
                                <label>Commentaire</label>
                                <input type='text' 
                                    style={{width: '70%'}} 
                                    className={classes.input} 
                                    value={cmnt}
                                    onChange={(e)=>setCmnt(e.target.value)}
                                    required
                                /><br />
                                <button
                                className={classes.b}
                                id='confirmer'
                                onClick={()=>decisioner(id,duree,decision,date)}
                                >Confirmer</button>
                                <button onClick={hideAdd} className={classes.b} id='annuler'>Annuler</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormApprouver