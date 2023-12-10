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
    Object.keys(formik.values).forEach((key) => {
      formik.setFieldTouched(key)
    })
  }

  const moveToNextStep = async () => {
    const formHasBeenTouched = Object.keys(formik.touched).length > 0
    const formIsValid = Object.keys(formik.errors).length === 0

    setFieldsAsTouched()

    if (formHasBeenTouched) {
      await formik.validateForm()
    }

    if (formHasBeenTouched && formIsValid) {
      setActiveStep((prev) => prev + 1)
      formik.setTouched({})
    }
  }

  return { moveToNextStep }
}
