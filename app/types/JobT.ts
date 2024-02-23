export interface JobT {
  jobName: string
  address: string
  town: string
  postcode: string
  jobType: string
  time: string
  price: number
  frequency: string
  contactName: string
  contactTel: number
  notes: string | null
  isDeleted: boolean
}

export interface JobWithIdT extends JobT {
  id: string
  jobIsComplete: boolean
}
