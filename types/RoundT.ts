export interface RoundWithSummaryT {
  id: string
  name: string
  location: string
  numOfJobs: string
  roundTime: string
  frequency: string
  jobs: string[]
}

export interface RoundDbT {
  id?: string
  roundName: string
  location: string
  frequency: string
  jobs: string[]
}
