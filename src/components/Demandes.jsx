import React, { useContext, useEffect, useState } from 'react'
import {styles} from '../css/Demand.css'
import NewDemands from './NewDemands'
import { choisir,entete, mesEntete } from '../entetes/Entetes'
import MesDemands from './MesDemands'
import AddDemmand from '../cards/AddDemmand'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faPlus } from '@fortawesome/free-solid-svg-icons'
import PaginationDemands from '../api/PaginationDemands'
import Tous from './Tous'
import AuthContext from '../context/AuthContext'


const Demandes = () => {
    const classes = styles()
    const [fil,setFil] = useState(0)
    const [page,setPage] = useState(1)
    const [totalPages,setTotalPages] = useState()
    const [dateConge,setDateConge] = useState('')
    const [dureeConge,setDureeConge] = useState('')
    const [typeConge,setTypeConge] = useState('')
    const [fname,setFname] = useState('')
    const [mat,setMat] = useState('')
    const {recherche} = useContext(AuthContext)


    useEffect(()=>{
        if(Number(recherche)=== NaN){
            setFname(recherche)
        }else if(Number(recherche) === 0){
            setFname('')
            setMat('')
        }else{
            setMat(recherche)
        }
    },[recherche])
    const filtpar = ()=>{
        if(fil == 1){
            return(
                <div className={classes.filCont} style={{transform: 'translate(-333px,10px)'}}>
                    <div className={classes.closeFil}>
                        <button onClick={()=>setFil(0)} className={classes.x}>x</button>
                    </div>
                    <div className={classes.filDateInp}>
                        <label htmlFor='debut'>entre : </label>
                        <input type='date' id='debut'
                            value={dateConge}
                            onChange={(e)=>setDateConge(e.target.value)}
                        />
                    </div>
                </div>
            )
        }else if(fil == 2){
            return(
                <div className={classes.filCont} style={{transform: 'translate(-248px,10px)'}}>
                    <div className={classes.closeFil}>
                        <button onClick={()=>setFil(0)} className={classes.x}>x</button>
                    </div>
                    <div className={classes.filDateInp}>
                        <input type='number'
                            value={dureeConge}
                            onChange={(e)=>setDureeConge(e.target.value)}
                        />
                    </div>
                </div>
            )
        }else if(fil == 3){
            return(
                <div className={classes.filCont} style={{transform: 'translate(-149px,10px)'}}>
                    <div className={classes.closeFil}>
                        <button onClick={()=>setFil(0)} className={classes.x}>x</button>
                    </div>
                    <div className={classes.filDateInp}>
                        <select onChange={(e)=>setTypeConge(e.target.value)}>
                            <option></option>
                            <option>Annuel</option>
                            <option>Malade</option>
                            <option>Maternite</option>
                            <option>Exceptionnelle</option>
                        </select>
                    </div>
                </div>
            )
        }else{
            return null
        }
    }

    const [toggle,setToggle] = useState(0)

    const toggled = ()=>{
        if(toggle === 1){
            return <Tous 
                        setTotalPages={setTotalPages} 
                        page={page} 
                        setPage={setPage} 
                        dureeConge={dureeConge}
                        dateConge={dateConge}
                        typeConge={typeConge}
                        fname={fname}
                        mat={mat}
                    />
        }else if(toggle === 2){
            return <MesDemands 
                        setTotalPages={setTotalPages} 
                        page={page} 
                        setPage={setPage} 
                        dureeConge={dureeConge}
                        dateConge={dateConge}
                        typeConge={typeConge}
                    />
        }else{
            return <NewDemands 
                        setTotalPages={setTotalPages} 
                        page={page} 
                        setPage={setPage} 
                        dureeConge={dureeConge}
                        dateConge={dateConge}
                        typeConge={typeConge}
                        fname={fname}
                        mat={mat}
                    />
        }
    }
    const toggledEntete = ()=>{
        if(toggle === 2){
            return(
                <tr className={classes.thead} style={{display: 'flex',justifyContent: 'space-evenly',
                alignItems: 'flex-end'}}> 
                    {mesEntete.map((element,index)=>{
                        return <th key={index} className={classes.thtd}>{element.title}</th>
                    })}
                    <th></th>
                </tr>
            )
        }else{
            return(
                <tr className={classes.thead}>
                    {entete.map((element,index)=>{
                        if(element.title == 'Nom' || element.title == 'Decision'){
                            return <th colSpan={2} key={index} className={classes.thtd}>{element.title}</th>
                        }
                        return <th key={index} className={classes.thtd}>{element.title}</th>
                    })}
                </tr>
            )
        }
    }
    const ajouter = ()=>{
        document.getElementById('ch1').style.display='block'
    }
    const [comp,setComp] = useState()
    useEffect(()=>{
        toggled()
        toggledEntete()
    },[])
    useEffect(()=>{
        {console.log(page)}
    },[page])
    return (
        <div className={classes.dmnd}>
            <div className={classes.list}>
                <div className={classes.dmheaders} id='listDem' >
                    { choisir.map((element,index)=>{
                        return(
                            <>
                            {toggle === index? (
                                <div className={classes.listfocus}
                                    onClick={()=>setToggle(index)}
                                >
                                    <h5>{element.title}</h5>
                                </div>
                            ):(
                                <div className={classes.listnonfocus}
                                    onClick={()=>setToggle(index)}
                                >
                                    <h5>{element.title}</h5>
                                </div>
                            )}
                                
                            </>
                        )
                    })}
                </div>
                <div className={classes.filter}>
                    <div className={classes.butt}>
                        <button onClick={()=>setFil(1)} className={classes.filBut}>Date</button>
                        <button onClick={()=>setFil(2)} className={classes.filBut}>Dure</button>
                        <button onClick={()=>setFil(3)} className={classes.filBut}>Type</button>
                        {toggle === 2 ? <button 
                            className={classes.adddm}
                            onClick={ajouter}
                            >
                                <FontAwesomeIcon icon={faPlus} />
                            </button>: null }
                    </div>
                    <div >
                        {filtpar()}
                    </div>
                </div>
                <table className={classes.tab}>
                    <thead >
                        {toggledEntete()}
                    </thead>
                        {toggled()}
                </table>
                
                <PaginationDemands setPage={setPage} totalPages={totalPages} page={page} />


                <AddDemmand />
            </div>
        </div>
  )
}

export default Demandes