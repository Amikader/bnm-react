import React from 'react'
import API from '../api/API'

const useCalendarDates = async () => {
    const dates = []
    await API.get(`api/calendar`)
    .then((response)=>{
        dates.push({"title":response?.data?.user?.first_name,"date":response?.data?.dateCongee})
    })
  return dates
}

export default useCalendarDates