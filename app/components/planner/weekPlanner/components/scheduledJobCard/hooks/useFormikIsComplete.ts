import { useFormik } from 'formik'
import * as Yup from 'yup'
import usePostApiData from '../../../../../../utils/hooks/usePostApiData'
import { toggleJobIsComplete } from '../../../../../../db/jobs/toggleJobIsComplete'
import { formatDateForDb } from '../../../../../../utils/formatDateForDb'
import { usePlannerContext } from '../../../../../../screens/planner/plannerContext/usePlannerContext'

interface useFormikStepsInterface {
  isComplete: boolean | null | undefined
}

const useFormikIsComplete = ({ isComplete }: useFormikStepsInterface) => {
  const { selectedDay, selectedJob } = usePlannerContext()

  const { setApiFunction, postApiIsLoading } = usePostApiData({
    onSuccessScreen: 'Planner',
    refreshScreen: { screen: 'ScheduledJobView' },
  })

  const validationSchema = Yup.object().shape({
    isComplete: Yup.boolean(),
  })

  const formik = useFormik({
    initialValues: {
      isComplete: isComplete,
    },
    onSubmit: async () => {
      if (!selectedJob || !selectedDay) {
        return
      }
      if (typeof isComplete !== 'boolean') {
        return
      }

      console.log('isComplete', isComplete)

      const relatedJobSuffix = selectedJob.recurringRound
        ? 'recurringRound'
        : 'oneOffRound'

      setApiFunction(
        () => async () =>
          toggleJobIsComplete({
            jobId: `${selectedJob.roundId}@${selectedJob.jobId}@${relatedJobSuffix}`,
            plannerDate: formatDateForDb(selectedDay),
            isComplete: !isComplete,
          }),
      )
    },
    validationSchema,
    enableReinitialize: true,
  })

  return { postApiIsLoading, formik }
}

export default useFormikIsComplete
