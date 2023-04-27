import React, { useState } from "react"
import { render } from 'react-dom';
import dayjs from "dayjs"
import range from "lodash/range"

const weekDays = ['Dim' , 'Lun' ,'Mar' ,'Mer', 'Jeu' ,'Ven','Sam']

const todayObj = dayjs().locale('fr')

const Calendar1 = () => {
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
    <div className="calendar-container" id="cal" onClick={hideCalendar}>
      <div className="calendar">
        <div className="calendar-header">
          <button type="button" className="nav nav--prev" onClick={handlePrev}>
            &lt;
          </button>
          <div className="datetime">{dayObj.format("MMM DD YYYY")}</div>
          <button type="button" className="nav nav--prev" onClick={handleNext}>
            &gt;
          </button>
        </div>
        <div className="calendar-body">
              <div className="calendar-week-day">
                  {weekDays.map(d => (
                  <div key={d}>
                      {d}
                  </div>
                  ))}
              </div>
        </div>
        <div className="calendar-days">
              {range(weekDayOf1).map(i => (
              <div className="day-cell day-cell--faded" key={i}>
                  {dayObjOf1.subtract(weekDayOf1 - i, "day").date()}
              </div>
              ))}

              {range(daysInMonth).map(i => (
              <div
                  className={`day-cell day-cell--in-month${
                  i + 1 === todayObj.date() &&
                  thisMonth === todayObj.month() &&
                  thisYear === todayObj.year()
                      ? " day-cell--today"
                      : ""
                  }`}
                  key={i}
              >
                  {i + 1}
              </div>
              ))}

              {range(6 - weekDayOfLast).map(i => (
              <div className="day-cell day-cell--faded" key={i}>
                  {dayObjOfLast.add(i + 1, "day").date()}
              </div>
              ))}
        </div>
      </div>
    </div>
  )
}
export default Calendar1
