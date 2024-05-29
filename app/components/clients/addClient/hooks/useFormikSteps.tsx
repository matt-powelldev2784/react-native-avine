import { useFormik } from 'formik'
import * as Yup from 'yup'
import usePostApiData from '../../../../utils/hooks/usePostApiData'
import { addClient } from '../../../../db/clients/addCleint'

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
      name: '',
      companyName: '',
      address: '',
      town: '',
      county: '',
      postcode: '',
      contactTel: '' as number | string,
      notes: '',
      isDeleted: false,
    },
    onSubmit: async (values) => {
      setApiFunction(() => async () => addClient(values))
    },
    validationSchema,
  })

  return { postApiIsLoading, formik }
}

export default useFormikSteps
