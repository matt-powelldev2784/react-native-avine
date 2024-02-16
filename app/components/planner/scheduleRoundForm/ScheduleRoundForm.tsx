import React, { useEffect, useState } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import useFormikSteps from './hooks/useFormikSteps'
import Dropdown from '../../../ui/formElements/DropDown'
import FormFlowTitles from './components/FormFlowTitles'
import theme from '../../../utils/theme/theme'
import { useFetchRounds } from './hooks/useFetchRounds'
import { formatDateForDb } from '../../../utils/formatDateForDb'
import { useFormResetOnBlur } from '../../../utils/useFormResetOnBlur'
import FormButtons from './components/FormButtons'
import FormStepThree from './components/FormStepThree'
import FormStepTwo from './components/FormStepTwo'

const ScheduleRoundForm = () => {
  const [activeStep, setActiveStep] = useState(1)
  const [recurringRoundExistsMessage, setRecurringRoundExistsMessage] =
    useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const userRounds = useFetchRounds()
  const formik = useFormikSteps({ activeStep, setIsLoading })
  useFormResetOnBlur(formik, setActiveStep)

  useEffect(() => {
    if (formik.values.date === '') {
      formik.setFieldValue('date', formatDateForDb(new Date()))
    }
  }, [formik])

  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      style={styles.wrapper}
    >
      <FormFlowTitles activeStep={activeStep} />

      <View style={styles.formContainer}>
        {/*********************  Step 1 Select Round ***************************/}
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

        {/********************* Step 2 Select Round Frequency ***************************/}
        {activeStep === 1 ? (
          <FormStepTwo
            setRecurringRoundExistsMessage={setRecurringRoundExistsMessage}
            recurringRoundExistsMessage={recurringRoundExistsMessage}
            setActiveStep={setActiveStep}
            formik={formik}
          />
        ) : null}

        {/********************* Step 3 Week Planner ***************************/}
        {activeStep === 2 ? <FormStepThree /> : null}

        {/*********************  Buttons  ***************************/}
        <FormButtons
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          isLoading={isLoading}
          formik={formik}
          setRecurringRoundExistsMessage={setRecurringRoundExistsMessage}
        />
      </View>

      <View style={styles.footer} />
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
  scheduleRoundInfo: {
    fontSize: 15,
    color: theme.colors.primary,
    marginBottom: 10,
    textAlign: 'center',
    paddingHorizontal: 8,
    flex: 1,
  },
  scheduleRoundInfoText: {
    fontSize: 15,
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: 2,
  },
  scheduleRoundInfoTextBold: {
    fontSize: 15,
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: 2,
    fontWeight: 'bold',
  },
  scheduleRoundInfoTextRed: {
    fontSize: 15,
    color: 'red',
    textAlign: 'center',
    marginBottom: 2,
    fontWeight: 'bold',
  },
  weekPlannerWrapper: {
    width: '100%',
    paddingBottom: 24,
  },
  addJobText: {
    fontSize: 16,
    color: theme.colors.primary,
    marginBottom: 32,
    textAlign: 'center',
  },
  footer: { height: 70 },
})

export default ScheduleRoundForm
