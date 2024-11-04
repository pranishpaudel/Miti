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

// Convert Nepali year, month, day to absolute days
const getNepaliDays = (year: number, month: number, day: number): number => {
  // Days in each month of Nepali calendar
  const daysInMonth = {
    1: 31,
    2: 31,
    3: 32,
    4: 32,
    5: 31,
    6: 30,
    7: 30,
    8: 29,
    9: 30,
    10: 29,
    11: 30,
    12: 30
  }

  // Calculate total days
  let days = day

  // Add days for months in the current year
  for (let m = 1; m < month; m++) {
    days += daysInMonth[m as keyof typeof daysInMonth]
  }

  // Add days for years
  days += year * 365

  return days
}

export const calculateDaysDifference = (
  todayNepaliDate: string | null,
  selectedNepaliDate: string | null,
  selectedYear: string,
  selectedMonth: string
): number => {
  if (!todayNepaliDate || !selectedNepaliDate) return 0

  const todayDay = convertNepaliToEnglish(todayNepaliDate)
  const selectedDay = convertNepaliToEnglish(selectedNepaliDate)

  // Get current date from the browser
  const now = new Date()
  // Convert current date to Nepali year (this is an approximation,
  // you might want to use a proper Gregorian to Nepali date converter)
  const currentNepaliYear = 2081 // This should be dynamically calculated
  const currentNepaliMonth = 7 // This should be dynamically calculated

  // Calculate days for both dates
  const todayTotalDays = getNepaliDays(
    currentNepaliYear,
    currentNepaliMonth,
    todayDay
  )

  const selectedTotalDays = getNepaliDays(
    parseInt(selectedYear),
    parseInt(selectedMonth),
    selectedDay
  )

  return selectedTotalDays - todayTotalDays
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
