import { JobWithIdT } from '../../../../types/JobT'
import { formatDateForDb } from '../../../../utils/formatDateForDb'
import { usePlannerContext } from '../../../../screens/planner/plannerContext/usePlannerContext'
import { getScheduledJobDetails } from '../../../../db/planner/getScheduledJobDetails/getScheduledJobDetails'
import { useEffect, useState } from 'react'
import { ClientWithIdT } from '../../../../types/ClientT'

interface ScheduledJobData {
  job: JobWithIdT
  isComplete: boolean | null
  isPaid: boolean | null
  client: ClientWithIdT
}

export const useGetJobCardData = () => {
  const [data, setData] = useState<ScheduledJobData | null>(null)
  const [getApiIsLoading, setGetApiIsLoading] = useState<boolean>(false)
  const {
    selectedDay,
    selectedJob,
    plannerCardNeedsUpdate,
    setPlannerCardNeedsUpdate,
  } = usePlannerContext()

  if (!selectedJob || !selectedDay) {
    return { getApiIsLoading: false, jobData: null, isComplete: null }
  }

  useEffect(() => {
    const getData = async () => {
      setGetApiIsLoading(true)

      const data = await getScheduledJobDetails({
        roundId: selectedJob.roundId,
        jobId: selectedJob.jobId,
        plannerDate: formatDateForDb(selectedDay),
        recurringRound: selectedJob.recurringRound,
      })
      setData(data)
      setGetApiIsLoading(false)
    }
    getData()

    setPlannerCardNeedsUpdate(false)
  }, [plannerCardNeedsUpdate])

  const jobData = data?.job
  const isComplete = data?.isComplete
  const isPaid = data?.isPaid
  const client = data?.client as ClientWithIdT

  return { getApiIsLoading, jobData, isComplete, isPaid, client }
}
