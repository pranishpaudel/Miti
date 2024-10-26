import React from "react"

import type { ProcessedDay } from "./Calendar/types/types"

interface DateWithEventsProps {
  selectedDay: ProcessedDay | null
}

const DateWithEvents: React.FC<DateWithEventsProps> = ({ selectedDay }) => {
  if (!selectedDay || selectedDay.empty) {
    return null
  }

  // Get current date for comparison
  const today = new Date()
  const dateObj = new Date(
    today.getFullYear(),
    today.getMonth(),
    parseInt(selectedDay.date || "1")
  )
  const dayName = dateObj.toLocaleString("en-US", { weekday: "long" })
  const monthName = dateObj.toLocaleString("en-US", { month: "long" })

  // Function to convert Nepali number string to English number
  const convertNepaliToEnglish = (nepaliNum: string): number => {
    const nepaliDigits: { [key: string]: string } = {
      "०": "0",
      "१": "1",
      "२": "2",
      "३": "3",
      "४": "4",
      "५": "5",
      "६": "6",
      "७": "7",
      "८": "8",
      "९": "9"
    }
    return parseInt(
      nepaliNum
        .split("")
        .map((digit) => nepaliDigits[digit] || digit)
        .join("")
    )
  }

  // Calculate days difference using Nepali dates
  const todayNepaliDate = document
    .querySelector("[data-today-bs-date]")
    ?.getAttribute("data-today-bs-date")
  const selectedNepaliDate = selectedDay.NepaliNum

  let diffDays = 0
  if (todayNepaliDate && selectedNepaliDate) {
    const todayNum = convertNepaliToEnglish(todayNepaliDate)
    const selectedNum = convertNepaliToEnglish(selectedNepaliDate)
    diffDays = selectedNum - todayNum
  }

  // Function to get relative day text
  const getRelativeDayText = (dayDiff: number): string => {
    if (dayDiff === 0) return "today"
    if (dayDiff === 1) return "tomorrow"
    if (dayDiff === -1) return "yesterday"
    if (dayDiff > 1) return `${dayDiff} days after`
    return `${Math.abs(dayDiff)} days before`
  }

  return (
    <div className="plasmo-h-[22%] plasmo-w-full plasmo-border plasmo-border-slate-600 plasmo-rounded-lg plasmo-bg-slate-900 plasmo-text-white plasmo-p-4">
      <div className="plasmo-flex plasmo-items-start plasmo-gap-4">
        {/* Date Circle */}
        <div className="plasmo-flex plasmo-flex-col plasmo-items-center plasmo-gap-2">
          <div
            className={`plasmo-w-12 plasmo-h-12 plasmo-rounded-full plasmo-border 
            ${selectedDay.isHoliday || selectedDay.isWeekend ? "plasmo-border-red-400 plasmo-text-red-400" : "plasmo-border-gray-400 plasmo-text-gray-400"}
            plasmo-flex plasmo-items-center plasmo-justify-center`}>
            <span className="plasmo-text-xl">{selectedDay.NepaliNum}</span>
          </div>
          <span
            className={`${selectedDay.isHoliday || selectedDay.isWeekend ? "plasmo-text-red-400" : "plasmo-text-gray-400"}`}>
            {dayName}
          </span>
        </div>

        {/* Date Information */}
        <div className="plasmo-flex plasmo-flex-col">
          <div className="plasmo-text-xl">
            {`${monthName} ${selectedDay.date}, ${today.getFullYear()}`}
          </div>
          <div className="plasmo-text-base plasmo-mt-2">
            {selectedDay.holidayTitle || "Regular Day"}
          </div>
          <div className="plasmo-text-sm plasmo-text-gray-400 plasmo-mt-1">
            {selectedDay.tithi || ""}
          </div>
        </div>

        {/* Relative Day Label */}
        <div className="plasmo-ml-auto">
          <span className="plasmo-text-gray-400 plasmo-text-[1rem]">
            {getRelativeDayText(diffDays)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default DateWithEvents
