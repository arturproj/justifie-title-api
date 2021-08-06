function addHoursToDate(date, hours=1) {
  return new Date(new Date(date).setHours(date.getHours() + hours));
}

module.exports = {
  addHoursToDate,
};
