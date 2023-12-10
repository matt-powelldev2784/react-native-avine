import { JobWithIdT } from './JobT'

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
}

export interface RoundWithJobIdsT {
  id: string
  roundName: string
  location: string
  frequency: string
  jobs: string[] | undefined | null
}

export interface AddRoundWithJobIdT {
  roundName: string
  location: string
  frequency: string
  jobs: string[] | undefined | null
}

export interface RoundWithJobT {
  id: string
  roundName: string
  location: string
  frequency: string
  jobs: JobWithIdT[] | undefined | null
}

export interface RoundWithJobT {
  id: string
  roundName: string
  location: string
  frequency: string
  jobs: JobWithIdT[] | undefined | null
}
