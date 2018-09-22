

const getToday = () => {
  let today = new Date();
  let todayDate = today.getDate() < 10 ? '0' + today.getDate() : today.getDate()
  let todayMonth = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1
  let date = today.getFullYear() + '-' + todayMonth + '-' + todayDate;
  return date;
}

export { getToday };