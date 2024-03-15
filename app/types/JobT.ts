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
  clientId: string
  isDeleted: boolean
}

export interface JobWithIdT extends JobT {
  id: string
  jobIsComplete?: boolean
  invoiceIsPaid?: boolean
}

export interface SelectedJobT {
  jobId: string
  recurringRound: boolean
  roundId: string
}

