import { auth } from '../../../firebaseConfig'
import { authError } from '../authError'
import { getInvoice } from './getInvoice'
import { getUser } from '../user/getUser'
import { getClient } from '../clients/getClient'

export const getRelatedInvoiceData = async (
  invoiceId: string,
): Promise<any> => {
  if (auth.currentUser === null) {
    return authError({ filename: 'getRelatedInvoiceData' })
  }

  try {
    const invoiceData = await getInvoice(invoiceId)
    const user = await getUser()
    const client = await getClient(invoiceData.job.clientId)

    return { invoiceData, user, client }
  } catch (error) {
    throw new Error(
      `Error getting invoice at getRelatedInvoiceData route: ${error}`,
    )
  }
}
