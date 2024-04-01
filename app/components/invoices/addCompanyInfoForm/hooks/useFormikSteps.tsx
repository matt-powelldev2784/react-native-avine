import { useFormik } from 'formik'
import * as Yup from 'yup'
import usePostApiData from '../../../../utils/hooks/usePostApiData'

export const stepOneSchema = Yup.object().shape({
  companyName: Yup.string().required('Compnay name is required'),
  address: Yup.string().required('Address is required'),
  town: Yup.string().required('Town is required'),
  county: Yup.string().required('County is required'),
  postcode: Yup.string().required('Post Code is required'),
  contactTel: Yup.number()
    .typeError('Telephone number must be a number')
    .required('Telephone number is required')
    .positive(),
})

interface useFormikStepsProps {
  activeStep: number
}

const useFormikSteps = ({ activeStep }: useFormikStepsProps) => {
  const validationSchemas: { [key: number]: Yup.ObjectSchema<any, any> } = {
    0: stepOneSchema,
  }

  const validationSchema = validationSchemas[activeStep]

  const { postApiIsLoading, setApiFunction } = usePostApiData({
    onSuccessScreen: 'Clients',
    refreshScreen: { refresh: true },
  })

  const formik = useFormik({
    initialValues: {
      companyName: '',
      address: '',
      town: '',
      county: '',
      postcode: '',
      contactTel: 0,
    },
    onSubmit: async (values) => {
      // setApiFunction(() => async () => addClient(values))
    },
    validationSchema,
  })

  return { postApiIsLoading, formik }
}

export default useFormikSteps
