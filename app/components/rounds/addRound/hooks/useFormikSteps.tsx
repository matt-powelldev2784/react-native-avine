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
  relatedJobs: Yup.array()
    .required('You must select at least one job')
    .test('has-items', 'You must select at least one job', (value) => {
      return Array.isArray(value) && value.length > 0
    }),
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

  return { postApiIsLoading, formik }
}

export default useFormikSteps
