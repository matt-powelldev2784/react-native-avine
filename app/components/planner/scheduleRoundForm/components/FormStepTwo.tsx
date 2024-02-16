import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { ConfirmModal } from '../../../../ui'
import { useGetRoundById } from '../hooks/useGetRoundById'
import Dropdown from '../../../../ui/formElements/DropDown'
import { freqencyArray } from '../../../../utils/freqencyArray'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../../screens/stackNavigator/StackNavigator'
import { FormikProps } from 'formik'
import theme from '../../../../utils/theme/theme'
import { RoundWithIdT } from '../../../../types/RoundT'

interface FormStepTwoProps {
  setRecurringRoundExistsMessage: React.Dispatch<React.SetStateAction<boolean>>
  recurringRoundExistsMessage: boolean
  setActiveStep: React.Dispatch<React.SetStateAction<number>>
  formik: FormikProps<any>
}

const FormStepTwo = ({
  setRecurringRoundExistsMessage,
  recurringRoundExistsMessage,
  setActiveStep,
  formik,
}: FormStepTwoProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const selectedRound = useGetRoundById(formik.values.roundId)

  const getFrequencyLabel = (round: RoundWithIdT | null) => {
    const roundFrequency = round?.frequency
    const matchingItem = freqencyArray.find(
      (item) => item.value === roundFrequency,
    )
    const frequencyLabel = matchingItem?.label
    return frequencyLabel
  }
  const frequencyLabel = getFrequencyLabel(selectedRound)

  const editRound = () => {
    navigation.navigate('EditRound', {
      roundId: formik.values.roundId,
    })
  }

  return (
    <>
      <View style={styles.scheduleRoundInfo}>
        <Text style={styles.scheduleRoundInfoText}>
          Select one off clean or recurring round.
        </Text>

        <Text style={styles.scheduleRoundInfoText}>
          If you wish to change the frequency of the recurring round, click
          <Text onPress={editRound} style={styles.scheduleRoundInfoTextBold}>
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

      {/****************** Modal to confirm the user wants to ovewrite existing recurring round ************************/}
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
    </>
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

export default FormStepTwo
