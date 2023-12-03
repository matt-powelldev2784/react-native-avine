import { View, ActivityIndicator, Text } from 'react-native'
import React from 'react'
import theme from '../../utils/theme/theme'

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
        color={theme.colors.primary}
      />
      <Text style={{ color: theme.colors.primary, fontWeight: 'bold' }}>
        {loadingText}
      </Text>
    </View>
  )
}

export default Loading
