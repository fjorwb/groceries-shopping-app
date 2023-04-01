import getWeek from 'date-fns/getWeek'

function getWeekNumber ( d ) {
  const week = getWeek( d )
  return week
}

export default getWeekNumber
