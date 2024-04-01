// useSelectImage.js
import { useState } from 'react'
import * as DocumentPicker from 'expo-document-picker'
import { uploadCompanyLogo } from '../../../../db/user/uploadCompanyLogo'
import { getCompanyLogo } from '../../../../db/user/getCompanyLogo'
import { FormikProps } from 'formik'

interface useSelectImageProps {
  formik: FormikProps<any>
}

export const useSelectImage = ({ formik }: useSelectImageProps) => {
  const [logoUrl, setLogoUrl] = useState(null)
  const [uploadImageIsLoading, setUploadImageIsLoading] = useState(false)
  const [uploadImageError, setUploadImageError] = useState(false)

  const handleSelectImage = async () => {
    try {
      setUploadImageError(false)

      const setLogo = await DocumentPicker.getDocumentAsync({
        type: 'image/jpeg', // Allowing only jpg images
      })

      if (!setLogo.canceled) {
        setUploadImageIsLoading(true)
        await uploadCompanyLogo(setLogo.assets[0].uri)
        const url = await getCompanyLogo()
        setLogoUrl(url)
        formik.setFieldValue('logoUrl', url)
        setUploadImageIsLoading(false)
      }
    } catch (error) {
      setUploadImageError(true)
    }
  }

  return { logoUrl, uploadImageIsLoading, uploadImageError, handleSelectImage }
}
