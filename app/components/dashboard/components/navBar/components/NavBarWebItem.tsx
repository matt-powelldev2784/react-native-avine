import { Text, StyleSheet, Image, ImageSourcePropType } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDeviceType } from '../../../../../utils/deviceTypes'

interface NavBarWebItemProps {
  routeFunction: () => void
  imageSource: ImageSourcePropType
  buttonText: string
}

const NavBarWebItem = ({
  routeFunction,
  imageSource,
  buttonText,
}: NavBarWebItemProps) => {
  const { isLargeWeb } = useDeviceType()

  const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4,
      width: isLargeWeb ? 75 : 60,
    },
    buttonText: {
      paddingTop: 2,
      color: 'white',
      fontSize: isLargeWeb ? 12 : 10,
    },
  })

  return (
    <TouchableOpacity style={styles.button} onPress={routeFunction}>
      <Image source={imageSource} style={{ width: 25, height: 25 }} />

      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  )
}

export default NavBarWebItem
