import moment from 'moment'

function getWeekNumber(d) {
	const dd = new Date(d)
	const week = moment(dd).week()
	return week
}

export default getWeekNumber
