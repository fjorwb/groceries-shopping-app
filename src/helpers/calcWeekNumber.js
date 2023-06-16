import getWeek from 'date-fns/getWeek'

function getWeekNumber(d) {
  return getWeek(d, { weekStartsOn: 1 })
}

export default getWeekNumber
