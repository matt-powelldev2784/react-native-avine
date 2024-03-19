import { RouteProp } from '@react-navigation/native'
import { getInvoice } from '../../../../db/invoice/getInvoice'
import { RootStackParamList } from '../../../../screens/stackNavigator/StackNavigator'
import { InvoiceWithIdT } from '../../../../types/InvoiceT'
import useGetApiData from '../../../../utils/hooks/useGetApiData'

type DueInvoiceCardRouteProp = RouteProp<RootStackParamList, 'DueInvoices'>

interface UseGetJobCardDataT {
  route: DueInvoiceCardRouteProp
  invoiceId: string
}

export const useGetInvoiceData = ({ invoiceId, route }: UseGetJobCardDataT) => {
  const { getApiIsLoading, data } = useGetApiData({
    route,
    apiFunction: async () => getInvoice(invoiceId),
  })

  const invoiceData = data as InvoiceWithIdT
  const isComplete = true
  const isPaid = invoiceData?.isPaid

  return { getApiIsLoading, invoiceData, isComplete, isPaid }
}
