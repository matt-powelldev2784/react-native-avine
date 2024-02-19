import { useFormik } from 'formik'
import * as Yup from 'yup'
import { addRoundToDb } from '../../../../db/rounds/addRoundToDb'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../../screens/stackNavigator/StackNavigator'

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
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const useFormikSteps = ({ activeStep, setIsLoading }: UseFormikStepsProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  let validationSchema

  if (activeStep === 0) {
    validationSchema = stepOneSchema
  } else if (activeStep === 1) {
    validationSchema = stepTwoSchema
  }

  const formik = useFormik({
    initialValues: {
      roundName: '',
      location: '',
      frequency: '',
      jobs: [],
    },
    onSubmit: async (values) => {
      setIsLoading(true)

      console.log(values)
      addRoundToDb(values)

      navigation.navigate('Rounds', { refresh: true })
      setIsLoading(false)
    },
    validationSchema,
  })

  return formik
}

export default useFormikSteps
