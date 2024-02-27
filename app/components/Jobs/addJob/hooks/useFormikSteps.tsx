import { useFormik } from 'formik'
import * as Yup from 'yup'
import { addJob } from '../../../../db/jobs/addJob'
import usePostApiData from '../../../../utils/hooks/usePostApiData'

export const stepOneSchema = Yup.object().shape({
  jobName: Yup.string().required('Name is required'),
  address: Yup.string().required('Address is required'),
  town: Yup.string().required('Town is required'),
  postcode: Yup.string().required('Post Code is required'),
})

export const stepTwoSchema = Yup.object().shape({
  contactName: Yup.string().required('Name is required'),
  contactTel: Yup.number()
    .typeError('Telephone number must be a number')
    .required('Telephone number is required')
    .positive(),
})

export const stepThreeSchema = Yup.object().shape({
  jobType: Yup.string().required('Job Type is required'),
  time: Yup.number()
    .typeError('Time must be a number')
    .required('Time is required')
    .positive(),
  price: Yup.number()
    .typeError('Price must be a number')
    .required('Price is required')
    .positive('Price must be a positive number'),
  frequency: Yup.string().required('Frequency is required'),
  notes: Yup.string(),
})
interface useFormikStepsProps {
  activeStep: number
}

const useFormikSteps = ({ activeStep }: useFormikStepsProps) => {
  const validationSchemas: { [key: number]: Yup.ObjectSchema<any, any> } = {
    0: stepOneSchema,
    1: stepTwoSchema,
    2: stepThreeSchema,
  }

  const validationSchema = validationSchemas[activeStep]

  const { postApiIsLoading, setApiFunction } = usePostApiData({
    onSuccessScreen: 'Jobs',
    refreshScreen: true,
  })

  const formik = useFormik({
    initialValues: {
      jobName: '',
      address: '',
      town: '',
      postcode: '',
      jobType: '',
      time: '',
      price: 0,
      frequency: '',
      contactName: '',
      contactTel: 0,
      notes: '',
      isDeleted: false,
    },
    onSubmit: async (values) => {
      setApiFunction(() => async () => addJob(values))
    },
    validationSchema,
  })

  return { postApiIsLoading, formik }
}

export default useFormikSteps
