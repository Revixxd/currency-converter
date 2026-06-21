const months = {
  0: { name: 'January', shortName: 'Jan' },
  1: { name: 'February', shortName: 'Feb' },
  2: { name: 'March', shortName: 'Mar' },
  3: { name: 'April', shortName: 'Apr' },
  4: { name: 'May', shortName: 'May' },
  5: { name: 'June', shortName: 'Jun' },
  6: { name: 'July', shortName: 'Jul' },
  7: { name: 'August', shortName: 'Aug' },
  8: { name: 'September', shortName: 'Sep' },
  9: { name: 'October', shortName: 'Oct' },
  10: { name: 'November', shortName: 'Nov' },
  11: { name: 'December', shortName: 'Dec' },
}
export default function getMonthBasedOnNumber(monthAsNumber: number): {
  name: string
  shortName: string
} {
  return months[monthAsNumber]
}
