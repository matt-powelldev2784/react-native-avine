import { View, StyleSheet } from 'react-native'
import React from 'react'
import Dropdown from '../../../../ui/formElements/DropDown'
import { FormikProps } from 'formik'
import { useGetRoundOptions } from '../hooks/useGetRoundOptions'

interface FromSteptThreeProps {
  formik: FormikProps<any>
}

const FormStepOne = ({ formik }: FromSteptThreeProps) => {
  const userRounds = useGetRoundOptions()

  return (
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
  )
}

const styles = StyleSheet.create({
  dropdownContainer: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 24,
    backgroundColor: 'white',
    maxWidth: 600,
  },
})

export default FormStepOne
