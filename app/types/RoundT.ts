import { JobWithIdT } from './JobT'

export interface RoundT {
  roundName: string
  location: string
  frequency: string
  relatedJobs: string[]
}

export interface RoundWithIdT extends RoundT {
  id: string
  isDeleted: boolean
}

export interface RoundWithJobT {
  id: string
  roundName: string
  location: string
  frequency: string
  relatedJobs: JobWithIdT[]
}

export interface RoundWithRelatedJobIdsT {
  id: string
  roundName: string
  location: string
  frequency: string
  relatedJobs: string[]
  isDeleted: boolean
}

export interface RoundWithRelatedJobsT {
  id: string
  roundName: string
  location: string
  frequency: string
  relatedJobs: JobWithIdT[]
  isDeleted: boolean
}
