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
      flexDirection: isLargeWeb ? 'row' : 'column',
      gap: isLargeWeb ? 6 : 0,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4,
      width: isLargeWeb ? 'auto' : 60,
    },
    buttonText: {
      color: 'white',
      fontSize: isLargeWeb ? 15 : 10,
      fontFamily: 'Noto Sans',
    },
    image: {
      width: isLargeWeb ? 15 : 25,
      height: isLargeWeb ? 15 : 25,
    },
  })

  return (
    <TouchableOpacity style={styles.button} onPress={routeFunction}>
      <Image source={imageSource} style={styles.image} />

      <Text style={styles.buttonText}>{buttonText.toUpperCase()}</Text>
    </TouchableOpacity>
  )
}

export default NavBarWebItem
