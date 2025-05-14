enum Interval {
  Day,
  Month,
  Quarter,
  Year
}

interface Frequency {
  per: number,
  unit: Interval,
}

export type { Frequency }
export default Interval
