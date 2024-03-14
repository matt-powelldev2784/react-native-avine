// useGetJobCardData.js

import { getJobIsComplete } from '../../../../../../db/planner/getJobIsComplete/getJobIsComplete'
import { JobWithIdT, SelectedJobT } from '../../../../../../types/JobT'
import { formatDateForDb } from '../../../../../../utils/formatDateForDb'
import useGetApiData from '../../../../../../utils/hooks/useGetApiData'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../../../../../../screens/stackNavigator/StackNavigator'
import { usePlannerContext } from '../../../../../../screens/planner/plannerContext/usePlannerContext'

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
      getJobIsComplete({
        roundId: selectedJob.roundId,
        jobId: selectedJob.jobId,
        plannerDate: formatDateForDb(selectedDay),
        recurringRound: selectedJob.recurringRound,
      }),
  })

  const jobData = data as JobWithIdT
  const isComplete = jobData?.jobIsComplete

  return { getApiIsLoading, jobData, isComplete }
}
