import { useFormik } from 'formik'
import * as Yup from 'yup'
import useGetApiData from '../../../../utils/hooks/useGetApiData'
import usePostApiData from '../../../../utils/hooks/usePostApiData'
import { getInvoice } from '../../../../db/invoice/getInvoice'
import { updateInvoice } from '../../../../db/invoice/updateInvoice'

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
    onSuccessScreen: 'EditInvoice',
    refreshScreen: { invoiceId },
  })

  const formik = useFormik({
    initialValues: {
      id: '',
      price: '' as number | string,
      description: '',
      clientId: data?.job?.clientId,
      ...data,
    },
    onSubmit: async (values) => {
      if (!values.clientId) return

      const updatedValues = {
        id: values.id,
        price: Number(values.price),
        description: values.description,
        clientId: values.clientId,
      }

      setApiFunction(() => async () => updateInvoice(updatedValues))
    },
    validationSchema,
    enableReinitialize: true,
  })

  return { getApiIsLoading, postApiIsLoading, formik }
}

export default useFormikInvoice
