export function calculateTotalPages(amountMeetings, itemsPerPage) {
  return Math.ceil(amountMeetings / itemsPerPage);
}

export function calculateOffset(actualPageNumber, itemsPerPage) {
  return Math.ceil(actualPageNumber * itemsPerPage);
}
