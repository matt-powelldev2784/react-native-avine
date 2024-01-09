import { useFormik } from 'formik'
import * as Yup from 'yup'
import { scheduleRoundToDb } from '../../../../db/planner/schdeuleRoundToDb'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../../screens/stackNavigator/StackNavigator'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const stepOneSchema = Yup.object().shape({
  roundId: Yup.string().required('Round Name is required'),
})

export const stepTwoSchema = Yup.object().shape({
  date: Yup.string().required('Date is required').length(10),
})

const useFormikSteps = (activeStep: number) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  let validationSchema

  if (activeStep === 0) {
    validationSchema = stepOneSchema
  } else if (activeStep === 1) {
    validationSchema = stepTwoSchema
  }

  const formik = useFormik({
    initialValues: {
      roundId: '',
      date: '',
    },
    onSubmit: async (values) => {
      console.log(values)
      await scheduleRoundToDb(values)
      navigation.navigate('Planner', { refresh: true })
      await AsyncStorage.setItem(
        '@plannerDate',
        JSON.stringify(formik.values.date),
      )
    },
    validationSchema,
  })

  console.log('formik.values', formik.values)

  return formik
}

export default useFormikSteps
