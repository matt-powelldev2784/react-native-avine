export interface JobT {
  jobName: string
  address: string
  postcode: string
  jobType: string
  time: string
  price: number
  frequency: string
  contactName: string
  contactTel: number
  notes: string | null
}

export interface JobWithIdT extends JobT {
  id: string
}
