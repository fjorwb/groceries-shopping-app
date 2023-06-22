import React, { useCallback, useEffect, useMemo, useState, memo } from 'react'
import { useSelector } from 'react-redux'

import axios from 'axios'

import { Calendar, Views, dateFnsLocalizer } from 'react-big-calendar'

import { format, parse, startOfWeek, getDay } from 'date-fns'

import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'

import { Modal } from '../Modal'
import useModal from '../../customHooks/useModal'

import MenuPlanningCRUD from './MenuPlanningCRUD'

import { updateMenu } from '../../services'

import './MenuPlanningCalendar.css'

const DnDCalendar = withDragAndDrop(Calendar)

export const MenuPlanningCal = () => {
  const state = useSelector((state) => state)

  const token = state.auth.user.accessToken
  const url = state.url.url
  const user_id = state.auth.user.id

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

  const handleMenuCrud = (event) => {
    console.log(event)

    setMenuCrud({ id: event.id, url, token })

    console.log(menuCrud.id)

    openMenuCrudModal()
  }

  const getMenus = useCallback(async () => {
    try {
      const resp = await axios(`${url}menus`, {
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*'
        }
      })
      console.log(resp.data)
      setDataMenu(resp.data)
    } catch (error) {
      console.log(error)
    }
  }, [token, url])

  useEffect(() => {
    setDataMenu(getMenus(token))
    setIsDeleted(false)
    setIsUpdated(false)
  }, [getMenus, token, isDeleted, isUpdated])

  const changeMenuData = useMemo(() => {
    let date, day, month, year, startDate, endDate

    const events = Object.values(dataMenu).map((menu) => {
      if (menu.user_id !== user_id) return null

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

      const start = new Date(startDate)
      const end = new Date(endDate)

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
    return events
  }, [dataMenu, user_id])

  useEffect(() => {
    setMyEvents(changeMenuData)
  }, [dataMenu, changeMenuData])

  const moveEvent = useCallback(
    ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }) => {
      const { allDay } = event
      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true
      }

      setMyEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {}
        const filtered = prev.filter((ev) => ev.id !== event.id)
        return [...filtered, { ...existing, start, end, allDay }]
      })

      updateMenu(event.id, start, event.meal, url, token)
    },
    [token, url]
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
        max={new Date(2100, 11, 10, 20, 0, 0)}
        min={new Date(2020, 11, 10, 8, 0, 0)}
        timeslots={1}
        step={240}
        onSelectEvent={(event) => handleMenuCrud(event)}
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
}

export default memo(MenuPlanningCal)
