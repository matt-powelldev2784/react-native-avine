import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { updateJobInDb } from '../../../../db/jobs/updateJobIDb'
import { getJobById } from '../../../../db/jobs/getJobById'
import { JobWithIdT } from '../../../../types/JobT'

export const stepOneSchema = Yup.object().shape({
  jobName: Yup.string().required('Name is required'),
  address: Yup.string().required('Address is required'),
  postcode: Yup.string().required('Post Code is required'),
})

export const stepTwoSchema = Yup.object().shape({
  contactName: Yup.string().required('Name is required'),
  contactTel: Yup.number()
    .typeError('Telephone number must be a number')
    .required('Telephone number is required')
    .positive(),
})

export const stepThreeSchema = Yup.object().shape({
  jobType: Yup.string().required('Job Type is required'),
  time: Yup.number()
    .typeError('Time must be a number')
    .required('Time is required')
    .positive(),
  price: Yup.number()
    .typeError('Price must be a number')
    .required('Price is required')
    .positive(),
  frequency: Yup.string().required('Frequency is required'),
  notes: Yup.string(),
})

interface useFormikStepsInterface {
  activeStep: number
  jobId: string
}

const useFormikSteps = ({ activeStep, jobId }: useFormikStepsInterface) => {
  const [jobData, setJobData] = useState<JobWithIdT | null | undefined>(null)

  let validationSchema

  useEffect(() => {
    const fetchData = async () => {
      const data = await getJobById(jobId)
      if (data) {
        setJobData(data)
      }
    }

    if (jobId) {
      fetchData()
    }
  }, [jobId])

  if (activeStep === 0) {
    validationSchema = stepOneSchema
  } else if (activeStep === 1) {
    validationSchema = stepTwoSchema
  } else if (activeStep === 2) {
    validationSchema = stepThreeSchema
  }

  const formik = useFormik({
    initialValues: jobData || {
      id: '',
      jobName: '',
      address: '',
      postcode: '',
      jobType: '',
      time: '',
      price: 0,
      frequency: '',
      contactName: '',
      contactTel: 0,
      notes: '',
    },
    onSubmit: async (values) => {
      await updateJobInDb({ jobId, jobData: values })
    },
    validationSchema,
    enableReinitialize: true,
  })

  return formik
}

export default useFormikSteps
