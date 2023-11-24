import { useFormik } from 'formik'
import * as Yup from 'yup'

const useFormikProps = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      address: '',
      postcode: '',
      jobType: '',
      time: 0,
      price: 0,
      frequency: '',
    },
    onSubmit: (values) => console.log(values),
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Name is required'),
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
    }),
  })

  return formik
}

export default useFormikProps
