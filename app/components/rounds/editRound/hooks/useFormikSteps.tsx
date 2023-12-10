import { useFormik } from 'formik'
import * as Yup from 'yup'
import { addRoundToDb } from '../../../../db/rounds/addRoundToDb'
import { useEffect, useState } from 'react'
import { RoundWithJobIdsT } from '../../../../../types/RoundT'
import { getRoundById } from '../../../../db/rounds/getRoundById'
import { getUserJobsFromDb } from '../../../../db/jobs/getUserJobsFromDb'

export const stepOneSchema = Yup.object().shape({
  roundName: Yup.string().required('Round Name is required'),
  location: Yup.string().required('Location is required'),
  frequency: Yup.string().required('Frequency is required'),
})

export const stepTwoSchema = Yup.object().shape({
  jobs: Yup.array().of(Yup.string().required('Job ID is required')),
})

interface useFormikStepsInterface {
  activeStep: number
  roundId: string
}

const useFormikSteps = ({ activeStep, roundId }: useFormikStepsInterface) => {
  const [roundData, setRoundData] = useState<RoundWithJobIdsT>({
    id: '',
    roundName: '',
    location: '',
    frequency: '',
    jobs: [],
  })

  console.log('roundData', roundData)

  let validationSchema

  useEffect(() => {
    const fetchData = async () => {
      const rounds = await getRoundById(roundId)
      const jobs = await getUserJobsFromDb()
      const relatedJobs = jobs
        ?.map((job) => {
          if (job.linkedRounds.includes(roundId)) {
            return job.id
          }
        })
        .filter((job) => job !== undefined) as string[]

      if (rounds) {
        setRoundData((prev) => {
          return {
            ...prev,
            ...rounds,
          }
        })
      }

      if (relatedJobs) {
        setRoundData((prev) => {
          return {
            ...prev,
            jobs: relatedJobs,
          }
        })
      }
      console.log('relatedJobs', relatedJobs)
    }

    if (roundId) {
      fetchData()
    }
  }, [roundId])

  if (activeStep === 0) {
    validationSchema = stepOneSchema
  } else if (activeStep === 1) {
    validationSchema = stepTwoSchema
  }

  const formik = useFormik({
    initialValues: roundData,
    onSubmit: (values) => {
      console.log(values)
      addRoundToDb(values)
    },
    validationSchema,
    enableReinitialize: true,
  })

  return formik
}

export default useFormikSteps
