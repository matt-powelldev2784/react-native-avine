export interface RoundWithSummary {
  id: string
  name: string
  place: string
  numOfJobs: string
  roundTime: string
  frequency: string
  jobs: string[]
}

export interface RoundDbT {
  id?: string
  name: string
  place: string
  frequency: string
  jobs: string[]
}
