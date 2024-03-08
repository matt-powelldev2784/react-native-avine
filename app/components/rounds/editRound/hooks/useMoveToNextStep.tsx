import { FormikProps } from 'formik'

interface UseMoveToNextStepProps {
  formik: FormikProps<any>
  activeStep: number
  setActiveStep: React.Dispatch<React.SetStateAction<number>>
}

export const useMoveToNextStep = ({
  formik,
  activeStep,
  setActiveStep,
}: UseMoveToNextStepProps) => {
  const setFieldsAsTouched = () => {
    Object.keys(formik.values).forEach((key) => {
      formik.setFieldTouched(key)
    })
  }

  const moveToNextStep = async () => {
    setFieldsAsTouched()
    await formik.validateForm()

    const formIsValid = Object.keys(formik.errors).length === 0

    const relatedJobs = formik.values.relatedJobs
    if (activeStep > 0 && relatedJobs.length === 0) {
      formik.setFieldError('relatedJobs', 'You must select at least one job')
      return
    }

    if (formIsValid) {
      setActiveStep((prev) => prev + 1)
    }
  }

  return { moveToNextStep }
}
