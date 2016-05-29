import React, {Component,PropTypes} from 'react';
var DayPicker = require('react-datepicker');

function sunday(day) {
  return day.getDay() === 0;
}

export class DatePicker extends React.Component {
  state = {
    selectedDay: new Date()
  }
  handleDayClick(e, day, { selected, disabled }) {
    if (disabled) {
      return;
    }
    if (selected) {
      this.setState({ selectedDay: null })
    } else {
      this.setState({ selectedDay: day });
    }
  }
  render() {
    return (
      <DayPicker
        initialMonth={ new Date(2016, 1) }
        disabledDays={ sunday }
        selectedDays={ day => DateUtils.isSameDay(this.state.selectedDay, day) }
        onDayClick={ this.handleDayClick.bind(this) }
    />);
  }
}
export default DatePicker
