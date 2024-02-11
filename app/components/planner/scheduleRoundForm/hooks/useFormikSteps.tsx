import { useFormik } from 'formik'
import * as Yup from 'yup'
import { scheduleRecurringRoundToDb } from '../../../../db/planner/scheduleRecurringRoundToDb'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../../screens/stackNavigator/StackNavigator'
import { getItemFromStorage } from '../../../../utils/getItemFromStorage'
import AsyncStorage from '@react-native-async-storage/async-storage'

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

const useFormikSteps = (activeStep: number) => {
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
      const plannerDate = await getItemFromStorage('@plannerDate')

      if (plannerDate) {
        values.date = plannerDate
        AsyncStorage.setItem('@newScheduledDate', JSON.stringify(plannerDate))
      }

      console.log(values)
      await scheduleRecurringRoundToDb(values)

      navigation.navigate('Planner', { refresh: true })
    },
    validationSchema,
  })

  console.log('formik.values', formik.values)

  return formik
}

export default useFormikSteps
