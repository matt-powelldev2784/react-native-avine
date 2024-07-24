import { auth } from '../../../firebaseConfig'
import { authError } from '../authError'
import { getPlanneerDocsInDateRange } from './getPlanneerDocsInDateRange'
import { getTotalHoursForJobs } from './getTotalHoursForJobs'

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
    const plannerJobRefsFlatArray = plannerJobRefs.flat()
    const jobIds = plannerJobRefsFlatArray.map((plannerDocRef) => {
      return plannerDocRef.split('@')[1]
    })

    const totalHours = await getTotalHoursForJobs(jobIds)
    console.log('totalHours', totalHours)
  } catch (error) {
    throw new Error(`Error getting job stats getJobStats route: ${error}`)
  }
}
