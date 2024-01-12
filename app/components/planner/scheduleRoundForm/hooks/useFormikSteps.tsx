import { useFormik } from 'formik'
import * as Yup from 'yup'
import { scheduleRoundToDb } from '../../../../db/planner/schdeuleRoundToDb'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../../screens/stackNavigator/StackNavigator'
import { getPlannerDateFromStorage } from '../../../../utils/getPlannerDateFromStorage'
import { formatDateForDb } from '../../../../utils/formatDateForDb'
import { addPlannerDateToStorage } from '../../../../utils/addPlannerDateToStorage'

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
      const plannerDate = await getPlannerDateFromStorage('@plannerDate')

      if (plannerDate) {
        values.date = formatDateForDb(plannerDate)
        await addPlannerDateToStorage(plannerDate, '@newScheduledDate')
      }

      console.log(values)
      await scheduleRoundToDb(values)

      navigation.navigate('Planner', { refresh: true })
    },
    validationSchema,
  })

  return formik
}

export default useFormikSteps
