import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  ViewStyle,
} from 'react-native'
import React, { useState } from 'react'
import theme from '../../utils/theme/theme'
import { CustomSwitch } from '..'
import { FormikProps } from 'formik'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDeviceType } from '../../utils/hooks/useDeviceTypes'

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

  //hooks
  const { isLargeWeb } = useDeviceType()

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

  //variables
  const errorContainerStyle: ViewStyle = isLargeWeb
    ? { width: '100%' }
    : { width: '100%' }
  const errorTextStyle = isLargeWeb ? { fontSize: 14 } : { fontSize: 14 }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          {!displayInfoText ? (
            <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
              {name}
            </Text>
          ) : null}

          {error && !displayInfoText ? (
            <TouchableOpacity onPress={handleInfoPress}>
              <Image
                source={require('../../../assets/info.png')}
                style={{ width: 15, height: 15 }}
              />
            </TouchableOpacity>
          ) : null}
        </View>

        <View style={styles.rightContainer}>
          {isLoading ? (
            <ActivityIndicator size="small" color={theme.colors.primary} />
          ) : null}

          {!displayInfoText ? (
            <CustomSwitch
              value={value}
              disabled={isLoading}
              onValueChange={handleToggle}
            />
          ) : null}
        </View>

        {displayInfoText ? (
          <View style={[styles.errorContainer, errorContainerStyle]}>
            <Image
              source={require('../../../assets/exclaimation.png')}
              style={{ width: 30, height: 30 }}
            />
            <Text style={[styles.errorText, errorTextStyle]}>{error}</Text>
          </View>
        ) : null}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.backgroundGrey,
    borderRadius: 16,
    padding: 16,
    height: 65,
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
  errorContainer: {
    backgroundColor: theme.colors.backgroundGrey,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingRight: 16,
    paddingLeft: 16,
    width: '100%',
    height: 65,
  },
  errorText: {
    backgroundColor: theme.colors.backgroundGrey,
    textAlign: 'center',
    color: theme.colors.primary,
  },
})

export default DataSwitchItem
