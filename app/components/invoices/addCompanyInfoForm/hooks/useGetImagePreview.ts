// useSelectImage.js
import { useEffect, useState } from 'react'
import { FormikProps } from 'formik'
import { getLogoPreview } from '../../../../db/user/getLogoPreview'

interface useSelectImageProps {
  formik: FormikProps<any>
  refreshImage: boolean
}

export const useGetImagePreview = ({
  formik,
  refreshImage,
}: useSelectImageProps) => {
  const [logoUrl, setLogoUrl] = useState(null)
  const [getImageIsLoading, setGetImageIsLoading] = useState(false)
  const [getImageError, setGetImageError] = useState(false)
  const loadingTime = refreshImage ? 5000 : 0

  useEffect(() => {
    const handleGetImage = async () => {
      try {
        setGetImageError(false)
        setLogoUrl(null)
        setGetImageIsLoading(true)

        setTimeout(async () => {
          const url = await getLogoPreview()
          setLogoUrl(url)
          formik.setFieldValue('logoUrl', url)
          setGetImageIsLoading(false)
        }, loadingTime)
      } catch (error) {
        setGetImageError(true)
        setGetImageIsLoading(false)
      }
    }

    handleGetImage()
  }, [refreshImage])

  return {
    logoUrl,
    setLogoUrl,
    getImageIsLoading,
    getImageError,
  }
}
