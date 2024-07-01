import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toggleJobIsComplete } from '../../../../db/jobs/toggleJobIsComplete'
import { usePlannerContext } from '../../../../screens/planner/plannerContext/usePlannerContext'
import { useState } from 'react'

interface useFormikStepsInterface {
  isComplete: boolean | null | undefined
  isPaid: boolean | null | undefined
}

const useFormikIsComplete = ({
  isComplete,
  isPaid,
}: useFormikStepsInterface) => {
  const [isCompleteApiIsLoading, setIsCompletePostApiIsLoading] =
    useState(false)

  const { selectedDay, selectedJob, setPlannerCardNeedsUpdate, selectedRound } =
    usePlannerContext()

  const isCompleteError = isPaid
    ? 'You cannot change the job to incomplete if the invoice has been set to paid.'
    : false

  const validationSchema = Yup.object().shape({
    isComplete: Yup.boolean(),
  })

  const formik = useFormik({
    initialValues: {
      isComplete: isComplete,
    },
    onSubmit: async () => {
      try {
        setIsCompletePostApiIsLoading(true)
        if (!selectedJob || !selectedDay || !selectedRound) {
          return
        }
        if (typeof isComplete !== 'boolean') {
          return
        }

        const relatedJobSuffix = selectedJob.recurringRound
          ? 'recurringRound'
          : 'oneOffRound'

        await toggleJobIsComplete({
          plannerJobRef: `${selectedJob.roundId}@${selectedJob.jobId}@${relatedJobSuffix}`,
          plannerDate: selectedRound?.plannerDate,
          isComplete: !isComplete,
        })

        setPlannerCardNeedsUpdate(true)
      } catch (error) {
        console.log('error', error)
        setIsCompletePostApiIsLoading(false)
      } finally {
        setIsCompletePostApiIsLoading(false)
      }
    },
    validationSchema,
    enableReinitialize: true,
  })

  return { isCompleteApiIsLoading, formik, isCompleteError }
}

export default useFormikIsComplete
