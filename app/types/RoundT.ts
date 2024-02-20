import { JobWithIdT } from './JobT'

export interface RoundT {
  roundName: string
  location: string
  frequency: string
  relatedJobs: string[] | []
}

export interface RoundWithIdT extends RoundT {
  id: string
}

export interface RoundWithJobT {
  id: string
  roundName: string
  location: string
  frequency: string
  jobs: JobWithIdT[] | undefined | null
}

export interface RoundNoJobsT {
  id: string
  roundName: string
  location: string
  frequency: string
}

export interface RoundWithRelatedJobsT {
  id: string
  roundName: string
  location: string
  frequency: string
  scheduledDates: string[]
  recurringRound: boolean
  relatedJobs: JobWithIdT[] | undefined | null | []
}
