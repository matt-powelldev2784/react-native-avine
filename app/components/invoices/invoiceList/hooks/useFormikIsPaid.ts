import { useFormik } from 'formik'
import * as Yup from 'yup'
import usePostApiData from '../../../../utils/hooks/usePostApiData'
import { toggleInvoiceIsPaid } from '../../../../db/jobs/toggleInvoiceIsPaid'

interface useFormikStepsInterface {
  isPaid: boolean | null | undefined
  isComplete: boolean | null | undefined
  plannerId: string
  plannerDate: string
}

const useFormikIsPaid = ({
  isPaid,
  isComplete,
  plannerId,
  plannerDate,
}: useFormikStepsInterface) => {
  const isPaidError = isComplete
    ? false
    : 'You cannot toggle a invoice as paid until the job is set to complete.'

  const { setApiFunction, postApiIsLoading } = usePostApiData({
    onSuccessScreen: 'Invoices',
  })

  const validationSchema = Yup.object().shape({
    isPaid: Yup.boolean(),
  })

  const formik = useFormik({
    initialValues: {
      isPaid: isPaid,
    },
    onSubmit: async () => {
      if (typeof isPaid !== 'boolean') {
        return
      }

      setApiFunction(
        () => async () =>
          toggleInvoiceIsPaid({
            jobId: plannerId,
            plannerDate,
            isPaid: !isPaid,
          }),
      )
    },
    validationSchema,
    enableReinitialize: true,
  })

  const formikIsPaid = formik
  const isPaidApiIsLoading = postApiIsLoading

  return { isPaidApiIsLoading, formikIsPaid, isPaidError }
}

export default useFormikIsPaid
