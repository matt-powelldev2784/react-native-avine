import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import theme from '../../../../../../utils/theme/theme'
import { CustomSwitch } from '../../../../../../ui'
import { FormikProps } from 'formik'

interface DataSwitchProps {
  name: string
  value: boolean
  isLoading: boolean
  formik: FormikProps<any>
  error: string | boolean
}

const DataSwitchItem = ({
  name,
  value,
  isLoading,
  formik,
  error,
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

      {error ? (
        <View style={styles.errorContainer}>
          <Image
            source={require('../../../../../../../assets/info.png')}
            style={{ width: 15, height: 15 }}
          />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

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
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginBottom: 16,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 10,
  },
  line: {
    height: 1,
    backgroundColor: theme.colors.primary,
  },
})

export default DataSwitchItem
