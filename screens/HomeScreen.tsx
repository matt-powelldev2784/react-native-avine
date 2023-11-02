import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'

const HomeScreen = () => {
  return (
    <SafeAreaView className="w-full h-full">
      <View className="flex-1 items-center justify-center">
        <Text className="bg-red-500">HomeScreen1</Text>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen
