import type { ProcessedDay } from "../types/types"

export const convertNepaliToEnglish = (nepaliNum: string): number => {
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

export const calculateDaysDifference = (
  todayNepaliDate: string | null,
  selectedNepaliDate: string | null
): number => {
  if (!todayNepaliDate || !selectedNepaliDate) return 0

  const todayNum = convertNepaliToEnglish(todayNepaliDate)
  const selectedNum = convertNepaliToEnglish(selectedNepaliDate)
  return selectedNum - todayNum
}

export const getRelativeDayText = (dayDiff: number): string => {
  if (dayDiff === 0) return "today"
  if (dayDiff === 1) return "tomorrow"
  if (dayDiff === -1) return "yesterday"
  if (dayDiff > 1) return `${dayDiff} days after`
  return `${Math.abs(dayDiff)} days before`
}

export const getFormattedDate = (
  selectedDay: ProcessedDay
): {
  dayName: string
  monthName: string
  year: number
} => {
  const today = new Date()
  const dateObj = new Date(
    today.getFullYear(),
    today.getMonth(),
    parseInt(selectedDay.date || "1")
  )

  return {
    dayName: dateObj.toLocaleString("en-US", { weekday: "long" }),
    monthName: dateObj.toLocaleString("en-US", { month: "long" }),
    year: today.getFullYear()
  }
}
