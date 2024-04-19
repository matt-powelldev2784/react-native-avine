import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../../../screens/stackNavigator/StackNavigator'
import useGetApiData from '../../../utils/hooks/useGetApiData'
import { getRelatedInvoiceData } from '../../../db/invoice/getRelatedInvoiceData'

type DueInvoiceCardRouteProp = RouteProp<RootStackParamList, 'DueInvoices'>

interface UseGetJobCardDataT {
  route: DueInvoiceCardRouteProp
  invoiceId: string
}

export const useGetInvoiceData = ({ invoiceId, route }: UseGetJobCardDataT) => {
  const { getApiIsLoading, data } = useGetApiData({
    route,
    apiFunction: async () => getRelatedInvoiceData(invoiceId),
  })

  const invoiceData = data?.invoiceData || null
  const user = data?.user || null
  const client = data?.client || null
  const isComplete = true
  const isPaid = invoiceData?.isPaid

  return { getApiIsLoading, invoiceData, user, client, isComplete, isPaid }
}
