import { auth } from '../../../firebaseConfig'
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

    console.log('{ ...jobStats, roundCount }', { ...jobStats, roundCount })

    return { ...jobStats, roundCount }
  } catch (error) {
    throw new Error(`Error getting job stats getJobStats route: ${error}`)
  }
}
