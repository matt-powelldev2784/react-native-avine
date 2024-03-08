import { useFormik } from 'formik'
import * as Yup from 'yup'
import { addRound } from '../../../../db/rounds/addRound'
import usePostApiData from '../../../../utils/hooks/usePostApiData'

export const stepOneSchema = Yup.object().shape({
  roundName: Yup.string().required('Round Name is required'),
  location: Yup.string().required('Location is required'),
  frequency: Yup.string().required('Frequency is required'),
})

export const stepTwoSchema = Yup.object().shape({
  jobs: Yup.array().of(Yup.string().required('Job ID is required')),
})

interface UseFormikStepsProps {
  activeStep: number
}

const useFormikSteps = ({ activeStep }: UseFormikStepsProps) => {
  const validationSchemas: { [key: number]: Yup.ObjectSchema<any, any> } = {
    0: stepOneSchema,
    1: stepTwoSchema,
  }

  const validationSchema = validationSchemas[activeStep]

  const { postApiIsLoading, setApiFunction } = usePostApiData({
    onSuccessScreen: 'Rounds',
    refreshScreen: true,
  })

  const formik = useFormik({
    initialValues: {
      roundName: '',
      location: '',
      frequency: '',
      relatedJobs: [],
    },
    onSubmit: async (values) => {
      setApiFunction(() => async () => addRound(values))
    },
    validationSchema,
  })

  console.log('formik.values', formik.values)

  return { postApiIsLoading, formik }
}

export default useFormikSteps
