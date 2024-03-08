import { useFormik } from 'formik'
import * as Yup from 'yup'
import { updateRound } from '../../../../db/rounds/updateRound'
import { getRound } from '../../../../db/rounds/getRound'
import useGetApiData from '../../../../utils/hooks/useGetApiData'
import usePostApiData from '../../../../utils/hooks/usePostApiData'

export const stepOneSchema = Yup.object().shape({
  roundName: Yup.string().required('Round Name is required'),
  location: Yup.string().required('Location is required'),
  frequency: Yup.string().required('Frequency is required'),
})

export const stepTwoSchema = Yup.object().shape({
  relatedJobs: Yup.array().of(Yup.string().required('Job ID is required')),
})

interface useFormikStepsInterface {
  activeStep: number
  roundId: string
}

const useFormikSteps = ({ activeStep, roundId }: useFormikStepsInterface) => {
  const { getApiIsLoading, data } = useGetApiData({
    apiFunction: async () => getRound(roundId),
  })

  const { postApiIsLoading, setApiFunction } = usePostApiData({
    onSuccessScreen: 'Rounds',
    refreshScreen: true,
  })

  const validationSchemas: { [key: number]: Yup.ObjectSchema<any, any> } = {
    0: stepOneSchema,
    1: stepTwoSchema,
  }

  const validationSchema = validationSchemas[activeStep]

  const formik = useFormik({
    initialValues: {
      id: '',
      roundName: '',
      location: '',
      frequency: '',
      relatedJobs: [],
      isDeleted: false,
      ...data,
    },
    onSubmit: async (values) => {
      setApiFunction(() => async () => updateRound(values))
    },
    validationSchema,
    enableReinitialize: true,
  })

  return { formik, getApiIsLoading, postApiIsLoading }
}

export default useFormikSteps
