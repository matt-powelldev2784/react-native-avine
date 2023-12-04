import React, { useEffect, useState } from 'react'
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
import FormFlowTitles from './components/FormFlowTitles'
import { useMoveToNextStep } from './hooks/useMoveToNextStep'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../screens/stackNavigator/StackNavigator'
import theme from '../../../utils/theme/theme'
import { getUserJobsFromDb } from '../../../db/jobs/getUserJobsFromDb'

interface JobOption {
  label: string
  value: string
}

const AddRoundForm = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const [activeStep, setActiveStep] = useState(0)
  const [userJobs, setUserJobs] = useState<JobOption[]>([])
  const formik = useFormikSteps(activeStep)
  const { moveToNextStep } = useMoveToNextStep({ formik, setActiveStep })

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserJobsFromDb()
      const jobOptions = data?.map((job) => ({
        label: job.jobName,
        value: job.id,
      }))
      if (jobOptions) {
        setUserJobs(jobOptions)
      }
    }

    fetchData()
  }, [])

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
            <Dropdown
              formik={formik}
              name="Add Job"
              placeholder="Select job to add..."
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
                  navigation.navigate('Jobs', { refresh: true })
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
})

export default AddRoundForm
