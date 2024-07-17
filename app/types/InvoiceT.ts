import { JobWithIdT } from './JobT'

export interface InvoiceWithIdT {
  id: string
  invoiceId: string
  relatedRound: string
  relatedJob: string
  roundType: string
  completedDate: string
  job: JobWithIdT
  description: string
  taxRate: string
  price: string
  totalPrice: string
  isPaid: boolean
}
