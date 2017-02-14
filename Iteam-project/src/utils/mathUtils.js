export function calculateTotalPages(amountMeetings, itemsPerPage) {
  return Math.ceil(amountMeetings / itemsPerPage);
}

export function calculateOffset(actualPageNumber, itemsPerPage) {
  console.debug(actualPageNumber);
  console.debug(itemsPerPage);
  console.debug(actualPageNumber * itemsPerPage);
  console.debug(Math.ceil(actualPageNumber * itemsPerPage));
  return Math.ceil(actualPageNumber * itemsPerPage);
}
