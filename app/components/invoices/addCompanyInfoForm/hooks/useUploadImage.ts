// useSelectImage.js
import { useState } from 'react'
import * as DocumentPicker from 'expo-document-picker'
import { uploadLogoPreview } from '../../../../db/user/uploadLogoPreview'

export const useUploadImage = () => {
  const [uploadImageIsLoading, setUploadImageIsLoading] = useState(false)
  const [uploadImageError, setUploadImageError] = useState(false)
  const [uploadImageSuccess, setUploadImageSuccess] = useState(false)

  const handleSelectImage = async () => {
    try {
      setUploadImageError(false)
      setUploadImageSuccess(false)

      const setLogo = await DocumentPicker.getDocumentAsync({
        type: 'image/jpeg,image/png,image/gif',
      })

      if (!setLogo.canceled) {
        setUploadImageIsLoading(true)
        await uploadLogoPreview(setLogo.assets[0].uri)
        setUploadImageIsLoading(false)
        setUploadImageSuccess(true)
      }
    } catch (error) {
      setUploadImageError(true)
      setUploadImageIsLoading(false)
      setUploadImageSuccess(false)
    }
  }

  return {
    uploadImageIsLoading,
    uploadImageError,
    handleSelectImage,
    uploadImageSuccess,
  }
}
