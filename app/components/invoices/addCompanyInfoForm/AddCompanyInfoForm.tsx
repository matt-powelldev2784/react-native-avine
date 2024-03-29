import React, { useEffect, useState } from 'react'
import { Button, View, Image } from 'react-native'
import * as DocumentPicker from 'expo-document-picker'
import { uploadCompanyLogo } from '../../../db/user/uploadCompanyLogo'
import { getCompanyLogo } from '../../../db/user/getCompanyLogo'

const AddCompanyInfoForm = () => {
  const [logoUrl, setLogoUrl] = useState(null)

  useEffect(() => {
    const fetchLogoUrl = async () => {
      const url = await getCompanyLogo()
      console.log('url', url)
      setLogoUrl(url)
    }

    fetchLogoUrl()
  }, [])

  const selectOneFile = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: 'image/jpeg', // Allowing only jpg images
      })
      if (!res.canceled) {
        console.log('res.assets.uri', res.assets[0].uri)
        console.log('res', res.output[0].name)

        // Call the function to upload the file to Firebase
        uploadCompanyLogo(res.assets[0].uri)
      }
    } catch (error) {
      console.error('File selection error: ', error)
    }
  }

  return (
    <View style={{ margin: 50 }}>
      <Button title="Select Image" onPress={selectOneFile} />
      {logoUrl && (
        <Image source={{ uri: logoUrl }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  )
}

export default AddCompanyInfoForm
