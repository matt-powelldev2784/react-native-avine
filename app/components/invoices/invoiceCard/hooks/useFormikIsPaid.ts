import { toggleInvoiceIsPaid } from './../../../../db/jobs/toggleInvoiceIsPaid'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'
import { useInvoiceContext } from '../../../../screens/invoices/invoiceContext/useInvoiceContext'

interface useFormikStepsInterface {
  isPaid: boolean | null | undefined
  invoiceId: string
  plannerDate: string | null
}

const useFormikIsPaid = ({
  isPaid,
  invoiceId,
  plannerDate,
}: useFormikStepsInterface) => {
  const [isPaidApiIsLoading, setIsPaidPostApiIsLoading] = useState(false)
  const { setInvoiceCardNeedsUpdate } = useInvoiceContext()

  const validationSchema = Yup.object().shape({
    isPaid: Yup.boolean(),
  })

  const formik = useFormik({
    initialValues: {
      isPaid: isPaid,
    },
    onSubmit: async () => {
      try {
        setIsPaidPostApiIsLoading(true)
        if (typeof isPaid !== 'boolean') {
          return
        }

        if (!plannerDate) {
          return
        }

        const plannerDocRef = invoiceId.split('@').slice(0, -1).join('@')

        await toggleInvoiceIsPaid({
          plannerDocRef,
          plannerDate,
          isPaid: !isPaid,
        })
        setInvoiceCardNeedsUpdate(true)
        setIsPaidPostApiIsLoading(false)
      } catch (error) {
        console.log('error', error)
        setIsPaidPostApiIsLoading(false)
      }
    },
    validationSchema,
    enableReinitialize: true,
  })

  const formikIsPaid = formik

  return { isPaidApiIsLoading, formikIsPaid }
}

export default useFormikIsPaid
