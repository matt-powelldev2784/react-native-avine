import { useFormik } from 'formik'
import * as Yup from 'yup'
import usePostApiData from '../../../../utils/hooks/usePostApiData'
import { toggleJobIsComplete } from '../../../../db/jobs/toggleJobIsComplete'
import { formatDateForDb } from '../../../../utils/formatDateForDb'
import { usePlannerContext } from '../../../../screens/planner/plannerContext/usePlannerContext'

interface useFormikStepsInterface {
  isComplete: boolean | null | undefined
  isPaid: boolean | null | undefined
}

const useFormikIsComplete = ({
  isComplete,
  isPaid,
}: useFormikStepsInterface) => {
  const { selectedDay, selectedJob } = usePlannerContext()
  const isCompleteError = isPaid
    ? 'You cannot toggle a job as incomplete if the invoice has been set to paid.'
    : false

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

      const relatedJobSuffix = selectedJob.recurringRound
        ? 'recurringRound'
        : 'oneOffRound'

      setApiFunction(
        () => async () =>
          toggleJobIsComplete({
            plannerJobRef: `${selectedJob.roundId}@${selectedJob.jobId}@${relatedJobSuffix}`,
            plannerDate: formatDateForDb(selectedDay),
            isComplete: !isComplete,
          }),
      )
    },
    validationSchema,
    enableReinitialize: true,
  })

  return { postApiIsLoading, formik, isCompleteError }
}

export default useFormikIsComplete
