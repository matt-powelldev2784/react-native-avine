import { useFormik } from 'formik'
import * as Yup from 'yup'
import usePostApiData from '../../../../utils/hooks/usePostApiData'
import { addCompanyDetails } from '../../../../db/user/addCompanyDetails'
import { removeLogoPreview } from '../../../../db/user/removeLogoPreview'

export const stepOneSchema = Yup.object().shape({
  companyName: Yup.string().required('Compnay name is required'),
  address: Yup.string().required('Address is required'),
  town: Yup.string().required('Town is required'),
  county: Yup.string().required('County is required'),
  postcode: Yup.string().required('Post Code is required'),
  contactTel: Yup.number()
    .typeError('Telephone number must be a number')
    .required('Telephone number is required')
    .positive(),
})

// if upload is declined, logoUrl is not required
export const stepTwoSchema = Yup.object().shape({
  logoUploadDeclined: Yup.boolean(),
  logoUrl: Yup.string().required().min(1, 'Please select a logo image'),
})

interface useFormikStepsProps {
  activeStep: number
}

const useFormikSteps = ({ activeStep }: useFormikStepsProps) => {
  const validationSchemas: { [key: number]: Yup.ObjectSchema<any, any> } = {
    0: stepOneSchema,
    1: stepTwoSchema,
  }

  const validationSchema = validationSchemas[activeStep]

  const { postApiIsLoading, setApiFunction } = usePostApiData({
    onSuccessScreen: 'DueInvoices',
    refreshScreen: { refresh: true },
  })

  const formik = useFormik({
    initialValues: {
      companyName: '',
      address: '',
      town: '',
      county: '',
      postcode: '',
      contactTel: 0,
      logoUrl: '',
      logoUploadDeclined: false,
      companyDetailsProvided: true,
    },
    onSubmit: async (values) => {
      await removeLogoPreview()
      setApiFunction(() => async () => addCompanyDetails(values))
    },
    validationSchema,
  })

  return { postApiIsLoading, formik }
}

export default useFormikSteps
