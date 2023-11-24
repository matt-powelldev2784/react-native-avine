import React from 'react'
import { TouchableOpacity, StyleSheet, Text, ScrollView } from 'react-native'
import useFormikProps from './hooks/useFormikProps'
import InputField from './components/InputField' // Import the InputField component

const AddJobForm = () => {
  const formik = useFormikProps()

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
