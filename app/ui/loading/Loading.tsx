import { View, ActivityIndicator, Text } from 'react-native'
import React from 'react'

interface LoadingProps {
  loadingText: string
}

const Loading = ({ loadingText }: LoadingProps) => {
  return (
    <View>
      <ActivityIndicator
        style={{
          marginTop: 32,
          marginBottom: 16,
        }}
        size="large"
        color="#337bae"
      />
      <Text style={{ color: '#337bae', fontWeight: 'bold' }}>
        {loadingText}
      </Text>
    </View>
  )
}

export default Loading
