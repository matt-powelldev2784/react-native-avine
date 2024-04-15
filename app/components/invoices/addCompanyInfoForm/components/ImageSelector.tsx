import {
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
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
          <Text style={styles.imageSelectorText}>
            Click here to upload logo
          </Text>
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
  imageSelectorText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})

export default ImageSelector
