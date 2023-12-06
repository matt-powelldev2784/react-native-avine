import React, { useState } from 'react'
import {
  TouchableOpacity,
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
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../screens/stackNavigator/StackNavigator'
import theme from '../../../utils/theme/theme'
import { useFetchJobs } from './hooks/useFetchJobs'

const AddRoundForm = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const [activeStep, setActiveStep] = useState(0)
  const userJobs = useFetchJobs()
  const formik = useFormikSteps(activeStep)
  const { moveToNextStep } = useMoveToNextStep({ formik, setActiveStep })

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
              options={[
                { label: 'Daily', value: 'Daily' },
                { label: 'Weekly', value: 'Weekly' },
                { label: 'Monthly', value: 'Monthly' },
                { label: '2 Monthly', value: '2 Monthly' },
                { label: '3 Monthly', value: '3 Monthly' },
              ]}
              imageName={'calender'}
            />
          </>
        ) : null}

        {/*********************  Step 2 ***************************/}
        {activeStep === 1 ? (
          <>
            <Text style={styles.addJobText}>
              Add jobs to{' '}
              <span style={{ fontWeight: 'bold' }}>
                {formik.values.roundName}
              </span>{' '}
              round or click skip this step to add jobs later. You can select a
              single job or multiple jobs using the drop down menu.
            </Text>
            <MultiSelectDropdown
              formik={formik}
              name="jobs"
              placeholder="Select jobs to add..."
              title="Add job"
              options={userJobs}
              imageName={'wiper'}
            />
          </>
        ) : null}

        <View style={styles.buttonContainer}>
          {activeStep < 1 ? (
            <>
              <TouchableOpacity onPress={moveToNextStep} style={styles.button}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </>
          ) : null}

          {activeStep === 1 ? (
            <TouchableOpacity
              onPress={() => {
                formik.handleSubmit()
                if (formik.isValid) {
                  navigation.navigate('Rounds', { refresh: true })
                }
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Add Round</Text>
            </TouchableOpacity>
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
    flexDirection: 'row',
    maxWidth: 600,
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
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  addJobText: {
    fontSize: 16,
    color: theme.colors.primary,
    marginBottom: 32,
  },
})

export default AddRoundForm
