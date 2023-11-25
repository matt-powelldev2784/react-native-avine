import React from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
  View,
} from 'react-native'
import useFormikProps from './hooks/useFormikProps'
import InputField from './components/InputField'
import Dropdown from './components/DropDown'

const AddJobForm = () => {
  const formik = useFormikProps()

  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      style={styles.scrollView}
    >
      {/* <View style={styles.titleContainer}>
        <Image
          source={require('../../../../assets/wiper_icon.png')}
          style={{ width: 25, height: 25 }}
        />
        <Text style={styles.title}>Add Job Details</Text>
      </View> */}

      <View style={styles.form}>
        <View style={styles.leftConatiner}>
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
        </View>

        <View style={styles.rightConatiner}>
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
        </View>
      </View>

      <View style={styles.notesConatiner}>
        <InputField
          formik={formik}
          name="notes"
          placeholder="Notes"
          numericInput={true}
          imageName={'notes'}
        />
      </View>

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
  contentContainer: {
    width: '100%',
    alignItems: 'center',
  },
  scrollView: {
    backgroundColor: 'white',
    width: '100%',
    flex: 1,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 16,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#337bae',
  },
  form: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
    gap: 30,
  },
  leftConatiner: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
    maxWidth: 500,
  },
  rightConatiner: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
    maxWidth: 500,
    width: '100%',
  },
  notesConatiner: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
    width: '100%',
    maxWidth: 1030,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#337bae',
    padding: 10,
    margin: 10,
    borderRadius: 8,
    marginBottom: 52,
    marginHorizontal: 16,
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
