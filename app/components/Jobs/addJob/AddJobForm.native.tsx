import React from 'react'
import { TouchableOpacity, StyleSheet, Text, ScrollView } from 'react-native'
import useFormikProps from './hooks/useFormikProps'
import InputField from './components/InputField'
import Dropdown from './components/DropDown'

const AddJobForm = () => {
  const formik = useFormikProps()

  return (
    <ScrollView style={styles.container}>
      <InputField
        formik={formik}
        name="jobName"
        placeholder="Job Name"
        imageName={'wiper'}
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
        placeholder="Job Type e.g Front Only"
        imageName={'diamond'}
      />
      <InputField
        formik={formik}
        name="time"
        placeholder="Estimated Job Time In Hours e.g 1.5"
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
      <Dropdown
        formik={formik}
        name="frequency"
        placeholder="Cleaning Frequency"
        options={['Daily', 'Weekly', 'Monthly', '2 Monthly', '3 Monthly']}
        imageName={'calender'}
      />
      <InputField
        formik={formik}
        name="contactName"
        placeholder="Contact Name"
        imageName={'person'}
      />
      <InputField
        formik={formik}
        name="contactTel"
        placeholder="Contact Telephone Number"
        numericInput={true}
        imageName={'tel'}
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
    marginBottom: 52,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
})

export default AddJobForm
