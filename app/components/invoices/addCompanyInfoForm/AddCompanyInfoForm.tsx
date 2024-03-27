import React from 'react'
import { Button, View } from 'react-native'
import * as DocumentPicker from 'expo-document-picker'

const AddCompanyInfoForm = () => {
  const selectOneFile = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: 'image/*', // Allowing only images
      })
      if (!res.canceled) {
        console.log('Response : ' + JSON.stringify(res))
        console.log('URI : ' + res.uri)
        console.log('Name : ' + res.i)
        console.log('Size : ' + res.size)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <View style={{ margin: 50 }}>
      <Button title="Select Image" onPress={selectOneFile} />
    </View>
  )
}

export default AddCompanyInfoForm
