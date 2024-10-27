import React, { useEffect, useState } from "react"

import DateWithEvents from "~components/DateWithEvents"
import { MITI_API_ROUTE } from "~constant"

import { CalendarGrid } from "./CalendarGrid"
import NepaliWeekdays from "./DayIndex"
import { processCalendarData } from "./helpers/calendarUtils"
import type { CalendarDayData, ProcessedDay } from "./types/types"

const CalendarBody: React.FC = () => {
  const [calendarData, setCalendarData] = useState<ProcessedDay[][]>([])
  const [selectedDay, setSelectedDay] = useState<ProcessedDay | null>(null)
  const [todayBSDay, setTodayBSDay] = useState<string | null>(null)

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const response = await fetch(MITI_API_ROUTE("2081", "07"))
        const data: CalendarDayData[] = await response.json()
        const weeks = processCalendarData(data)
        setCalendarData(weeks)

        // Find today's date and set both selectedDay and todayBSDay
        const today = weeks.flat().find((day) => day.isToday)
        if (today) {
          setSelectedDay(today)
          setTodayBSDay(today.NepaliNum || null)
        }
      } catch (error) {
        console.error("Error fetching calendar data:", error)
      }
    }

    fetchCalendarData()
  }, [])

  const handleDaySelect = (day: ProcessedDay) => {
    setSelectedDay(day)
  }

  return (
    <div className="plasmo-bg-gray-900 plasmo-p-4 plasmo-w-full">
      <div className="plasmo-space-y-4">
        <div data-today-bs-date={todayBSDay}>
          <DateWithEvents selectedDay={selectedDay} />
        </div>
        <NepaliWeekdays />
        <CalendarGrid
          calendarData={calendarData}
          selectedDay={selectedDay}
          onDaySelect={handleDaySelect}
        />
      </div>
    </div>
  )
}

export default CalendarBody
