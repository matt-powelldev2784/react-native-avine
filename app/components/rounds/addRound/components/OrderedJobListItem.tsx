import { View, Text, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface OrderedJobListItemProps {
  item: { label: string; value: string }
  drag: () => void
  isActive: boolean
}

const OrderedJobListItem = ({
  item,
  drag,
  isActive,
}: OrderedJobListItemProps) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'red',
      }}
    >
      <TouchableOpacity onPressIn={drag}>
        <Image source={require('../../../../../assets/bin.png')} />
      </TouchableOpacity>

      <Text
        style={{
          height: 50,
          backgroundColor: isActive ? 'blue' : 'white',
          alignItems: 'center',
          justifyContent: 'center',
          borderColor: 'black',
          borderWidth: 1,
        }}
        onPress={drag}
      >
        {item.value}
      </Text>
    </View>
  )
}

export default OrderedJobListItem
