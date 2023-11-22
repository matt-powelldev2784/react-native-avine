import React from 'react'
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native'
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
      name: Yup.string().required('Required'),
      address: Yup.string().required('Required'),
      postcode: Yup.string().required('Required'),
      jobType: Yup.string().required('Required'),
      time: Yup.number().required('Required').positive(),
      price: Yup.number().required('Required').positive(),
      frequency: Yup.string().required('Required'),
    }),
  })

  return (
    <View style={styles.container}>
      <InputField formik={formik} name="name" placeholder="Name" />
      <InputField formik={formik} name="address" placeholder="Address" />
      <InputField formik={formik} name="postcode" placeholder="Postcode" />
      <InputField formik={formik} name="jobType" placeholder="Job Type" />
      <InputField
        formik={formik}
        name="time"
        placeholder="Time"
        numericInput={true}
      />
      <InputField
        formik={formik}
        name="price"
        placeholder="Price"
        numericInput={true}
      />
      <InputField formik={formik} name="frequency" placeholder="Frequency" />

      <TouchableOpacity
        onPress={() => formik.handleSubmit()}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
    width: '100%',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#337bae',
    padding: 10,
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
})

export default AddJobForm
