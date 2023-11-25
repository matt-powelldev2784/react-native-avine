import { useFormik } from 'formik'
import * as Yup from 'yup'
import { addJobToDb } from '../../../../db/jobs/addJobtoDb'

const useFormikProps = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      address: '',
      postcode: '',
      jobType: '',
      time: '',
      price: '',
      frequency: '',
      contactName: '',
      contactTel: '',
    },
    onSubmit: (values) => {
      console.log(values)
      addJobToDb(values)
    },
    validationSchema: Yup.object().shape({
      jobName: Yup.string().required('Name is required'),
      address: Yup.string().required('Address is required'),
      postcode: Yup.string().required('Post Code is required'),
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
      contactName: Yup.string().required('Name is required'),
      contactTel: Yup.number()
        .typeError('Telephone number must be a number')
        .required('Telephone number is required')
        .positive(),
    }),
  })

  return formik
}

export default useFormikProps
