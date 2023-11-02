import { View, Text, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { Image } from 'react-native'
import logo from '../assets/planme_logo_white.png'

const HomeScreen = () => {
  return (
    <SafeAreaView className="w-full h-full bg-primaryBlue">
      <View className="flex-1 items-center p-4 bg-primaryBlue">
        {Platform.OS === 'web' ? (
          <Image source={{ uri: logo }} style={{ width: 300, height: 74 }} />
        ) : (
          <Image source={require('../assets/planme_logo_white.png')} />
        )}

        <Text className="bg-primaryBlue">HomeScreen1</Text>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen
