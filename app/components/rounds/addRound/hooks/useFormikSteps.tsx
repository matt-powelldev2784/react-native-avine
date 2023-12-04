import { useFormik } from 'formik'
import * as Yup from 'yup'
import { addRoundToDb } from '../../../../db/rounds/addRoundToDb'

export const stepOneSchema = Yup.object().shape({
  roundName: Yup.string().required('Round Name is required'),
  location: Yup.string().required('Location is required'),
  frequency: Yup.string().required('Post Code is required'),
})

export const stepTwoSchema = Yup.object().shape({
  jobs: Yup.array().of(Yup.string().required('Job ID is required')),
})

const useFormikSteps = (activeStep: number) => {
  let validationSchema

  if (activeStep === 0) {
    validationSchema = stepOneSchema
  } else if (activeStep === 1) {
    validationSchema = stepTwoSchema
  }

  const formik = useFormik({
    initialValues: {
      roundName: '',
      location: '',
      frequency: '',
      jobs: [],
    },
    onSubmit: (values) => {
      console.log(values)
      // addRoundToDb(values)
    },
    validationSchema,
  })

  return formik
}

export default useFormikSteps
