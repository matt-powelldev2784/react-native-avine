import { useFormik } from 'formik'
import * as Yup from 'yup'
import { updateRoundInDb } from '../../../../db/rounds/updateRoundInDb'
import { useEffect, useState } from 'react'
import { RoundT, RoundWithIdT } from '../../../../types/RoundT'
import { getRoundById } from '../../../../db/rounds/getRoundById'
import { getUserJobsFromDb } from '../../../../db/jobs/getUserJobsFromDb'
import { repsonseSuccessT } from '../../../../types/resposneT'

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
  const [roundData, setRoundData] = useState<RoundT>({
    roundName: '',
    location: '',
    frequency: '',
    relatedJobs: [],
  })

  let validationSchema

  useEffect(() => {
    const fetchData = async () => {
      const round = await getRoundById(roundId)
      console.log('round', round)

      const relatedJobs = round.data.relatedJobs

      if (relatedJobs) {
        setRoundData((prev) => {
          return {
            ...prev,
            jobs: relatedJobs,
            currentRelatedJobs: relatedJobs,
          }
        })
      }
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
    onSubmit: async (values) => {
      console.log(values)
      await updateRoundInDb(values)
    },
    validationSchema,
    enableReinitialize: true,
  })

  return formik
}

export default useFormikSteps
