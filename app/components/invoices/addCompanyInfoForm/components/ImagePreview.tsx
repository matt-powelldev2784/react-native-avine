import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import theme from '../../../../utils/theme/theme'
import { useGetImagePreview } from '../hooks/useGetImagePreview'
import { FormikProps } from 'formik'

interface ImagePreviewProps {
  formik: FormikProps<any>
  refreshImage: boolean
}

const ImagePreview = ({ formik, refreshImage }: ImagePreviewProps) => {
  const { logoUrl, getImageIsLoading, getImageError } = useGetImagePreview({
    formik,
    refreshImage,
  })

  return (
    <View style={styles.logoContainer}>
      {logoUrl && !getImageIsLoading ? (
        <Image
          source={{ uri: logoUrl }}
          style={styles.logoPreview}
          resizeMode="contain"
        />
      ) : null}

      {!logoUrl && !getImageIsLoading ? (
        <View style={styles.logoPlaceholder}>
          <Text style={styles.placeholderText}>
            Logo preview will appear here.
          </Text>
        </View>
      ) : null}

      {getImageIsLoading ? (
        <View style={styles.logoPlaceholder}>
          <ActivityIndicator size={'small'} color={theme.colors.primary} />
        </View>
      ) : null}

      {getImageError ? (
        <View style={styles.logoPlaceholder}>
          <Text style={styles.errorText}>
            Error getting image preview. Please try uploading a the image again.
          </Text>
        </View>
      ) : null}
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
  errorText: {
    fontSize: 14,
    color: 'red',
    textAlign: 'center',
  },
})

export default ImagePreview
