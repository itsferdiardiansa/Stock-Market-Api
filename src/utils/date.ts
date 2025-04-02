export const getFormattedLocalDate = (date: Date) => {
  return date.toLocaleDateString('en-CA') // Format "YYYY-MM-DD"
}

export const getRelativeLocalDate = (daysAhead: number) => {
  const date = new Date()
  date.setDate(date.getDate() + daysAhead)
  return getFormattedLocalDate(date)
}

export const getFirstDayOfMonth = () => {
  const now = new Date()
  return getRelativeLocalDate(-(now.getDate() - 1))
}