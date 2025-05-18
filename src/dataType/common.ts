enum Interval {
  Day,
  Month,
  Quarter,
  Year
}

enum FlowType {
  Income,
  Expenses
}

interface Frequency {
  per: number,
  unit: Interval,
}

export type { Frequency }
export { Interval, FlowType }
