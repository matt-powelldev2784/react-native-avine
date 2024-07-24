export interface PlannerDocT {
  id: string
  _date: string
  _day: string
  _month: string
  _year: string
  _dateTimestamp: {
    seconds: number
    nanoseconds: number
  }
  oneOffRounds: string[]
  recurringRounds: string[]
  relatedJobs: string[]
  completedJobs: string[]
}
