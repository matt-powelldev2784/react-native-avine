import { toggleInvoiceIsPaid } from './../../../../db/jobs/toggleInvoiceIsPaid'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import usePostApiData from '../../../../utils/hooks/usePostApiData'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface useFormikStepsInterface {
  isPaid: boolean | null | undefined
  isComplete: boolean | null | undefined
  invoiceId: string
  plannerDate: string | null
}

interface useFormikIsPaidReturn {
  isPaid: boolean | null | undefined
  message: string
}

const useFormikIsPaid = ({
  isPaid,
  isComplete,
  invoiceId,
  plannerDate,
}: useFormikStepsInterface) => {
  const isPaidError = isComplete
    ? false
    : 'You cannot toggle a invoice as paid until the job is set to complete.'

  const { setApiFunction, postApiIsLoading, data } = usePostApiData({
    onSuccessScreen: 'InvoiceListView',
    refreshScreen: { refresh: true },
  })

  const toggleInvoiceIsPaidData = data as useFormikIsPaidReturn
  const isPaidUpdated = toggleInvoiceIsPaidData?.isPaid

  if (isPaidUpdated === true || isPaidUpdated === false) {
    const addIsPaidHasUpdatedToStorage = async () => {
      await AsyncStorage.setItem(
        'isPaidHasUpdated',
        JSON.stringify(isPaidUpdated),
      )
    }
    addIsPaidHasUpdatedToStorage()
  }

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

      if (!plannerDate) {
        return
      }

      const plannerDocRef = invoiceId.split('@').slice(0, -1).join('@')

      setApiFunction(
        () => async () =>
          toggleInvoiceIsPaid({
            plannerDocRef,
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
