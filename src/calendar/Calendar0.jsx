import {Calendar} from 'react-calendar'
import { useState,useEffect } from 'react'
import 'react-calendar/dist/Calendar.css'
import '../css/calendar.css'
import API from '../api/API'
import dayjs from 'dayjs'


const Calendar0 =({debut,fin,direction})=>{
    const [value,onChange]=useState([new Date(debut),new Date(fin)])
    const [inter,setInter] = useState([])
    const hide = true
    const hideCalendar = e =>{
        document.getElementById('hide').style.display = 'none'
    }
    const ho = document.getElementById('hide')
    const h = document.getElementById('hide-cl')
    document.addEventListener('click',(e)=>{
        if(e.target === h || e.target === ho && e.target.parentNode != h){
            ho.style.display = 'none'
        }
        }
    )
    const nouvelle = ()=>{
        if(direction != null){
            API.get(`api/periode/?debut=${debut}&fin=${fin}&direction=${direction}`)
            .then((response)=>{
            setInter(response?.data)
            })
        }
    }
    useEffect(()=>{
        nouvelle()
    },[direction])
    return(
        <div className='cl-container' id='hide'>
            <div className='cl-black-container' id='hide-cl'>
                <div style={
                   { width: '95%',
                    height: '42%',
                    backgroundColor: 'white',
                    borderRadius: 10,
                    padding: 5,
                    fontSize:'110%',
                    color: '#44507b',}
                }
                >
                    <h3>Les Conges dans ce Intervale</h3>
                    <table style={{
                        width: '100%',
                        maxHeight: '90%',
                        margin: '5px 0',
                    }}>
                        
                        <tr><th>Employer</th><th>Debut</th><th>Fin</th><th>Duree</th><th>Direction</th></tr>
                        
                        <tbody>
                            {inter.length >=1 ? (inter.map((element,index)=>
                            <tr>
                                <td>{element.user.first_name} {element.user.last_name}</td>
                                <td>{element.dateCongee}</td>
                                <td>{dayjs(element.dateCongee).add(element.dureeCongee,'day').format('YYYY-MM-DD')}</td>
                                <td>{element.dureeCongee}</td>
                                <td>{element.direction.nom}</td>
                            </tr>
                            )) : <h1>Aucune</h1>}
                        </tbody>
                    </table>
                </div>
                <div>
                    <Calendar
                        value={value}
                        local ='fr'
                    />
                </div>
            </div>
        </div>
    )
}

export default Calendar0