import parseISO from 'date-fns/parseISO'
import getWeek from 'date-fns/getWeek'

function getWeekNumber (d) {
  return getWeek(parseISO(d))
}

export default getWeekNumber
