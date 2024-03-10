import { useFormik } from 'formik'
import * as Yup from 'yup'
import { addJob } from '../../../../db/jobs/addJob'
import usePostApiData from '../../../../utils/hooks/usePostApiData'

export const stepOneSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  address: Yup.string().required('Address is required'),
  town: Yup.string().required('Town is required'),
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
      address: '',
      town: '',
      postcode: '',
      contactTel: 0,
      notes: '',
      isDeleted: false,
    },
    onSubmit: async (values) => {
      // setApiFunction(() => async () => addJob(values))
      console.log('values', values)
    },
    validationSchema,
  })

  return { postApiIsLoading, formik }
}

export default useFormikSteps
