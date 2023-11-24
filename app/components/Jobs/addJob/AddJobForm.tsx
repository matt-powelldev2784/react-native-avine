import React from 'react'
import { TouchableOpacity, StyleSheet, Text, ScrollView } from 'react-native'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import InputField from './components/InputField' // Import the InputField component

const AddJobForm = () => {
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

  return (
    <ScrollView style={styles.container}>
      <InputField
        formik={formik}
        name="name"
        placeholder="Name"
        imageName={'person'}
      />
      <InputField
        formik={formik}
        name="address"
        placeholder="Address"
        imageName={'location'}
      />
      <InputField
        formik={formik}
        name="postcode"
        placeholder="Post Code"
        imageName={'locationCircle'}
      />
      <InputField
        formik={formik}
        name="jobType"
        placeholder="Job Type"
        imageName={'diamond'}
      />
      <InputField
        formik={formik}
        name="time"
        placeholder="Time"
        numericInput={true}
        imageName={'clock'}
      />
      <InputField
        formik={formik}
        name="price"
        placeholder="Price"
        numericInput={true}
        imageName={'poundSign'}
      />
      <InputField
        formik={formik}
        name="frequency"
        placeholder="Frequency"
        imageName={'calender'}
      />

      <TouchableOpacity
        onPress={() => formik.handleSubmit()}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
    width: '100%',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#337bae',
    padding: 10,
    margin: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
})

export default AddJobForm
