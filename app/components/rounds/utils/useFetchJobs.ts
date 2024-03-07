// useFetchJobs.ts
import { useEffect, useState } from 'react'
import { getAllJobs } from '../../../db/jobs/getAllJobs'

interface JobOption {
  label: string
  value: string
}

const formatNumberToFiveDigits = (inputNumber: number) => {
  const validInput = Math.max(1, Math.min(99999, inputNumber))
  const formattedNumber = String(validInput).padStart(5, '0')
  return formattedNumber.toString()
}

export const useFetchJobs = () => {
  const [userJobs, setUserJobs] = useState<JobOption[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllJobs()

      const jobOptions = data?.map((job, i) => {
        const jobDetails = {
          label: job.id,
          value: `${formatNumberToFiveDigits(i + 1)}${job.jobName}`,
        }
        return jobDetails
      })

      if (jobOptions) {
        setUserJobs(jobOptions)
      }
    }

    fetchData()
  }, [])

  return userJobs
}
