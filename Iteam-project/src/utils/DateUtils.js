export function validateDate(date) {
  let olderDate = new Date(date);
  let dateNow = new Date();
  let minimumDateRange = dateNow.setMinutes(dateNow.getMinutes() - 15);

  return minimumDateRange > olderDate.getTime();
}

export function validateStart(date) {
  let dateToCompare = new Date(date);
  let dateNow = new Date();
  let minimumDateRange = dateNow.setMinutes(dateNow.getMinutes() - 15);
  let maximumDateRange = dateNow.setMinutes(dateNow.getMinutes() + 30);

  return (minimumDateRange < dateToCompare.getTime() && dateToCompare.getTime() < maximumDateRange);
}

export function validateHour(newHour) {
  return Date.now() < newHour;
}

export function changeEndDate(startDate, endDate, newDate) {
  if (startDate.getDate() === endDate.getDate()) {
    return newDate;
  }
  let nextDay = new Date(newDate);
  return nextDay.setDate(newDate.getDate() + 1)
}

export function checkDate(programDate, endDate, startHour, endHour) {
  if ((endHour - startHour) < 0 && (programDate.getDate() === endDate.getDate())) {
    let newDay = new Date(programDate);
    newDay.setDate(programDate.getDate() + 1);
    return newDay;
  }
  return endDate;
}
