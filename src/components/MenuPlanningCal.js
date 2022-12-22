import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react'

import { Calendar, Views, dateFnsLocalizer } from 'react-big-calendar'

import { format } from 'date-fns'
import { parse } from 'date-fns'
import { startOfWeek } from 'date-fns'
import { getDay } from 'date-fns'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import { useSelector } from 'react-redux'

import { Modal } from './Modal'
import useModal from '../customHooks/useModal'

import MenuPlanningCRUD from './MenuPlanningCRUD'

import { updateMenu } from '../services'

import './MenuPlanningCal.css'
import axios from 'axios'
import { memo } from 'react'

const DnDCalendar = withDragAndDrop(Calendar)

export const MenuPlanningCal = memo(() => {
	// export default function MenuPlanning() {
	const auth = useSelector(state => state.auth.user)

	const token = auth.accessToken
	// const user_id = auth.id

	const [isOpenMenuCrud, openMenuCrudModal, closeMenuCrudModal] = useModal(false)

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
	const [dataMenu, setDataMenu] = useState({})
	const [menuCrud, setMenuCrud] = useState({})
	const [isDeleted, setIsDeleted] = useState(false)
	const [isUpdated, setIsUpdated] = useState(false)

	const handleMenuCrud = event => {
		// console.log(recipe_id)
		// console.log(meal)
		// console.log(title)

		setMenuCrud({ id: event.id, token })

		openMenuCrudModal()
	}

	const getMenus = useCallback(async () => {
		try {
			const resp = await axios('https://groceries-shopping.herokuapp.com/menus', {
				headers: {
					'Content-Type': 'application/json',
					accept: 'application/json',
					Authorization: `Bearer ${token}`
				}
			})
			// console.log(resp.data)
			setDataMenu(resp.data)
		} catch (error) {
			console.log(error)
		}
	}, [token])

	useEffect(() => {
		setDataMenu(getMenus(token))
		setIsDeleted(false)
		setIsUpdated(false)
	}, [getMenus, token, isDeleted, isUpdated])

	const changeMenuData = useMemo(() => {
		let date, day, month, year, startDate, endDate

		let events = Object.values(dataMenu).map(menu => {
			date = menu.date

			day = new Date(date).getDate()
			month = new Date(date).getMonth()
			year = new Date(date).getFullYear()

			if (menu.meal === 'breakfast') {
				startDate = new Date(year, month, day, 8)
				endDate = new Date(year, month, day, 12)
			}
			if (menu.meal === 'lunch') {
				startDate = new Date(year, month, day, 12)
				endDate = new Date(year, month, day, 16)
			}
			if (menu.meal === 'dinner') {
				startDate = new Date(year, month, day, 16)
				endDate = new Date(year, month, day, 20)
			}

			let start = new Date(startDate)
			let end = new Date(endDate)

			// console.log('render')

			return {
				id: menu.id,
				recipe_id: menu.recipe_id,
				meal: menu.meal,
				title: `${menu.recipe_title}\nservings: ${menu.servings}`,
				allDay: false,
				start,
				end
			}
		})
		// setMyEvents(events)
		return events
	}, [dataMenu])

	useEffect(() => {
		setMyEvents(changeMenuData)
	}, [dataMenu, changeMenuData])

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

			updateMenu(event.id, start, event.meal, token)
		},
		[token]
	)

	const defaultDate = useMemo(() => new Date(), [])

	return (
		<>
			<DnDCalendar
				defaultDate={defaultDate}
				defaultView={Views.WEEK}
				localizer={localizer}
				events={myEvents}
				views={{ month: true, week: true }}
				style={{ height: 400, margin: '50px' }}
				onEventDrop={moveEvent}
				max={new Date(2022, 11, 10, 20, 0, 0)}
				min={new Date(2020, 11, 10, 8, 0, 0)}
				timeslots={1}
				step={240}
				onSelectEvent={event => handleMenuCrud(event)}
			/>

			<Modal isOpen={isOpenMenuCrud} closeModal={closeMenuCrudModal}>
				<MenuPlanningCRUD
					menuCrud={menuCrud}
					closeMenuCrudModal={closeMenuCrudModal}
					setIsDeleted={setIsDeleted}
					setIsUpdated={setIsUpdated}
				/>
			</Modal>
		</>
	)
	// }
})

export default MenuPlanningCal
