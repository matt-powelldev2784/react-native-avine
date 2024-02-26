import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { updateJob } from '../../../../db/jobs/updateJob'
import { getJob } from '../../../../db/jobs/getJob'
import useData from '../../../../utils/hooks/useData'

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
    .positive(),
  frequency: Yup.string().required('Frequency is required'),
  notes: Yup.string(),
})

interface useFormikStepsInterface {
  activeStep: number
  jobId: string
}

const useFormikSteps = ({ activeStep, jobId }: useFormikStepsInterface) => {
  const [firstLoad, setFirstLoad] = useState(true)

  const {
    isLoading: getDataIsLoading,
    data,
    setApiFunction: setGetApiFunction,
  } = useData({})

  if (firstLoad) {
    setGetApiFunction(() => async () => getJob(jobId))
    setFirstLoad(false)
  }

  const {
    isLoading: submitDataIsLoading,
    setApiFunction: setUpdateApiFunction,
  } = useData({
    onSuccessScreen: 'Jobs',
    refreshScreen: true,
  })

  const validationSchemas: { [key: number]: Yup.ObjectSchema<any, any> } = {
    0: stepOneSchema,
    1: stepTwoSchema,
    2: stepThreeSchema,
  }

  const validationSchema = validationSchemas[activeStep]

  const formik = useFormik({
    initialValues: {
      id: '',
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
      ...data,
    },
    onSubmit: async (values) => {
      setUpdateApiFunction(() => async () => updateJob(values))
    },
    validationSchema,
    enableReinitialize: true,
  })

  return { getDataIsLoading, submitDataIsLoading, formik }
}

export default useFormikSteps
