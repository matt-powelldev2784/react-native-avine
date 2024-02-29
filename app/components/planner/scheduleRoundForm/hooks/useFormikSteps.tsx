import { useFormik } from 'formik'
import * as Yup from 'yup'
import { addRound } from '../../../../db/planner/addRound/addRound'
import usePostApiData from '../../../../utils/hooks/usePostApiData'
import { useWeekPlannerContext } from '../../weekPlanner/hooks/WeekPlannerContext'
import { formatDateForDb } from '../../../../utils/formatDateForDb'

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
}

const useFormikSteps = ({ activeStep }: useFormikStepsProps) => {
  const { selectedDay, setStoredDate } = useWeekPlannerContext()

  const validationSchemas: { [key: number]: Yup.ObjectSchema<any, any> } = {
    0: stepOneSchema,
    1: stepTwoSchema,
    2: stepThreeSchema,
  }

  const validationSchema = validationSchemas[activeStep]

  const { postApiIsLoading, setApiFunction } = usePostApiData({
    onSuccessScreen: 'Planner',
    refreshScreen: true,
  })

  const formik = useFormik({
    initialValues: {
      roundId: '',
      roundFrequency: '',
      date: formatDateForDb(selectedDay),
      recurring: false,
    },
    onSubmit: async (values) => {
      const dateForDb = formatDateForDb(selectedDay)
      values.date = dateForDb
      setStoredDate(selectedDay)

      setApiFunction(() => async () => addRound(values))
    },
    validationSchema,
  })

  return { postApiIsLoading, formik }
}

export default useFormikSteps
