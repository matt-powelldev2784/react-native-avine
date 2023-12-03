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
    const formIsValid = Object.keys(formik.errors).length === 0

    setFieldsAsTouched()

    if (formIsValid) {
      setActiveStep((prev) => prev + 1)
      formik.setTouched({})
    }
  }

  return { moveToNextStep }
}
