import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import theme from '../../../../utils/theme/theme'
import { CustomSwitch } from '../../../../ui'

interface DataSwitchProps {
  name: string
  value: boolean
  onTogglePress: () => void
  infoText: string
}

const DataSwitchItem = ({
  name,
  value,
  onTogglePress,
  infoText,
}: DataSwitchProps) => {
  // state
  const [displayInfoText, setDisplayInfoText] = useState(false)

  //functions
  const handleInfoPress = () => {
    setDisplayInfoText(true)
    setTimeout(() => {
      setDisplayInfoText(false)
    }, 8000)
  }

  const handleToggle = () => {
    onTogglePress()
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
          {name}
        </Text>

        <TouchableOpacity onPress={handleInfoPress}>
          <Image
            source={require('../../../../../assets/info.png')}
            style={{ width: 15, height: 15 }}
          />
        </TouchableOpacity>

        {displayInfoText ? (
          <Text style={styles.errorText}>{infoText}</Text>
        ) : null}
      </View>

      <View style={styles.rightContainer}>
        <CustomSwitch value={value} onValueChange={handleToggle} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
    backgroundColor: theme.colors.backgroundGrey,
    paddingVertical: 8,
    width: '100%',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginLeft: 16,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginRight: 16,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  errorText: {
    position: 'absolute',
    backgroundColor: theme.colors.backgroundGrey,
    textAlign: 'center',
    fontSize: 9,
    padding: 4,
    borderRadius: 4,
    color: theme.colors.primary,
  },
  line: {
    height: 1,
    backgroundColor: theme.colors.primary,
  },
})

export default DataSwitchItem
