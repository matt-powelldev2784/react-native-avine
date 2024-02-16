import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import useFormikSteps from './hooks/useFormikSteps'
import Dropdown from '../../../ui/formElements/DropDown'
import FormFlowTitles from './components/FormFlowTitles'
import theme from '../../../utils/theme/theme'
import { useFetchRounds } from './hooks/useFetchRounds'
import WeekPlanner from '../weekPlanner/WeekPlanner'
import { formatDateForDb } from '../../../utils/formatDateForDb'
import { useFormResetOnBlur } from '../../../utils/useFormResetOnBlur'
import { freqencyArray } from '../../../utils/freqencyArray'
import { useGetRoundById } from './hooks/useGetRoundById'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../screens/stackNavigator/StackNavigator'
import { ConfirmModal } from '../../../ui'
import FormButtons from './components/FormButtons'

const ScheduleRoundForm = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const [activeStep, setActiveStep] = useState(0)
  const [recurringRoundExistsMessage, setRecurringRoundExistsMessage] =
    useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const userRounds = useFetchRounds()
  const formik = useFormikSteps({ activeStep, setIsLoading })

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
          <>
            <View style={styles.scheduleRoundInfo}>
              {recurringRoundExistsMessage ? (
                <ConfirmModal
                  modalText={`A recurring round already exists for ${selectedRound?.roundName}. You may only have one set of recurring entries per round.`}
                  modalText2={`The current recurring round entries for ${selectedRound?.roundName} will be over written!`}
                  modalText3={'Do you wish to continue?'}
                  onConfirm={() => {
                    setRecurringRoundExistsMessage(false)
                    setActiveStep((prev) => prev + 1)
                  }}
                  onCancel={() => {
                    setRecurringRoundExistsMessage(false)
                  }}
                  cancelButtonText={'Cancel'}
                  confirmButtonText={'Yes'}
                  visible={true}
                />
              ) : null}

              <Text style={styles.scheduleRoundInfoText}>
                Select one off clean or recurring round.
              </Text>

              <Text style={styles.scheduleRoundInfoText}>
                If you wish to change the frequency of the recurring round,
                click
                <Text
                  onPress={editRound}
                  style={styles.scheduleRoundInfoTextBold}
                >
                  &nbsp;here&nbsp;
                </Text>
                <Text style={styles.scheduleRoundInfoText}>
                  to edit the {selectedRound?.roundName} round.
                </Text>
              </Text>

              <Text style={styles.scheduleRoundInfoText}>
                Then return to the planner.
              </Text>
            </View>

            <View style={styles.dropdownContainer}>
              <Dropdown
                formik={formik}
                name="recurring"
                placeholder="Select One off clean or Recurring Round?"
                title="One off clean or Recurring Round?"
                options={[
                  {
                    label: `${frequencyLabel} recurring round`,
                    value: true,
                  },
                  { label: 'One off clean', value: false },
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
                Select date and click &quot;Add Round To Planner&quot; button.
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
