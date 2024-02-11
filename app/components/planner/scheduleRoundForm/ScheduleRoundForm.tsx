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
import { useFormResetOnBlur } from '../../../utils/useFormResetOnBlur'
import { freqencyArray } from '../../../utils/freqencyArray'
import { useGetRoundById } from './hooks/useGetRoundById'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../screens/stackNavigator/StackNavigator'

const ScheduleRoundForm = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const [activeStep, setActiveStep] = useState(0)
  const userRounds = useFetchRounds()
  const formik = useFormikSteps(activeStep)
  const moveToNextStep = useMoveToNextStep({
    formik,
    setActiveStep,
    activeStep,
  })
  const { isLargeWeb } = useDeviceType()
  useFormResetOnBlur(formik, setActiveStep)
  const selectedRound = useGetRoundById(formik.values.roundId)
  const frequencyLabel = freqencyArray.find(
    (item) => item.value === selectedRound?.frequency,
  )?.label
  const editRound = () => {
    navigation.navigate('EditRound', {
      roundId: formik.values.roundId,
    })
  }

  console.log('userRounds', userRounds)

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
          <>
            <View style={styles.scheduleRoundInfo}>
              <Text style={styles.scheduleRoundInfoText}>
                <Text style={{ fontWeight: 'bold' }}>
                  The {selectedRound?.roundName}&nbsp;
                </Text>
                <Text>round is set to be scheduled&nbsp;</Text>
                <Text style={styles.scheduleRoundInfoTextBold}>
                  {frequencyLabel}.
                </Text>
              </Text>

              <Text style={styles.scheduleRoundInfoText}>
                Select &apos;Yes&apos; you want the round to reoccur{' '}
                <Text style={styles.scheduleRoundInfoTextBold}>
                  {frequencyLabel}.
                </Text>
              </Text>

              <Text style={styles.scheduleRoundInfoText}>
                Select &apos;No&apos; to schedule the round as a&nbsp;
                <Text style={styles.scheduleRoundInfoTextBold}>one off.</Text>
              </Text>

              <Text style={styles.scheduleRoundInfoText}>
                If you wish to change the frequency of the round, click
                <Text
                  onPress={editRound}
                  style={styles.scheduleRoundInfoTextBold}
                >
                  &nbsp;here&nbsp;
                </Text>
                to edit the round.
              </Text>

              <Text style={styles.scheduleRoundInfoText}>
                Then return to the planner.
              </Text>
            </View>

            <View style={styles.dropdownContainer}>
              <Dropdown
                formik={formik}
                name="recurring"
                placeholder="Select If Round Is Recurring"
                title="Add Recurring Round To Planner?"
                options={[
                  {
                    label: `Yes - set ${selectedRound?.roundName} to reoccur ${frequencyLabel}`,
                    value: true,
                  },
                  { label: 'No - set as one off clean', value: false },
                ]}
                imageName={'round'}
              />
            </View>
          </>
        ) : null}

        {/********************* Step 3 Week Planner ***************************/}
        {activeStep === 2 ? (
          <>
            <View style={styles.scheduleRoundInfo}>
              <Text style={styles.scheduleRoundInfoText}>
                Select the date you wish to add the round and click &quot;Add
                Round To Planner&quot; button at the bottom.
              </Text>
              <Text style={styles.scheduleRoundInfoText}>
                The rounds currenty booked on the date displayed will be shown
                below
              </Text>
            </View>

            <View style={styles.weekPlannerWrapper}>
              <WeekPlanner addFooter={false} />
            </View>
          </>
        ) : null}

        {/*********************  Buttons  ***************************/}
        <View style={styles.buttonContainer}>
          {activeStep < 2 ? (
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
              <TouchableOpacity onPress={moveToNextStep} style={styles.button}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </View>
          ) : null}

          {activeStep === 2 ? (
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
                onPress={() => {
                  formik.handleSubmit()
                }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Add Round To Planner</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
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
  footer: { height: 70 },
})

export default ScheduleRoundForm
