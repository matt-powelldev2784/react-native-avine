import { useState } from 'react'
import { uploadLogoPreview } from '../../../../db/user/uploadLogoPreview'

export const useUploadImage = () => {
  const [uploadImageIsLoading, setUploadImageIsLoading] = useState(false)
  const [uploadImageError, setUploadImageError] = useState(false)
  const [uploadImageSuccess, setUploadImageSuccess] = useState(false)

  const handleSelectImage = async (imageUri: string) => {
    try {
      setUploadImageError(false)
      setUploadImageSuccess(false)


      if (typeof imageUri === 'string') {
        setUploadImageIsLoading(true)
        await uploadLogoPreview(imageUri)
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
