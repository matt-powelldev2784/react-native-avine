import { useEffect, useState, Dispatch, SetStateAction } from 'react'
import { DocumentSnapshot, DocumentData } from 'firebase/firestore'
import { InvoiceWithIdT } from '../../../../types/InvoiceT'

interface InvoiceDataT {
  lastVisibleDocument: DocumentSnapshot | null
  invoiceData: InvoiceWithIdT[]
  setInvoiceData: Dispatch<SetStateAction<InvoiceWithIdT[]>>
  setLastVisibleDocument: Dispatch<
    SetStateAction<DocumentSnapshot<DocumentData, DocumentData> | null>
  >
  docCount: number | null
  setDocCount: Dispatch<SetStateAction<number | null>>
}

export const useInvoiceData = (data: any): InvoiceDataT => {
  const [lastVisibleDocument, setLastVisibleDocument] =
    useState<DocumentSnapshot | null>(null)
  const [invoiceData, setInvoiceData] = useState<InvoiceWithIdT[]>([])
  const [docCount, setDocCount] = useState<number | null>(null)

  useEffect(() => {
    if (data?.lastVisible) {
      const lastRecord = data.lastVisible as DocumentSnapshot
      setLastVisibleDocument(lastRecord)
    }
    if (data?.invoices) {
      const invoices = data.invoices as InvoiceWithIdT[]
      setInvoiceData((prev) => [...prev, ...invoices])
    }
    if (data?.count >= 0) {
      setDocCount(data.count)
    }
  }, [data])

  return {
    invoiceData,
    lastVisibleDocument,
    setInvoiceData,
    setLastVisibleDocument,
    docCount,
    setDocCount,
  }
}
