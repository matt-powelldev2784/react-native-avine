import { Text, Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import theme from '../../../utils/theme/theme'

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
  const bgGrey = theme.colors.formFlowSecondary

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isActive ? '#e0e0e0' : bgGrey,
        },
      ]}
    >
      <TouchableOpacity onPressIn={drag} style={styles.button}>
        <Image
          source={require('../../../../assets/drag_grey.png')}
          style={styles.image}
        />

        <Text
          style={[styles.text]}
          onPress={drag}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.value}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default OrderedJobListItem

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.formFlowSecondary,
    borderRadius: 8,
    margin: 2,
    padding: 4,
  },
  button: {
    width: 300,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    poiner: 'grab',
    margin: 2,
    padding: 4,
  },
  image: {
    width: 19,
    height: 31,
  },
  text: {
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
})
