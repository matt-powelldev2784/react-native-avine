import React, { useState } from 'react'
import { StyleSheet, View, ScrollView, Platform, Text } from 'react-native'
import useFormikSteps from './hooks/useFormikSteps'
import InputField from '../../../ui/formElements/InputField'
import Dropdown from '../../../ui/formElements/DropDown'
import FormFlowTitles from './components/FormFlowTitles'
import { useMoveToNextStep } from './hooks/useMoveToNextStep'
import { useRoute } from '@react-navigation/native'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../../../screens/stackNavigator/StackNavigator'
import theme from '../../../utils/theme/theme'
import { freqencyArray } from '../../../utils/freqencyArray'
import { useDeviceType } from '../../../utils/deviceTypes'
import Button from '../../../ui/button/Button'
import { handleFormStepBack } from '../../../utils/handleFormStepBack'
import { CustomSwitch, Loading } from '../../../ui'
import { useGetClientOptions } from './hooks/useFetchClients'

type EditJobFormRouteProp = RouteProp<RootStackParamList, 'EditJob'>

const EditJobForm = () => {
  //state
  const [activeStep, setActiveStep] = useState(0)
  const [toggleCopyClient, setToggleCopyClient] = useState(false)

  //hooks
  const route = useRoute<EditJobFormRouteProp>()
  const jobId = route?.params?.jobId ? route?.params?.jobId : ''
  const clientList = useGetClientOptions()
  const { isLargeWeb } = useDeviceType()
  const { formik, getApiIsLoading, postApiIsLoading } = useFormikSteps({
    activeStep,
    jobId,
  })
  const { moveToNextStep } = useMoveToNextStep({
    formik,
    activeStep,
    setActiveStep,
    toggleCopyClient,
  })

  //functions
  const handleToggleCopyClient = async () => {
    setToggleCopyClient(!toggleCopyClient)
  }
  const handleStepBack = () => {
    handleFormStepBack({ setActiveStep, activeStep })
  }
  const handleSumbit = () => {
    formik.handleSubmit()
  }

  //variables
  const buttonsStyle = isLargeWeb ? 'row' : 'column'

  if (getApiIsLoading) {
    return <Loading loadingText={'Loading job data...'} />
  }

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
              <Text style={styles.text}>Copy contact details from client</Text>
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
              keyboardType={'phone-pad'}
              imageName={'tel'}
            />
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
              keyboardType={Platform.OS === 'web' ? 'default' : 'numeric'}
              imageName={'clock'}
            />
            <InputField
              formik={formik}
              name="price"
              placeholder="Price"
              title="Price"
              keyboardType={Platform.OS === 'web' ? 'default' : 'numeric'}
              imageName={'poundSign'}
            />
            <Dropdown
              formik={formik}
              name="frequency"
              placeholder="Cleaning Frequency"
              title="Cleaning Frequency"
              options={freqencyArray}
              imageName={'calender'}
            />
            <InputField
              formik={formik}
              name="notes"
              placeholder="Notes"
              title="Notes"
              imageName={'notes'}
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
                text={'Go Back'}
                backgroundColor={theme.colors.buttonSecondary}
              />
            ) : null}

            {activeStep >= 0 && activeStep < 2 ? (
              <Button onPress={moveToNextStep} text={'Next'} />
            ) : null}

            {activeStep === 2 ? (
              <Button
                onPress={handleSumbit}
                text={'Update Job'}
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

export default EditJobForm
