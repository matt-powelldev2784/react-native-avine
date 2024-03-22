import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../screens/stackNavigator/StackNavigator'
import { useDeviceType } from '../../utils/deviceTypes'

interface ScreenMenuProps {
  title: string
  navigateTo?: keyof RootStackParamList
  navigateToProp?: any
  buttonText?: string
  bgColor: string
}

const ScreenMenu = ({
  title,
  navigateTo,
  navigateToProp,
  buttonText,
  bgColor,
}: ScreenMenuProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const { isLargeWeb } = useDeviceType()
  const handleNaviagteTo = () => {
    if (navigateTo) {
      navigation.navigate(navigateTo, navigateToProp)
    }
  }

  return (
    <View
      style={[
        isLargeWeb
          ? styles.menuContianerLargeWeb
          : styles.menuContianerSmallScreen,
        { backgroundColor: bgColor },
      ]}
    >
      <Text style={styles.pageTitle}>{title}</Text>

      {navigateTo ? (
        <TouchableOpacity style={styles.button} onPress={handleNaviagteTo}>
          <Image
            source={require('../../../assets/plus.png')}
            style={{ width: 13, height: 13 }}
          />
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  menuContianerSmallScreen: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingVertical: 8,
  },
  menuContianerLargeWeb: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 36,
    paddingVertical: 8,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 4,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'white',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  pageTitle: {
    fontSize: 20,
    color: 'white',
    marginTop: 2,
    marginBottom: 2,
    fontWeight: 'bold',
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
})

export default ScreenMenu
