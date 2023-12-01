export interface JobT {
  id: string
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
