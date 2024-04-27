import { useState } from 'react'
import DocumentPicker from 'react-native-document-picker'
import { uploadLogoPreview } from '../../../../db/user/uploadLogoPreview'

export const useUploadImage = () => {
  const [uploadImageIsLoading, setUploadImageIsLoading] = useState(false)
  const [uploadImageError, setUploadImageError] = useState(false)
  const [uploadImageSuccess, setUploadImageSuccess] = useState(false)

  const handleSelectImage = async () => {
    try {
      setUploadImageError(false)
      setUploadImageSuccess(false)

      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      })

      const imageFileUri = res[0].uri

      setUploadImageIsLoading(true)
      await uploadLogoPreview(imageFileUri)
      setUploadImageIsLoading(false)
      setUploadImageSuccess(true)
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        // User cancelled the picker
      } else {
        setUploadImageError(true)
        setUploadImageIsLoading(false)
        setUploadImageSuccess(false)
      }
    }
  }

  return {
    uploadImageIsLoading,
    uploadImageError,
    handleSelectImage,
    uploadImageSuccess,
  }
}
