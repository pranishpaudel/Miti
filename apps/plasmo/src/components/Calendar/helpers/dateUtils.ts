import type { ProcessedDay } from "../types/types"

// Mapping of Nepali months to approximate Gregorian (English) dates
const nepaliToEnglishMonthMap: {
  [key: string]: { month: number; startDay: number; year: number }
} = {
  "01": { month: 3, startDay: 14, year: 0 }, // Baisakh starts ~ April 14
  "02": { month: 4, startDay: 14, year: 0 }, // Jestha starts ~ May 14
  "03": { month: 5, startDay: 15, year: 0 }, // Ashadh starts ~ June 15
  "04": { month: 6, startDay: 16, year: 0 }, // Shrawan starts ~ July 16
  "05": { month: 7, startDay: 17, year: 0 }, // Bhadra starts ~ August 17
  "06": { month: 8, startDay: 17, year: 0 }, // Ashwin starts ~ September 17
  "07": { month: 9, startDay: 17, year: 0 }, // Kartik starts ~ October 17
  "08": { month: 10, startDay: 16, year: 0 }, // Mangsir starts ~ November 16
  "09": { month: 11, startDay: 16, year: 0 }, // Poush starts ~ December 16
  "10": { month: 0, startDay: 14, year: 1 }, // Magh starts ~ January 14
  "11": { month: 1, startDay: 13, year: 1 }, // Falgun starts ~ February 13
  "12": { month: 2, startDay: 14, year: 1 } // Chaitra starts ~ March 14
}

// Convert Nepali year to English year
const getEnglishYear = (nepaliYear: number, nepaliMonth: string): number => {
  // Base conversion (approximate)
  const baseEnglishYear = nepaliYear - 57

  // Adjust for months that span into the next year
  const monthData = nepaliToEnglishMonthMap[nepaliMonth]
  return baseEnglishYear + (monthData?.year || 0)
}

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

export const getNepaliDays = (
  year: number,
  month: number,
  day: number
): number => {
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

  let days = day

  for (let m = 1; m < month; m++) {
    days += daysInMonth[m as keyof typeof daysInMonth]
  }

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
  // Use current Nepali date
  const currentNepaliYear = 2081 // This should be dynamically calculated
  const currentNepaliMonth = 7 // This should be dynamically calculated

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
  selectedDay: ProcessedDay,
  selectedMonth: string,
  selectedYear: string
): {
  dayName: string
  monthName: string
  year: number
} => {
  // Get the mapping for the selected Nepali month
  const monthMapping = nepaliToEnglishMonthMap[selectedMonth]
  if (!monthMapping) {
    return {
      dayName: "",
      monthName: "",
      year: parseInt(selectedYear)
    }
  }

  // Convert Nepali date to English date
  const nepaliDay = convertNepaliToEnglish(selectedDay.NepaliNum || "1")
  const englishYear = getEnglishYear(parseInt(selectedYear), selectedMonth)

  // Calculate the English date
  const dateObj = new Date(
    englishYear,
    monthMapping.month,
    monthMapping.startDay + nepaliDay - 1
  )

  return {
    dayName: dateObj.toLocaleString("en-US", { weekday: "long" }),
    monthName: dateObj.toLocaleString("en-US", { month: "long" }),
    year: dateObj.getFullYear()
  }
}
