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

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const response = await fetch(MITI_API_ROUTE("2081", "07")) // Fetch data for the month of Kartik ( You need to make this dynamic )
        const data: CalendarDayData[] = await response.json()
        const weeks = processCalendarData(data)
        setCalendarData(weeks)

        // Find and select today's date initially
        const today = weeks.flat().find((day) => day.isToday)
        if (today) {
          setSelectedDay(today)
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
        <div data-today-bs-date="10">
          {" "}
          {/* Add today's nepali months day dynamically */}
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
