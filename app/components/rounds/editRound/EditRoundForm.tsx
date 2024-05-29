import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native'
import useFormikSteps from './hooks/useFormikSteps'
import InputField from '../../../ui/formElements/InputField'
import Dropdown from '../../../ui/formElements/DropDown'
import MultiSelectDropdown from '../../../ui/formElements/MultiSelectDropDown'
import FormFlowTitles from './components/FormFlowTitles'
import { useMoveToNextStep } from './hooks/useMoveToNextStep'
import { RootStackParamList } from '../../../screens/stackNavigator/StackNavigator'
import theme from '../../../utils/theme/theme'
import { useFetchJobs } from '../utils/useFetchJobs'
import { useDeviceType } from '../../../utils/hooks/useDeviceTypes'
import { useFormResetOnBlur } from '../../../utils/useFormResetOnBlur'
import { useRoute } from '@react-navigation/native'
import { RouteProp } from '@react-navigation/native'
import { freqencyArray } from '../../../utils/freqencyArray'
import Button from '../../../ui/button/Button'
import { handleFormStepBack } from '../../../utils/handleFormStepBack'
import { Loading } from '../../../ui'
import OrderJobsList from '../orderedJobs/OrderJobsList'

type EditRoundFormRouteProp = RouteProp<RootStackParamList, 'EditRound'>

const EditRoundForm = () => {
  // state
  const [activeStep, setActiveStep] = useState(0)

  //hooks
  const userJobs = useFetchJobs()
  const route = useRoute<EditRoundFormRouteProp>()
  const roundId = route?.params?.roundId ? route?.params?.roundId : ''
  const { formik, getApiIsLoading, postApiIsLoading } = useFormikSteps({
    activeStep,
    roundId,
  })
  const { moveToNextStep } = useMoveToNextStep({
    formik,
    activeStep,
    setActiveStep,
  })
  const { isLargeWeb } = useDeviceType()
  useFormResetOnBlur(formik, setActiveStep)

  //functions
  const handleSumbmitPress = () => {
    formik.handleSubmit()
  }
  const handleStepBack = () => {
    handleFormStepBack({ setActiveStep, activeStep })
  }

  //variables
  const buttonsStyle = isLargeWeb ? 'row' : 'column'

  if (getApiIsLoading) {
    return <Loading loadingText={'Loading round data...'} />
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
            <InputField
              formik={formik}
              name="roundName"
              placeholder="Round Name"
              title="Round Name"
              imageName={'round'}
            />
            <Dropdown
              formik={formik}
              name="frequency"
              placeholder="Round Frequency"
              title="Round Frequency"
              options={freqencyArray}
              imageName={'calender'}
            />
            <InputField
              formik={formik}
              name="location"
              placeholder="Location"
              title="Location"
              imageName={'location'}
            />
          </>
        ) : null}

        {/*********************  Step 2 ***************************/}
        {activeStep === 1 ? (
          <>
            <Text style={styles.addJobText}>
              Add or remove jobs from
              <Text style={{ fontWeight: 'bold' }}>
                &nbsp;{formik.values.roundName}&nbsp;
              </Text>
              round by using drop down menu to select or deselect jobs.
            </Text>
            <MultiSelectDropdown
              formik={formik}
              name="relatedJobs"
              placeholder="Select jobs to add or remove..."
              title="Add job"
              options={userJobs}
              imageName={'wiper'}
              confirmUnqiueFiveDigitsPrefixAddedtoValue={true}
            />
          </>
        ) : null}

        {/*********************  Step 3 ***************************/}
        {activeStep === 2 ? (
          <View style={styles.orderJobs}>
            <Text style={styles.addJobText}>
              Customise the job order for
              <Text style={styles.textBold}>
                &nbsp;{formik.values.roundName}&nbsp;
              </Text>
              round by clicking on each job in the list and dragging up or down
              to reorder.
            </Text>

            <OrderJobsList
              relatedJobs={formik.values.relatedJobs || []}
              userJobs={userJobs}
              formik={formik}
            />
          </View>
        ) : null}

        {/*********************  Buttons  ***************************/}
        <View style={styles.buttonContainer}>
          {activeStep < 1 ? (
            <Button onPress={moveToNextStep} text={'Next'} />
          ) : null}

          {activeStep > 0 && activeStep < 2 ? (
            <View
              style={[styles.buttonContainer, { flexDirection: buttonsStyle }]}
            >
              <Button
                onPress={handleStepBack}
                text="Go Back"
                backgroundColor={theme.colors.buttonSecondary}
              />

              <Button onPress={moveToNextStep} text={'Next'} />
            </View>
          ) : null}

          {activeStep > 1 ? (
            <View
              style={[styles.buttonContainer, { flexDirection: buttonsStyle }]}
            >
              <Button
                onPress={handleStepBack}
                text="Go Back"
                backgroundColor={theme.colors.buttonSecondary}
              />

              <Button
                onPress={handleSumbmitPress}
                text="Update Round"
                isLoading={postApiIsLoading}
              />
            </View>
          ) : null}
        </View>
      </View>
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
  addJobText: {
    fontSize: 16,
    color: theme.colors.primary,
    marginBottom: 32,
    textAlign: 'center',
  },
  textBold: {
    fontSize: 16,
    color: theme.colors.primary,
    marginBottom: 32,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  orderJobs: {
    width: '100%',
    marginBottom: 32,
  },
})

export default EditRoundForm
