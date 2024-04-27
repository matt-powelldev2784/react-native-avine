import { FormikProps } from 'formik'

interface UseMoveToNextStepProps {
  formik: FormikProps<any>
  setActiveStep: React.Dispatch<React.SetStateAction<number>>
}

export const useMoveToNextStep = ({
  formik,
  setActiveStep,
}: UseMoveToNextStepProps) => {
  const setFieldsAsTouched = () => {
    Object.keys(formik.values).map((key) => {
      formik.setFieldTouched(key)
    })
  }

  const moveToNextStep = async () => {
    const errors = await formik.validateForm()
    const formIsValid = Object.keys(errors).length === 0

    if (!formIsValid) {
      console.log('errors', errors)
      setFieldsAsTouched()
      return
    }

    if (formIsValid) {
      setActiveStep((prev) => prev + 1)
    }
  }

  return { moveToNextStep }
}
