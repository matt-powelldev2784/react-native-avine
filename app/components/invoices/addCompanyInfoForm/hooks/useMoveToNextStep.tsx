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

  const moveToNextStep = () => {
    setTimeout(() => {
      setFieldsAsTouched()
    }, 500)

    const formIsTouched = Object.keys(formik.touched).length > 0
    const formIsValid = Object.keys(formik.errors).length === 0

    if (formIsValid && formIsTouched) {
      setActiveStep((prev) => prev + 1)
      formik.setTouched({})
    }
  }

  return { moveToNextStep }
}
