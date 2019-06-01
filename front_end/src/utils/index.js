export function isInteger (str) {
  return /^[0-9]{1,}$/.test(str)
}

export function getCurrentWeek () {
  let year = new Date().getFullYear()
  let month = new Date().getMonth() + 1
  let day = new Date().getDate()
  let date1 = new Date(year, parseInt(month) - 1, day)
  let date2 = new Date(year, 0, 1)
  let d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000)
  return year + '年第' + Math.ceil((d + ((date2.getDay() + 1) - 1)) / 7) + '周'
}

export function getLastWeek () {
  let year = new Date().getFullYear()
  let month = new Date().getMonth() + 1
  let day = new Date().getDate()
  let date1 = new Date(year, parseInt(month) - 1, day)
  let date2 = new Date(year, 0, 1)
  let d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000)
  let week = Math.ceil((d + ((date2.getDay() + 1) - 1)) / 7)
  if (week === 1) {
    year = year - 1
    week = 52
  } else {
    week = week - 1
  }
  return year + '年第' + week + '周'
}

export function weekNumToChinse (num) {
  switch (parseInt(num)) {
    case 1:
      return '一'
    case 2:
      return '二'
    case 3:
      return '三'
    case 4:
      return '四'
    case 5:
      return '五'
    case 6:
      return '六'
    case 7:
      return '日'
    default:
      return ''
  }
}
