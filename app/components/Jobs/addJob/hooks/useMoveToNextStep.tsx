import { FormikProps } from 'formik'
import { getClient } from '../../../../db/clients/getClient'

interface UseMoveToNextStepProps {
  formik: FormikProps<any>
  activeStep: number
  setActiveStep: React.Dispatch<React.SetStateAction<number>>
  toggleCopyClient: boolean
}

export const useMoveToNextStep = ({
  formik,
  activeStep,
  setActiveStep,
  toggleCopyClient,
}: UseMoveToNextStepProps) => {
  const setFieldsAsTouched = () => {
    Object.keys(formik.values).forEach((key) => {
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

    if (toggleCopyClient && activeStep == 0) {
      const clientDetails = await getClient(formik.values.clientId)
      const { name, address, contactTel, town, postcode } = clientDetails
      formik.setFieldValue('contactName', name)
      formik.setFieldValue('address', address)
      formik.setFieldValue('contactTel', contactTel)
      formik.setFieldValue('town', town)
      formik.setFieldValue('postcode', postcode)
    }

    if (formIsValid) {
      setActiveStep((prev) => prev + 1)
    }
  }

  return { moveToNextStep }
}
