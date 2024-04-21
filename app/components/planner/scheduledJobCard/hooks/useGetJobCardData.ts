import { JobWithIdT } from '../../../../types/JobT'
import { formatDateForDb } from '../../../../utils/formatDateForDb'
import useGetApiData from '../../../../utils/hooks/useGetApiData'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../../../../screens/stackNavigator/StackNavigator'
import { usePlannerContext } from '../../../../screens/planner/plannerContext/usePlannerContext'
import { getScheduledJobDetails } from '../../../../db/planner/getScheduledJobDetails/getScheduledJobDetails'

type ScheduledJobCardRouteProp = RouteProp<RootStackParamList, 'Planner'>

interface UseGetJobCardDataT {
  route: ScheduledJobCardRouteProp
}

export const useGetJobCardData = ({ route }: UseGetJobCardDataT) => {
  const { selectedDay, selectedJob } = usePlannerContext()

  if (!selectedJob || !selectedDay) {
    return { getApiIsLoading: false, jobData: null, isComplete: null }
  }

  const { getApiIsLoading, data } = useGetApiData({
    route,
    apiFunction: async () =>
      getScheduledJobDetails({
        roundId: selectedJob.roundId,
        jobId: selectedJob.jobId,
        plannerDate: formatDateForDb(selectedDay),
        recurringRound: selectedJob.recurringRound,
      }),
  })

  const jobData = data as JobWithIdT
  const isComplete = jobData?.jobIsComplete
  const isPaid = jobData?.invoiceIsPaid

  return { getApiIsLoading, jobData, isComplete, isPaid }
}
