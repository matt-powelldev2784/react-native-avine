import { useFormik } from 'formik'
import * as Yup from 'yup'
import { addJobToDb } from '../../../../db/jobs/addJobtoDb'

export const stepOneSchema = Yup.object().shape({
  jobName: Yup.string().required('Name is required'),
  address: Yup.string().required('Address is required'),
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

const useFormikSteps = (activeStep: number) => {
  let validationSchema

  if (activeStep === 0) {
    validationSchema = stepOneSchema
  } else if (activeStep === 1) {
    validationSchema = stepTwoSchema
  } else if (activeStep === 2) {
    validationSchema = stepThreeSchema
  }

  const formik = useFormik({
    initialValues: {
      jobName: '',
      address: '',
      postcode: '',
      jobType: '',
      time: '',
      price: '',
      frequency: '',
      contactName: '',
      contactTel: '',
      notes: '',
    },
    onSubmit: (values) => {
      console.log(values)
      addJobToDb(values)
    },
    validationSchema,
  })

  return formik
}

export default useFormikSteps
