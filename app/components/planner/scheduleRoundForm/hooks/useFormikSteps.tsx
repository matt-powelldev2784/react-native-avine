import { useFormik } from 'formik'
import * as Yup from 'yup'
import { scheduleRoundsToDb } from '../../../../db/planner/scheduleRoundsToDb'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../../screens/stackNavigator/StackNavigator'
import { getItemFromStorage } from '../../../../utils/getItemFromStorage'
import { addItemToStorage } from '../../../../utils/addItemToStorage'

export const stepOneSchema = Yup.object().shape({
  roundId: Yup.string().required('Round Name is required'),
})

const stepTwoSchema = Yup.object().shape({
  recurring: Yup.boolean().required(
    'Select if round is recurring or one-off is required',
  ),
})

export const stepThreeSchema = Yup.object().shape({
  date: Yup.string().required('Date is required').length(8),
})

interface useFormikStepsProps {
  activeStep: number
  setIsLoading: (isLoading: boolean) => void
}

const useFormikSteps = ({ activeStep, setIsLoading }: useFormikStepsProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  let validationSchema

  if (activeStep === 0) {
    validationSchema = stepOneSchema
  } else if (activeStep === 1) {
    validationSchema = stepTwoSchema
  } else if (activeStep === 2) {
    validationSchema = stepThreeSchema
  }

  const formik = useFormik({
    initialValues: {
      roundId: '',
      roundFrequency: '',
      date: '',
      recurring: false,
    },
    onSubmit: async (values) => {
      setIsLoading(true)
      const plannerDate = await getItemFromStorage('@plannerDate')

      if (plannerDate) {
        values.date = plannerDate
        addItemToStorage('@newScheduledDate', plannerDate)
      }

      console.log('schedule round form values', values)
      await scheduleRoundsToDb(values)

      navigation.navigate('Planner', { refresh: true })
      setIsLoading(false)
    },
    validationSchema,
  })

  return formik
}

export default useFormikSteps
