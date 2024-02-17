import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
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
import { getFrequencyOptions } from './utils/getFrequencyOptions'

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
  const frequencyOptions = getFrequencyOptions(selectedRound)

  const editRound = () => {
    navigation.navigate('EditRound', {
      roundId: formik.values.roundId,
    })
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>
          Select one off clean or recurring round.
        </Text>

        <Text onPress={editRound} style={styles.text}>
          If you wish to change the frequency of the recurring round,
          <Text onPress={editRound} style={styles.textBold}>
            &nbsp;click here&nbsp;
          </Text>
          to edit the {selectedRound?.roundName} round.
        </Text>

        <Text style={styles.text}>Then return to the planner.</Text>
      </View>

      <View style={styles.dropdownContainer}>
        <Dropdown
          formik={formik}
          name="recurring"
          placeholder="Select One off clean or Recurring Round?"
          title="One off clean or Recurring Round?"
          options={frequencyOptions}
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
  container: {
    paddingHorizontal: 8,
  },
  dropdownContainer: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 24,
    backgroundColor: 'white',
    maxWidth: 600,
  },
  text: {
    fontSize: 15,
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: 2,
  },
  textBold: {
    fontSize: 15,
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: 2,
    fontWeight: 'bold',
  },
})

export default FormStepTwo
