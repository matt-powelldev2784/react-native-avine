import React, { useEffect, useState } from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native'
import useFormikSteps from './hooks/useFormikSteps'
import Dropdown from '../../../ui/formElements/DropDown'
import FormFlowTitles from './components/FormFlowTitles'
import { useMoveToNextStep } from './hooks/useMoveToNextStep'
import theme from '../../../utils/theme/theme'
import { useFetchRounds } from './hooks/useFetchRounds'
import { useDeviceType } from '../../../utils/deviceTypes'
import WeekPlanner from '../weekPlanner/WeekPlanner'
import { formatDateForDb } from '../../../utils/formatDateForDb'

const ScheduleRoundForm = () => {
  const [activeStep, setActiveStep] = useState(0)
  const userRounds = useFetchRounds()
  const formik = useFormikSteps(activeStep)
  const { moveToNextStep } = useMoveToNextStep({ formik, setActiveStep })
  const { isLargeWeb } = useDeviceType()
  //useFormResetOnBlur(formik, setActiveStep)

  useEffect(() => {
    if (formik.values.date === '') {
      formik.setFieldValue('date', formatDateForDb(new Date()))
    }
  }, [formik])

  const handleStepBack = () => {
    if (activeStep === 0) {
      return
    }
    setActiveStep((prev) => prev - 1)
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
          <View style={styles.dropdownContainer}>
            <Dropdown
              formik={formik}
              name="roundId"
              placeholder="Select Round To Schedule"
              title="Select Round"
              options={userRounds}
              imageName={'round'}
            />
          </View>
        ) : null}
        {/********************* Step 2 Week Planner ***************************/}
        {activeStep === 1 ? (
          <View style={styles.weekPlannerWrapper}>
            <WeekPlanner />
          </View>
        ) : null}
        {/*********************  Buttons  ***************************/}
        <View style={styles.buttonContainer}>
          {activeStep < 1 ? (
            <TouchableOpacity onPress={moveToNextStep} style={styles.button}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          ) : null}

          {activeStep === 1 ? (
            <View
              style={[
                styles.buttonContainer,
                isLargeWeb
                  ? { flexDirection: 'row' }
                  : { flexDirection: 'column' },
              ]}
            >
              <TouchableOpacity
                onPress={handleStepBack}
                style={styles.buttonSecondary}
              >
                <Text style={styles.buttonText}>Go Back</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={async () => {
                  if (formik.isValid) {
                    formik.handleSubmit()
                    console.log('submitted ---------------')
                  }
                }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Add Round To Planner</Text>
              </TouchableOpacity>
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
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 6,
    backgroundColor: 'white',
  },
  dropdownContainer: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 24,
    backgroundColor: 'white',
    maxWidth: 600,
  },
  weekPlannerWrapper: {
    width: '100%',
    paddingBottom: 24,
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    maxWidth: 600,
    gap: 8,
    marginBottom: 24,
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

export default ScheduleRoundForm
