import { JobWithIdT } from './JobT'

export interface InvoiceWithIdT {
  id: string
  invoiceId: string
  relatedRound: string
  relatedJob: string
  roundType: string
  completedDate: string
  job: JobWithIdT
  price: string
  description: string
  isPaid: boolean
}
