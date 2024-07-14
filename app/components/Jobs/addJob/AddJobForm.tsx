import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View, ScrollView, Platform, Text } from 'react-native'
import useFormikSteps from './hooks/useFormikSteps'
import InputField from '../../../ui/formElements/InputField'
import Dropdown from '../../../ui/formElements/DropDown'
import FormFlowTitles from './components/FormFlowTitles'
import { useMoveToNextStep } from './hooks/useMoveToNextStep'
import theme from '../../../utils/theme/theme'
import { useFormResetOnBlur } from '../../../utils/useFormResetOnBlur'
import { freqencyArray } from '../../../utils/freqencyArray'
import { useDeviceType } from '../../../utils/hooks/useDeviceTypes'
import Button from '../../../ui/button/Button'
import { handleFormStepBack } from '../../../utils/handleFormStepBack'
import { useGetClientOptions } from '../editJob/hooks/useFetchClients'
import { CustomSwitch } from '../../../ui'

const AddJobForm = () => {
  //state
  const [activeStep, setActiveStep] = useState(0)
  const [toggleCopyClient, setToggleCopyClient] = useState(false)
  const [jobNameIsAutoFill, setJobNameIsAutoFill] = useState(true)

  //hooks
  const { postApiIsLoading, formik } = useFormikSteps({
    activeStep,
  })
  const { moveToNextStep } = useMoveToNextStep({
    formik,
    activeStep,
    setActiveStep,
    toggleCopyClient,
  })
  const clientList = useGetClientOptions()
  const { isLargeWeb } = useDeviceType()
  const contactNameRef = useRef('')
  const addressRef = useRef('')
  useFormResetOnBlur(formik, setActiveStep)
  useEffect(() => {
    if (jobNameIsAutoFill) {
      contactNameRef.current = formik.values.contactName
      addressRef.current = formik.values.address
      formik.values.jobName = `${addressRef.current} ${contactNameRef.current}`
    }
  }, [formik.values.contactName, formik.values.address, formik.values.jobName])

  //functions
  const handleToggleCopyClient = async () => {
    setToggleCopyClient(!toggleCopyClient)
  }
  const handleStepBack = () => {
    handleFormStepBack({ setActiveStep, activeStep })
  }
  const handleSumbmitPress = () => {
    formik.handleSubmit()
  }

  //variables
  const buttonsStyle = isLargeWeb ? 'row' : 'column'

  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      style={styles.wrapper}
    >
      <FormFlowTitles activeStep={activeStep} />

      <View style={styles.formContainer}>
        {/*********************  Step 1 ***************************/}
        {activeStep === 0 ? (
          <>
            <Dropdown
              formik={formik}
              name="clientId"
              placeholder="Select client for invoice"
              title="Select client for invoice"
              options={clientList}
              imageName={'person'}
            />
            <View style={styles.toggleContainer}>
              <Text style={styles.text}>
                Copy name and address details from client
              </Text>
              <CustomSwitch
                value={toggleCopyClient}
                onValueChange={handleToggleCopyClient}
              />
            </View>
          </>
        ) : null}

        {/*********************  Step 2 ***************************/}
        {activeStep === 1 ? (
          <>
            <InputField
              formik={formik}
              name="address"
              placeholder="Address"
              title="Address"
              imageName={'location'}
            />
            <InputField
              formik={formik}
              name="town"
              placeholder="Town"
              title="Town"
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
              ref={contactNameRef}
            />
            <InputField
              formik={formik}
              name="contactTel"
              placeholder="Contact Telephone Number"
              title="Contact Telephone Number"
              keyboardType={'phone-pad'}
              imageName={'tel'}
            />
            <InputField
              formik={formik}
              name="jobName"
              placeholder="Job Name"
              title="Job Name"
              imageName={'wiper'}
              backgroundColor={
                jobNameIsAutoFill ? theme.colors.backgroundGrey : 'white'
              }
              onFocus={() => setJobNameIsAutoFill(false)}
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
            <Dropdown
              formik={formik}
              name="frequency"
              placeholder="Requested Cleaning Frequency"
              title="Requested Cleaning Frequency"
              options={freqencyArray}
              imageName={'calender'}
            />

            <View style={styles.timeContainer}>
              <View style={styles.timeInput}>
                <InputField
                  formik={formik}
                  name="hours"
                  placeholder="Hours"
                  title="Time Hours"
                  keyboardType={Platform.OS === 'web' ? 'default' : 'numeric'}
                  imageName={'clock'}
                />
              </View>

              <View style={styles.timeInput}>
                <InputField
                  formik={formik}
                  name="mins"
                  placeholder="Mins"
                  title="Time Mins"
                  keyboardType={Platform.OS === 'web' ? 'default' : 'numeric'}
                  imageName={'clock'}
                />
              </View>
            </View>

            <InputField
              formik={formik}
              name="price"
              placeholder="Price"
              title="Price"
              keyboardType={Platform.OS === 'web' ? 'default' : 'numeric'}
              imageName={'poundSign'}
            />

            <InputField
              formik={formik}
              name="notes"
              placeholder="Notes"
              title="Notes"
              imageName={'notes'}
              height={100}
            />
          </>
        ) : null}

        {/*********************  buttons ***************************/}
        <View style={styles.buttonContainer}>
          <View
            style={[styles.buttonContainer, { flexDirection: buttonsStyle }]}
          >
            {activeStep > 0 ? (
              <Button
                onPress={handleStepBack}
                text="Go Back"
                backgroundColor={theme.colors.buttonSecondary}
              />
            ) : null}

            {activeStep >= 0 && activeStep < 2 ? (
              <Button onPress={moveToNextStep} text="Next" />
            ) : null}

            {activeStep === 2 ? (
              <Button
                onPress={handleSumbmitPress}
                text="Add Job"
                isLoading={postApiIsLoading}
              />
            ) : null}
          </View>
        </View>
      </View>

      {!isLargeWeb ? <View style={{ height: 250 }} /> : null}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  wrapper: {
    width: '100%',
    backgroundColor: 'white',
    paddingTop: 16,
    minHeight: 700,
  },
  formContainer: {
    width: '90%',
    maxWidth: 600,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 24,
    backgroundColor: 'white',
    paddingBottom: 80,
  },
  timeContainer: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: 700,
    width: '100%',
    gap: 10,
  },
  timeInput: { flex: 1, maxWidth: 340, width: '50%' },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    maxWidth: 600,
    gap: 8,
  },
  button: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    padding: 10,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: '100%',
    maxWidth: 270,
  },
  buttonSecondary: {
    alignItems: 'center',
    backgroundColor: theme.colors.buttonSecondary,
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
  text: {
    fontSize: 14,
    color: theme.colors.primary,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 8,
    paddingHorizontal: 16,
    marginBottom: 32,
    backgroundColor: theme.colors.formFlowSecondary,
    borderRadius: 8,
    overflow: 'hidden',
  },
})

export default AddJobForm
