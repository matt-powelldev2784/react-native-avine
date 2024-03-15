import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import theme from '../../../../../../utils/theme/theme'
import { CustomSwitch } from '../../../../../../ui'
import { FormikProps } from 'formik'

interface DataSwitchProps {
  name: string
  value: boolean
  isLoading: boolean
  formik: FormikProps<any>
}

const DataSwitchItem = ({
  name,
  value,
  isLoading,
  formik,
}: DataSwitchProps) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
          {name}
        </Text>
        <CustomSwitch
          value={value}
          disabled={isLoading}
          onValueChange={() => {
            formik.handleSubmit()
          }}
        />
      </View>
      <View style={styles.line} />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  line: {
    height: 1,
    backgroundColor: theme.colors.primary,
  },
})

export default DataSwitchItem
