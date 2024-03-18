import { JobWithIdT } from './JobT'

export interface InvoiceWithIdT {
  id: string
  relatedRound: string
  relatedJob: string
  roundType: string
  completedDate: string
  job: JobWithIdT
  price: string
  isPaid: boolean
}
