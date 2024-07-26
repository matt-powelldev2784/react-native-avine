export interface JobStatsT {
  totalHours: number
  totalTime: number
  totalPrice: number
  jobCount: number
  roundCount: number
}

interface JobStat {
  [key: string]: number | string
}

export type JobStatsArray = JobStat[]
