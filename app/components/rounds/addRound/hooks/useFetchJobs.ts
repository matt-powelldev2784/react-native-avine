// useFetchJobs.ts
import { useEffect, useState } from 'react'
import { getAllJobs } from '../../../../db/jobs/getAllJobs'

interface JobOption {
  label: string
  value: string
}

export const useFetchJobs = () => {
  const [userJobs, setUserJobs] = useState<JobOption[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllJobs()
      const jobOptions = data?.map((job) => ({
        label: job.id,
        value: job.jobName,
      }))
      if (jobOptions) {
        setUserJobs(jobOptions)
      }
    }

    fetchData()
  }, [])

  return userJobs
}
