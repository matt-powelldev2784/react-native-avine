import { useFormik } from 'formik'
import * as Yup from 'yup'
import useGetApiData from '../../../../utils/hooks/useGetApiData'
import usePostApiData from '../../../../utils/hooks/usePostApiData'
import { getClient } from '../../../../db/clients/getClient'
import { updateClient } from '../../../../db/clients/updateClient'

export const stepOneSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  address: Yup.string().required('Address is required'),
  town: Yup.string().required('Town is required'),
  county: Yup.string().required('County is required'),
  postcode: Yup.string().required('Post Code is required'),
  contactTel: Yup.number()
    .typeError('Telephone number must be a number')
    .required('Telephone number is required')
    .positive(),
  notes: Yup.string(),
})

interface useFormikStepsInterface {
  activeStep: number
  clientId: string
}

const useFormikSteps = ({ activeStep, clientId }: useFormikStepsInterface) => {
  const { getApiIsLoading, data } = useGetApiData({
    apiFunction: async () => getClient(clientId),
  })

  const { postApiIsLoading, setApiFunction } = usePostApiData({
    onSuccessScreen: 'Clients',
    refreshScreen: true,
  })

  const validationSchemas: { [key: number]: Yup.ObjectSchema<any, any> } = {
    0: stepOneSchema,
  }

  const validationSchema = validationSchemas[activeStep]

  const formik = useFormik({
    initialValues: {
      id: '',
      name: '',
      companyName: '',
      address: '',
      town: '',
      county: '',
      postcode: '',
      contactTel: '' as number | string,
      notes: '',
      isDeleted: false,
      ...data,
    },
    onSubmit: async (values) => {
      setApiFunction(() => async () => updateClient(values))
    },
    validationSchema,
    enableReinitialize: true,
  })

  return { getApiIsLoading, postApiIsLoading, formik }
}

export default useFormikSteps
