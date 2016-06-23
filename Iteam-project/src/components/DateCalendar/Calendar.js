import Calendar from 'react-input-calendar'
import React from 'react'


class DateCalendar extends React.Component{


  render()
  {


    let d = new Date();
    let dateStr =  d.currentMonth + "-" + d.currentDay + "-" + d.currentYear;
    let datestring =d.currentDate
    return(


//$("#datepicker").datepicker(({dateFormat: "dd-mm-yy" autoclose: true, defaultDate: dateStr });
    <Calendar format='DD/MM/YYYY' date='06-21-2016'/>
  );
};
}
export default DateCalendar
