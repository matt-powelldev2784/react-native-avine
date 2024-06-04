import { useFormik } from 'formik'
import * as Yup from 'yup'
import { formatDateForDb } from '../../../../utils/formatDateForDb'
import { usePlannerContext } from '../../../../screens/planner/plannerContext/usePlannerContext'
import { toggleInvoiceIsPaid } from '../../../../db/jobs/toggleInvoiceIsPaid'
import { useState } from 'react'

interface useFormikStepsInterface {
  isPaid: boolean | null | undefined
  isComplete: boolean | null | undefined
}

const useFormikIsPaid = ({ isPaid, isComplete }: useFormikStepsInterface) => {
  const [isPaidApiIsLoading, setIsPaidPostApiIsLoading] = useState(false)
  const { selectedDay, selectedJob, setPlannerCardNeedsUpdate } =
    usePlannerContext()
  const isPaidError = isComplete
    ? false
    : 'You cannot set the invoice to paid until the job is set to complete.'

  const validationSchema = Yup.object().shape({
    isPaid: Yup.boolean(),
  })

  const formik = useFormik({
    initialValues: {
      isPaid: isPaid,
    },
    onSubmit: async () => {
      try {
        if (!selectedJob || !selectedDay) {
          return
        }
        if (typeof isPaid !== 'boolean') {
          return
        }

        const relatedJobSuffix = selectedJob.recurringRound
          ? 'recurringRound'
          : 'oneOffRound'

        setIsPaidPostApiIsLoading(true)

        await toggleInvoiceIsPaid({
          plannerDocRef: `${selectedJob.roundId}@${selectedJob.jobId}@${relatedJobSuffix}`,
          plannerDate: formatDateForDb(selectedDay),
          isPaid: !isPaid,
        }),
          setIsPaidPostApiIsLoading(false)
        setPlannerCardNeedsUpdate(true)
      } catch (error) {
        console.log('error', error)
        setIsPaidPostApiIsLoading(false)
      }
    },
    validationSchema,
    enableReinitialize: true,
  })

  const formikIsPaid = formik

  return { isPaidApiIsLoading, formikIsPaid, isPaidError }
}

export default useFormikIsPaid
