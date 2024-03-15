import { useFormik } from 'formik'
import * as Yup from 'yup'
import usePostApiData from '../../../../../../utils/hooks/usePostApiData'
import { formatDateForDb } from '../../../../../../utils/formatDateForDb'
import { usePlannerContext } from '../../../../../../screens/planner/plannerContext/usePlannerContext'
import { toggleInvoiceIsPaid } from '../../../../../../db/jobs/toggleInvoiceIsPaid'

interface useFormikStepsInterface {
  isPaid: boolean | null | undefined
}

const useFormikIsPaid = ({ isPaid }: useFormikStepsInterface) => {
  const { selectedDay, selectedJob } = usePlannerContext()

  const { setApiFunction, postApiIsLoading } = usePostApiData({
    onSuccessScreen: 'Planner',
    refreshScreen: { screen: 'ScheduledJobView' },
  })

  const validationSchema = Yup.object().shape({
    isPaid: Yup.boolean(),
  })

  const formik = useFormik({
    initialValues: {
      isPaid: isPaid,
    },
    onSubmit: async () => {
      if (!selectedJob || !selectedDay) {
        return
      }
      if (typeof isPaid !== 'boolean') {
        return
      }

      const relatedJobSuffix = selectedJob.recurringRound
        ? 'recurringRound'
        : 'oneOffRound'

      setApiFunction(
        () => async () =>
          toggleInvoiceIsPaid({
            jobId: `${selectedJob.roundId}@${selectedJob.jobId}@${relatedJobSuffix}`,
            plannerDate: formatDateForDb(selectedDay),
            isPaid: !isPaid,
          }),
      )
    },
    validationSchema,
    enableReinitialize: true,
  })

  const formikIsPaid = formik
  const isPaidApiIsLoading = postApiIsLoading

  return { isPaidApiIsLoading, formikIsPaid }
}

export default useFormikIsPaid
