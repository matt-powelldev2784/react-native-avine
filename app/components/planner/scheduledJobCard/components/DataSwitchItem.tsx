import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import theme from '../../../../utils/theme/theme'
import { CustomSwitch } from '../../../../ui'
import { FormikProps } from 'formik'
import { TouchableOpacity } from 'react-native-gesture-handler'

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
  // state
  const [displayInfoText, setDisplayInfoText] = useState(false)

  //functions
  const handleInfoPress = () => {
    setDisplayInfoText(true)
    setTimeout(() => {
      setDisplayInfoText(false)
    }, 8000)
  }

  const handleToggle = () => {
    if (error) {
      handleInfoPress()
    }
    formik.handleSubmit()
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
            {name}
          </Text>

          {error ? (
            <TouchableOpacity onPress={handleInfoPress}>
              <Image
                source={require('../../../../../assets/info.png')}
                style={{ width: 15, height: 15 }}
              />
            </TouchableOpacity>
          ) : null}

          {displayInfoText ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : null}
        </View>

        <View style={styles.rightContainer}>
          {isLoading ? (
            <ActivityIndicator size="small" color={theme.colors.primary} />
          ) : null}

          <CustomSwitch
            value={value}
            disabled={isLoading}
            onValueChange={handleToggle}
          />
        </View>
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
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  errorText: {
    position: 'absolute',
    backgroundColor: theme.colors.backgroundGrey,
    textAlign: 'center',
    fontSize: 10,
    padding: 4,
    borderRadius: 4,
  },
  line: {
    height: 1,
    backgroundColor: theme.colors.primary,
  },
})

export default DataSwitchItem
