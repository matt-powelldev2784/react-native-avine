import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import useFormikSteps from './hooks/useFormikSteps'
import InputField from '../../../ui/formElements/InputField'
import Dropdown from '../../../ui/formElements/DropDown'
import MultiSelectDropdown from '../../../ui/formElements/MultiSelectDropDown'
import FormFlowTitles from './components/FormFlowTitles'
import { useMoveToNextStep } from './hooks/useMoveToNextStep'
import theme from '../../../utils/theme/theme'
import { useFetchJobs } from '../utils/useFetchJobs'
import { useDeviceType } from '../../../utils/deviceTypes'
import { useFormResetOnBlur } from '../../../utils/useFormResetOnBlur'
import { freqencyArray } from '../../../utils/freqencyArray'
import Button from '../../../ui/button/Button'
import { handleFormStepBack } from '../../../utils/handleFormStepBack'
import DraggableFlatList from 'react-native-draggable-flatlist'
import { TouchableOpacity } from 'react-native-gesture-handler'

const AddRoundForm = () => {
  // state
  const [activeStep, setActiveStep] = useState(1)
  const [orderedJobs, setOrderedJobs] = useState<string>([])

  // hooks
  const userJobs = useFetchJobs()
  const { formik, postApiIsLoading } = useFormikSteps({ activeStep })
  const { moveToNextStep } = useMoveToNextStep({ formik, setActiveStep })
  const { isLargeWeb } = useDeviceType()
  useFormResetOnBlur(formik, setActiveStep)
  useEffect(() => {
    const jobs = formik.values.relatedJobs
    setOrderedJobs(jobs)
  }, [formik.values.relatedJobs])

  // functions
  const handleStepBack = () => {
    handleFormStepBack({ setActiveStep, activeStep })
  }
  const handleSumbmitPress = () => {
    formik.handleSubmit()
  }

  // variables
  const buttonsStyle = isLargeWeb ? 'row' : 'column'

  const renderItem = ({ item, index, drag, isActive }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: 'red',
        }}
      >
        <TouchableOpacity onPressIn={drag}>
          <Image source={require('../../../../assets/bin.png')} />
        </TouchableOpacity>

        <Text
          style={{
            height: 50,
            // backgroundColor: isActive ? 'blue' : 'white',
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: 'black',
            borderWidth: 1,
          }}
          onPress={drag}
        >
          {item}
          AAAAA
        </Text>
      </View>
    )
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
            <InputField
              formik={formik}
              name="location"
              placeholder="Location"
              title="Location"
              imageName={'location'}
            />
            <Dropdown
              formik={formik}
              name="frequency"
              placeholder="Round Frequency"
              title="Round Frequency"
              options={freqencyArray}
              imageName={'calender'}
            />
          </>
        ) : null}

        {/*********************  Step 2 ***************************/}
        {activeStep === 1 ? (
          <>
            <Text style={styles.addJobText}>
              Add jobs to
              <Text style={{ fontWeight: 'bold' }}>
                &nbsp;{formik.values.roundName}&nbsp;
              </Text>
              round by using drop down menu to select a single or multiple jobs.
              You can skip this step by clicking &quot;Add Round&quot; and add
              your jobs later.
            </Text>
            <MultiSelectDropdown
              formik={formik}
              name="relatedJobs"
              placeholder="Select jobs to add..."
              title="Add job"
              options={userJobs}
              imageName={'wiper'}
              confirmUnqiueFiveDigitsPrefixAddedtoValue={true}
            />

            <View style={{ flex: 1 }}>
              <DraggableFlatList
                data={orderedJobs}
                renderItem={renderItem}
                keyExtractor={(item, index) => `draggable-item-${index}`}
                onDragEnd={({ data }) => setOrderedJobs(data)}
              />
            </View>
          </>
        ) : null}

        <View style={styles.buttonContainer}>
          {activeStep < 1 ? (
            <Button onPress={moveToNextStep} text={'Next'} />
          ) : null}

          {activeStep === 1 ? (
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
                text="Add Round"
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
})

export default AddRoundForm
