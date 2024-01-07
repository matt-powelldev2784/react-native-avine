import { useFormik } from 'formik'
import * as Yup from 'yup'
import { scheduleRoundToDb } from '../../../../db/planner/schdeuleRoundToDb'

export const stepOneSchema = Yup.object().shape({
  roundId: Yup.string().required('Round Name is required'),
})

export const stepTwoSchema = Yup.object().shape({
  date: Yup.string().required('Date is required').length(10),
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
      roundId: '',
      date: '',
    },
    onSubmit: (values) => {
      console.log(values)
      scheduleRoundToDb(values)
    },
    validationSchema,
  })

  console.log('formik.values', formik.values)

  return formik
}

export default useFormikSteps
