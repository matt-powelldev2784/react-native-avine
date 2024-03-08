import { useEffect, useState, Dispatch, SetStateAction } from 'react'

interface JobOption {
  label: string
  value: string
}

type UseOrderedJobsReturn = [JobOption[], Dispatch<SetStateAction<JobOption[]>>]

const useOrderedJobs = (
  userJobs: JobOption[],
  relatedJobs: string[],
): UseOrderedJobsReturn => {
  const [orderedJobs, setOrderedJobs] = useState<JobOption[] | []>([])

  useEffect(() => {
    const userJobsWithoutPrefix = userJobs.map((job) => {
      return {
        label: job.label,
        value: job.value.substring(5),
      }
    })

    const selectedJobs = userJobsWithoutPrefix.filter((job) => {
      if (relatedJobs.includes(job.label)) {
        return job
      }
    })

    setOrderedJobs(selectedJobs)
  }, [userJobs])

  return [orderedJobs, setOrderedJobs]
}

export default useOrderedJobs
