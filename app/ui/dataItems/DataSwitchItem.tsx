import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import theme from '../../utils/theme/theme'
import { CustomSwitch } from '..'
import { FormikProps } from 'formik'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDeviceType } from '../../utils/hooks/useDeviceTypes'
import { usePlannerContext } from '../../screens/planner/plannerContext/usePlannerContext'

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
  const { plannerCardNeedsUpdate } = usePlannerContext()

  //hooks
  const { isLargeWeb } = useDeviceType()
  useEffect(() => {
    if (plannerCardNeedsUpdate) {
      setDisplayInfoText(false)
    }
  }, [plannerCardNeedsUpdate])

  //functions
  const handleInfoPress = () => {
    setDisplayInfoText(true)
  }
  const handleToggle = () => {
    setDisplayInfoText(false)
    if (error) handleInfoPress()
    if (isLoading) return

    formik.handleSubmit()
  }

  //variables
  const errorTextSize = isLargeWeb ? { fontSize: 14 } : { fontSize: 12 }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          {!displayInfoText ? (
            <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
              {name}
            </Text>
          ) : null}

          {!displayInfoText ? (
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

        {displayInfoText && error ? (
          <View style={[styles.errorContainer]}>
            <Image
              source={require('../../../assets/exclaimation.png')}
              style={{ width: 30, height: 30 }}
            />
            <Text style={[styles.errorText, errorTextSize]}>{error}</Text>
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
    color: theme.colors.primary,
    fontFamily: 'Roboto_700Bold',
  },
  errorContainer: {
    backgroundColor: theme.colors.backgroundGrey,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 8,
    paddingLeft: 8,
    width: '100%',
    height: 65,
  },
  errorText: {
    backgroundColor: theme.colors.backgroundGrey,
    textAlign: 'center',
    color: theme.colors.primary,
    paddingHorizontal: 4,
    fontFamily: 'Roboto_400Regular',
  },
})

export default DataSwitchItem
