import { getRelatedInvoiceData } from '../../../../db/invoice/getRelatedInvoiceData'
import { useEffect, useState } from 'react'
import { InvoiceWithIdT } from '../../../../types/InvoiceT'
import { useInvoiceContext } from '../../../../screens/invoices/invoiceContext/useInvoiceContext'
import { ClientWithIdT } from '../../../../types/ClientT'
import { UserT } from '../../../../types/UserT'

interface UseGetJobCardDataT {
  invoiceId: string
  setIsPaid: (value: boolean) => void
}

interface InvoiceDataT {
  invoiceData: InvoiceWithIdT | null
  user: UserT
  client: ClientWithIdT
}

export const useGetInvoiceData = ({
  invoiceId,
  setIsPaid,
}: UseGetJobCardDataT) => {
  const [data, setData] = useState<InvoiceDataT | null>(null)
  const [getApiIsLoading, setGetApiIsLoading] = useState<boolean>(false)
  const { setInvoiceCardNeedsUpdate, invoiceCardNeedsUpdate } =
    useInvoiceContext()

  useEffect(() => {
    const getData = async () => {
      setGetApiIsLoading(true)
      const data = await getRelatedInvoiceData(invoiceId)
      setData(data)
      setIsPaid(data?.invoiceData?.isPaid)
      setGetApiIsLoading(false)
    }

    getData()

    setInvoiceCardNeedsUpdate(false)
  }, [invoiceCardNeedsUpdate])

  const invoiceData = data?.invoiceData || null
  const user = data?.user || null
  const client = data?.client || null
  const isComplete = true

  return { getApiIsLoading, invoiceData, user, client, isComplete }
}
