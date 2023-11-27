import React from 'react'
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import useFormikProps from './hooks/useFormikProps'
import InputField from './components/InputField'
import Dropdown from './components/DropDown'

const AddJobForm = () => {
  const formik = useFormikProps()

  return (
    <section style={styles.wrapper}>
      <div style={styles.formContainer}>
        <InputField
          formik={formik}
          name="jobName"
          placeholder="Job Name"
          title="Job Name"
          imageName={'wiper'}
        />
        <InputField
          formik={formik}
          name="address"
          placeholder="Address"
          title="Job Address"
          imageName={'location'}
        />
        <InputField
          formik={formik}
          name="postcode"
          placeholder="Post Code"
          title="Post Code"
          imageName={'locationCircle'}
        />
        <InputField
          formik={formik}
          name="contactName"
          placeholder="Contact Name"
          title="Contact Name"
          imageName={'person'}
        />
        <InputField
          formik={formik}
          name="contactTel"
          placeholder="Contact Telephone Number"
          title="Contact Telephone Number"
          numericInput={true}
          imageName={'tel'}
        />

        <InputField
          formik={formik}
          name="jobType"
          placeholder="Job Type e.g Front Only"
          title="Job Type"
          imageName={'diamond'}
        />
        <InputField
          formik={formik}
          name="time"
          placeholder="Estimated Job Time In Hours e.g 1.5"
          title="Estimated Job Time"
          numericInput={true}
          imageName={'clock'}
        />
        <InputField
          formik={formik}
          name="price"
          placeholder="Price"
          title="Price"
          numericInput={true}
          imageName={'poundSign'}
        />
        <Dropdown
          formik={formik}
          name="frequency"
          placeholder="Cleaning Frequency"
          title="Cleaning Frequency"
          options={['Daily', 'Weekly', 'Monthly', '2 Monthly', '3 Monthly']}
          imageName={'calender'}
        />
        <InputField
          formik={formik}
          name="notes"
          placeholder="Notes"
          title="Notes"
          numericInput={true}
          imageName={'notes'}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => formik.handleSubmit()}
            style={styles.buttonSubmit}
          >
            <Text style={styles.buttonText}>Add Job</Text>
          </TouchableOpacity>
        </View>
      </div>
    </section>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingTop: 16,
    paddingBottom: 32,
  },
  formContainer: {
    width: '100%',
    maxWidth: 600,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    padding: 16,
    marginVertical: 16,
    backgroundColor: 'white',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonSubmit: {
    alignItems: 'center',
    backgroundColor: '#337bae',
    padding: 10,
    paddingHorizontal: 32,
    marginHorizontal: 10,
    borderRadius: 8,
    marginBottom: 52,
    width: '100%',
    maxWidth: 300,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
})

export default AddJobForm
