import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
// import PropTypes from 'prop-types'

import { Calendar, Views, dateFnsLocalizer } from 'react-big-calendar'
// import { momentLocalizer } from 'react-big-calendar'
// import moment from 'moment'

import { format } from 'date-fns'
import { parse } from 'date-fns'
import { startOfWeek } from 'date-fns'
import { getDay } from 'date-fns'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
// import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import { useSelector } from 'react-redux'
import axios from 'axios'

const DnDCalendar = withDragAndDrop(Calendar)

export default function MenuPlanning() {
	const auth = useSelector(state => state.auth.user)

	const token = auth.accessToken
	// const user_id = auth.id

	const locales = {
		'en-US': import('date-fns/locale/en-US')
	}

	const localizer = dateFnsLocalizer({
		format,
		parse,
		startOfWeek,
		getDay,
		locales
	})

	const [myEvents, setMyEvents] = useState([])

	const getMenus = async () => {
		try {
			const resp = await axios('https://groceries-shopping.herokuapp.com/menus', {
				headers: {
					'Content-Type': 'application/json',
					accept: 'application/json',
					Authorization: `Bearer ${token}`
				}
			})
			return resp.data
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getMenus().then(data => {
			let startDate, endDate, day, month, year, date

			const events = data.map(menu => {
				date = menu.date

				if (menu.meal === 'breakfast') {
					day = new Date(date).getDate()
					month = new Date(date).getMonth()
					year = new Date(date).getFullYear()
					startDate = new Date(year, month, day, 8)
					endDate = new Date(year, month, day, 12)
				}
				if (menu.meal === 'lunch') {
					day = new Date(date).getDate()
					month = new Date(date).getMonth()
					year = new Date(date).getFullYear()
					startDate = new Date(year, month, day, 12)
					endDate = new Date(year, month, day, 16)
				}
				if (menu.meal === 'dinner') {
					let day = new Date(date).getDate()
					let month = new Date(date).getMonth()
					let year = new Date(date).getFullYear()
					startDate = new Date(year, month, day, 16)
					endDate = new Date(year, month, day, 20)
				}

				let start = new Date(startDate)
				let end = new Date(endDate)

				return {
					id: menu.id,
					title: `${menu.recipe_title}\nservings: ${menu.servings}`,
					allDay: false,
					start,
					end
				}
			})
			setMyEvents(events)
		})
	})

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const updateMenu = async (id, date, meal) => {
		if (date.getHours() < 12) {
			meal = 'breakfast'
		}
		if (date.getHours() >= 12 && date.getHours() < 16) {
			meal = 'lunch'
		}
		if (date.getHours() >= 16) {
			meal = 'dinner'
		}

		try {
			const resp = await axios.put(
				`https://groceries-shopping.herokuapp.com/menus/${id}`,
				{
					date,
					meal
				},
				{
					headers: {
						'Content-Type': 'application/json',
						accept: 'application/json',
						Authorization: `Bearer ${token}`
					}
				}
			)
			console.log(resp)
		} catch (error) {
			console.log(error)
		}
	}

	const moveEvent = useCallback(
		({ event, start, end, isAllDay: droppedOnAllDaySlot = false }) => {
			const { allDay } = event
			if (!allDay && droppedOnAllDaySlot) {
				event.allDay = true
			}

			setMyEvents(prev => {
				const existing = prev.find(ev => ev.id === event.id) ?? {}
				const filtered = prev.filter(ev => ev.id !== event.id)
				return [...filtered, { ...existing, start, end, allDay }]
			})

			updateMenu(event.id, start, event.meal)
		},

		[updateMenu]
	)

	const defaultDate = useMemo(() => new Date(), [])

	return (
		<>
			<DnDCalendar
				defaultDate={defaultDate}
				defaultView={Views.WEEK}
				localizer={localizer}
				events={myEvents}
				// startAccessor="start"
				// endAccessor="end"
				views={{ month: true, week: true }}
				// views={{ month: true, week: true, day: true }}
				style={{ height: 500, margin: '50px' }}
				onEventDrop={moveEvent}
				max={new Date(2022, 11, 10, 20, 0, 0)}
				min={new Date(2020, 11, 10, 8, 0, 0)}
				timeslots={3}
				step={80}
				// draggableAccessor={event => true}
			/>
		</>
	)
}

// MenuPlanning.propTypes = {
// 	localizer: PropTypes.instanceOf(dateFnsLocalizer)
// }
