import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import useFormikSteps from './hooks/useFormikSteps'
import InputField from './components/InputField'
import Dropdown from './components/DropDown'

const AddJobForm = () => {
  const [activeStep, setActiveStep] = useState(0)
  const formik = useFormikSteps(activeStep)

  const setFieldsAsTouched = () => {
    Object.keys(formik.values).forEach((key) => {
      formik.setFieldTouched(key)
    })
  }

  const moveToNextStepIfFormIsValid = async () => {
    const formHasBeenTouched = Object.keys(formik.touched).length > 0
    const formIsValid = Object.keys(formik.errors).length === 0

    setFieldsAsTouched()

    if (formHasBeenTouched) {
      await formik.validateForm()
    }

    if (formHasBeenTouched && formIsValid) {
      console.log('a')
      setActiveStep((prev) => prev + 1)
      formik.setTouched({})
    }
  }

  return (
    <section style={styles.wrapper}>
      <div style={styles.formContainer}>
        <View style={styles.titleContainer}>
          <Text style={activeStep === 0 ? styles.titleActive : styles.title}>
            Add Location Details
          </Text>
          <View style={styles.line} />
          <Text style={activeStep === 1 ? styles.titleActive : styles.title}>
            Add Contact Details
          </Text>
          <View style={styles.line} />
          <Text style={activeStep === 2 ? styles.titleActive : styles.title}>
            Add Job Details
          </Text>
        </View>

        {/*********************  Step 1 ***************************/}
        {activeStep === 0 ? (
          <>
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
          </>
        ) : null}

        {/*********************  Step 2 ***************************/}
        {activeStep === 1 ? (
          <>
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
          </>
        ) : null}

        {/*********************  Step 3 ***************************/}
        {activeStep === 2 ? (
          <>
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
          </>
        ) : null}

        <View style={styles.buttonContainer}>
          {activeStep < 2 ? (
            <>
              <TouchableOpacity
                onPress={moveToNextStepIfFormIsValid}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </>
          ) : null}

          {activeStep === 2 ? (
            <TouchableOpacity
              onPress={() => formik.handleSubmit()}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Add Job</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </div>
    </section>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingTop: 16,
    paddingBottom: 80,
    flex: 1,
  },
  formContainer: {
    width: '100%',
    maxWidth: 600,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    padding: 16,
    backgroundColor: 'white',
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 48,
  },
  titleActive: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#337bae',
    borderRadius: 8,
    padding: 8,
    textAlign: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#337bae',
    backgroundColor: '#f1f2f2',
    borderRadius: 8,
    padding: 8,
    textAlign: 'center',
  },
  line: {
    height: '100%',
    width: 32,
    backgroundColor: '#337bae',
    borderWidth: 3,
    borderStyle: 'solid',
    borderColor: '#337bae', // change this to the color of your choice
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    maxWidth: 600,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#337bae',
    padding: 10,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: '100%',
    maxWidth: 270,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
})

export default AddJobForm
