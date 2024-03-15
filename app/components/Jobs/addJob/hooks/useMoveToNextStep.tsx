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
    const formIsValid = Object.keys(formik.errors).length === 0

    setFieldsAsTouched()

    const clientId = formik.values.clientId
    if (!clientId) {
      formik.setFieldError('clientId', 'Client is required')
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
      formik.setTouched({})
    }
  }

  return { moveToNextStep }
}
