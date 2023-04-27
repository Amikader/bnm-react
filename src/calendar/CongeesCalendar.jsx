import React, { useContext, useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import AuthContext from '../context/AuthContext'
import API from '../api/API'
import useCalendarDates from '../cards/useCalendarDates'

const CongeesCalendar=({events_dates})=> {
  const {auth} = useContext(AuthContext)
  //[
  //   {"title":"yahevdhou","start":"2023-03-23","end":"2023-03-24"},
  //   {"title":"ami","start":"2023-03-23","end":"2023-03-26"},
  //   {"title":"yahevdhou","start":"2023-03-23","end":"2023-03-30"},
  //   {"title":"ami","start":"2023-03-23","end":"2023-03-28"},
  //   {"title":"yahevdhou","start":"2023-03-23","end":"2023-03-27"},
  //   {"title":"ami","start":"2023-03-23","end":"2023-03-29"},
  // ]
  const getEvents = (info, successCallback) =>{
    if(auth['direction_nom'] === 'rh' && auth['post_nom'] === 'responsable'){
      API.get(`api/periodes/`).then((events) =>{
        successCallback(events.data)
      })
    }else{
      API.get(`api/periodes/?direction=${auth.direction_id}`).then((events) =>{
        successCallback(events.data)
      })
    }
  }
  console.log(events_dates)
  return(
    <div style={{width: '98%',backgroundColor: '#efefef',margin:'10px auto'}}>
      
        <FullCalendar
          plugins={[ dayGridPlugin ]}
          events={(info, successCallback) => getEvents(info, successCallback)}
          locale='fr'
          headerToolbar={{
            start: "today prev next",
            center: "title",
            end: "dayGridWeek,dayGridMonth,dayGridYear"
          }}
          height='98%'
        />
    </div>
  )
}

export default CongeesCalendar;