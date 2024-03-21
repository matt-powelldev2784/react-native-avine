import { useFormik } from 'formik'
import * as Yup from 'yup'
import { updateJob } from '../../../../db/jobs/updateJob'
import { getJob } from '../../../../db/jobs/getJob'
import useGetApiData from '../../../../utils/hooks/useGetApiData'
import usePostApiData from '../../../../utils/hooks/usePostApiData'
import { getInvoice } from '../../../../db/invoice/getInvoice'

export const validationSchema = Yup.object().shape({
  price: Yup.number().required('Price is required'),
  description: Yup.string().required('Description is required'),
  clientId: Yup.string().required('Client is required'),
})

interface useFormikStepsInterface {
  invoiceId: string
}

const useFormikInvoice = ({ invoiceId }: useFormikStepsInterface) => {
  const { getApiIsLoading, data } = useGetApiData({
    apiFunction: async () => getInvoice(invoiceId),
  })

  const { postApiIsLoading, setApiFunction } = usePostApiData({
    onSuccessScreen: 'InvoiceCardView',
    refreshScreen: { invoiceId },
  })

  const formik = useFormik({
    initialValues: {
      price: 0,
      description: '',
      client: '',
      ...data,
      clientId: data?.job?.clientId,
    },
    onSubmit: async (values) => {
      setApiFunction(() => async () => updateJob(values))
    },
    validationSchema,
    enableReinitialize: true,
  })

  return { getApiIsLoading, postApiIsLoading, formik }
}

export default useFormikInvoice
