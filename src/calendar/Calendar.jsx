import React, { useState } from "react"
import { render } from 'react-dom';
import dayjs from "dayjs"
import range from "lodash/range"
import { makeStyles } from "@mui/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faArrowLeftLong, faArrowRight, faArrowRightLong, faArrowRightToCity, faLongArrowRight } from "@fortawesome/free-solid-svg-icons";

// import Calendar from 'react-calendar';

const weekDays = ['Dim' , 'Lun' ,'Mar' ,'Mer', 'Jeu' ,'Ven','Sam']

const todayObj = dayjs().locale('fr')

const styles = makeStyles({
    calendar:{
        margin: 10,
        height: '96%',
        display: 'grid',
        gridTemplateRows: '15% 85%',
        alignItems: 'center',
    },
    header:{
        color: 'blue',
        display: 'flex',
        justifyContent: 'space-between',
    },
    daysContainer:{
        boxShadow: 'rgb(104 92 205 / 20%) 0px 7px 29px 0px',
        borderRadius: 10,
        backgroundColor: 'white',
        padding: '10px 0',
        height: '95%',
        color: '#44507b',
    },
    weekdays: {
        margin: 2,
    },
    weekday: {
        fontWeight: "bolder",
        display: 'flex',
        justifyContent: 'space-around',
        padding: 2,
    },
    monthdays:{
        display: 'grid',
        gridTemplateColumns: 'repeat(7,1fr)',
        justifyContent: 'center',
        justifyItems: 'center',
        fontWeight: 'bold',
    },
    cellFaded:{
        opacity: 0.15,
        width: 15,
        height: 15,
        padding: 6,
    },
    cellDay:{
        width: 19,
        height: 15,
        padding: 6,
    },
    npbc:{
        width: '25%',
        display: 'flex',
        justifyContent: 'space-around'
    },
    npb:{
        padding: 5,
        backgroundImage: 'linear-gradient(348deg, #282c34, #213270d1)',
        borderRadius: 5,
        border: 'none',
        boxShadow: 'rgb(47 37 131 / 63%) 0px 7px 29px 0px',
        width: '30%',
    },
    '@keyframes to-top':{
        "0%": {
            transform: 'translateY(100%)',
            opacity: 0,
        },
        "100%": {
            transform: 'translateY(0)',
            opacity: 1,
        }
    }
})

const Calendar = () => {
    const classes= styles()
  const [dayObj, setDayObj] = useState(dayjs())

  const thisYear = dayObj.year()
  const thisMonth = dayObj.month() // (January as 0, December as 11)
  const daysInMonth = dayObj.daysInMonth()

  const dayObjOf1 = dayjs(`${thisYear}-${thisMonth + 1}-1`)
  const weekDayOf1 = dayObjOf1.day() // (Sunday as 0, Saturday as 6)

  const dayObjOfLast = dayjs(`${thisYear}-${thisMonth + 1}-${daysInMonth}`)
  const weekDayOfLast = dayObjOfLast.day()

  const handlePrev = () => {
    setDayObj(dayObj.subtract(1, "month"))
  }

  const handleNext = () => {
    setDayObj(dayObj.add(1, "month"))
  }
  const hideCalendar = ()=>{
    document.getElementById('cal').style.display = 'none'
  }
  return (
    <div className={classes.calendar}>
    <div className={classes.header}>
        <div className="datetime">{dayObj.format("MMMM YYYY")}</div>
        <div className={classes.npbc}>
            <button type="button" className={classes.npb} onClick={handlePrev}>
                <FontAwesomeIcon icon={faArrowLeftLong} color='white' />
            </button>
            <button type="button" className={classes.npb} onClick={handleNext}>
                <FontAwesomeIcon icon={faArrowRightLong} color='white' />
            </button>
            </div>
        </div>
        <div className={classes.daysContainer}>
            <div className={classes.weekdays}>
                <div className={classes.weekday}>
                    {weekDays.map(d => (
                    <div key={d}>
                        {d}
                    </div>
                    ))}
                </div>
            </div>
            <div className={classes.monthdays}>
                {range(weekDayOf1).map(i => (
                <div className={classes.cellFaded} key={i}>
                    {dayObjOf1.subtract(weekDayOf1 - i, "day").date()}
                </div>
                ))}

                {range(daysInMonth).map(i => (
                <div
                    className={`${classes.cellDay} ${
                    i + 1 === todayObj.date() &&
                    thisMonth === todayObj.month() &&
                    thisYear === todayObj.year()
                        ? 'today'
                        : ""
                    }`}
                    key={i}
                >
                    {i + 1}
                </div>
                ))}

                {range(6 - weekDayOfLast).map(i => (
                <div className={classes.cellFaded} key={i}>
                    {dayObjOfLast.add(i + 1, "day").date()}
                </div>
                ))}
            </div>
        </div>
    </div>
  )
}
export default Calendar
