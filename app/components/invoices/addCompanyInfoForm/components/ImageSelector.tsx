import {
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from 'react-native'
import React from 'react'
import theme from '../../../../utils/theme/theme'

interface ImageSelectorProps {
  onPress: () => void
  isLoading?: boolean
}

const ImageSelector = ({ onPress, isLoading }: ImageSelectorProps) => {
  return (
    <TouchableOpacity style={styles.imageSelectorContainer} onPress={onPress}>
      {isLoading ? (
        <ActivityIndicator size="small" color={theme.colors.primary} />
      ) : (
        <>
          <Image
            source={require('../../../../../assets/addImage.png')}
            style={{
              width: 40,
              height: 40,
            }}
          />

          <View style={styles.textView}>
            <Text style={styles.imageSelectorText}>
              Click here to upload logo
            </Text>
            <Text style={styles.imageSelectorTextSmall}>
              jpg/png/gif images supported
            </Text>
          </View>
        </>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  imageSelectorContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    width: '100%',
    backgroundColor: theme.colors.backgroundGrey,
    paddingVertical: 16,
    borderRadius: 8,
  },
  textView: {
    flexDirection: 'column',
  },
  imageSelectorText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  imageSelectorTextSmall: {
    fontSize: 12,
    color: theme.colors.primary,
  },
})

export default ImageSelector
