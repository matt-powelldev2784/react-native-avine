import { auth } from '../../../firebaseConfig'
import { JobStatsArray } from '../../types/JobStatsT'
import { authError } from '../authError'
import { getJobTotals } from './getJobTotals'
import { getPlanneerDocsInDateRange } from './getPlanneerDocsInDateRange'

interface getTotalJobHoursT {
  startDate: string
  endDate: string
}

export const getJobStats = async ({
  startDate,
  endDate,
}: getTotalJobHoursT) => {
  if (!auth.currentUser) {
    return authError({ filename: 'getJobStats' })
  }

  try {
    const plannerDocs = await getPlanneerDocsInDateRange({ startDate, endDate })

    // get all job ids from planner docs
    const plannerJobRefs = plannerDocs.map(
      (plannerDoc) => plannerDoc?.relatedJobs,
    )
    const jobRefsFlatArray = plannerJobRefs.flat()
    const jobIds = jobRefsFlatArray.map((plannerDocRef) => {
      return plannerDocRef.split('@')[1]
    })

    //get job stats
    const jobStats = await getJobTotals(jobIds)

    //get all round ids from planner docs
    const oneOffRoundRefs = plannerDocs.map(
      (plannerDoc) => plannerDoc?.oneOffRounds,
    )
    const recurringRoundRef = plannerDocs.map(
      (plannerDoc) => plannerDoc?.recurringRounds,
    )
    const roundRefsFlatArray = [
      ...oneOffRoundRefs.flat(),
      ...recurringRoundRef.flat(),
    ]
    const roundIds = roundRefsFlatArray.map((plannerDocRef) => {
      return plannerDocRef.split('@')[0]
    })

    //get round count
    const roundCount = roundIds.length

    // get price per hour
    const pricePerHour = () => {
      const pricePerHour = (jobStats.totalPrice / jobStats.totalTime).toFixed(2)
      if (pricePerHour === 'NaN') {
        return 0
      }
      return pricePerHour
    }

    //genrate array of objects
    const jobStatsObject = {
      ...jobStats,
      roundCount,
      pricePerHour: pricePerHour(),
    }
    const JobStatsArray = Object.entries(jobStatsObject).map(
      ([key, value]) => ({
        [key]: value,
      }),
    )
    const keyMapping = {
      totalTime: 'Hours Spent Cleaning',
      totalPrice: 'Net Monthly Income ',
      jobCount: 'Number of Jobs',
      roundCount: 'Number of Rounds',
      pricePerHour: '£s Per Hour',
    }
    type JobStatKey =
      | 'totalTime'
      | 'totalPrice'
      | 'jobCount'
      | 'roundCount'
      | 'pricePerHour'
    const mappedArray = JobStatsArray.map((obj) => {
      const [originalKey, value] = Object.entries(obj)[0]
      const newKey = keyMapping[originalKey as JobStatKey]
      const newValue =
        originalKey === 'totalPrice' || originalKey === 'pricePerHour'
          ? `£${value}`
          : value
      return { [newKey]: newValue }
    })

    console.log('mappedArray', mappedArray)

    return mappedArray as JobStatsArray
  } catch (error) {
    throw new Error(`Error getting job stats getJobStats route: ${error}`)
  }
}
