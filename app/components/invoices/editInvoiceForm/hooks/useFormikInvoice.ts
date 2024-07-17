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
  taxRate: Yup.number()
    .required('Tax Rate is required')
    .typeError('Tax Rate must be a number'),
})

interface useFormikStepsInterface {
  invoiceId: string
}

const useFormikInvoice = ({ invoiceId }: useFormikStepsInterface) => {
  const { getApiIsLoading, data } = useGetApiData({
    apiFunction: async () => getInvoice(invoiceId),
  })

  const { postApiIsLoading, setApiFunction } = usePostApiData({
    onSuccessScreen: 'InvoiceListView',
    refreshScreen: { invoiceId },
  })

  const formik = useFormik({
    initialValues: {
      id: data?.id || '',
      price: (data?.price.toString() as string) || '',
      taxRate: data?.taxRate || '',
      description: data?.description || '',
      totalPrice: data?.totalPrice || '',
      clientId: data?.job?.clientId,
    },
    onSubmit: async (values) => {
      if (!values.clientId) return

      const updatedValues = {
        id: values.id,
        price: Number(values.price),
        description: values.description,
        taxRate: Number(values.taxRate),
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
