import { View, Text } from 'react-native'
import React from 'react'

interface ClientCardProps {
  clientId: string
}

const ClientCard = ({ clientId }: ClientCardProps) => {
  console.log('clientId', clientId)

  return (
    <View>
      <Text>ClientCard</Text>
    </View>
  )
}

export default ClientCard
