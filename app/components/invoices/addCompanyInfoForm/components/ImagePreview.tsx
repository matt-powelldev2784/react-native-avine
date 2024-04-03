import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import theme from '../../../../utils/theme/theme'

interface ImagePreviewProps {
  logoUrl: string | null
}

const ImagePreview = ({ logoUrl }: ImagePreviewProps) => {
  return (
    <View style={styles.logoContainer}>
      {logoUrl ? (
        <Image
          source={{ uri: logoUrl }}
          style={styles.logoPreview}
          resizeMode="contain"
        />
      ) : (
        <View style={styles.logoPlaceholder}>
          <Text style={styles.placeholderText}>
            Logo preview will appear here.
          </Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 285,
    height: 150,
  },
  logoPreview: {
    width: '100%',
    height: '100%',
  },
  logoPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.backgroundGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
})

export default ImagePreview
