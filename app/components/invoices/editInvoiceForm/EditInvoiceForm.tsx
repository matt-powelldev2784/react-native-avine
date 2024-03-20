import { View, Text } from 'react-native'
import React from 'react'
import { RootStackParamList } from '../../../screens/stackNavigator/StackNavigator'
import { RouteProp, useRoute } from '@react-navigation/native'

type EditInvoiceFormRouteProp = RouteProp<RootStackParamList, 'InvoiceCardView'>

const EditInvoiceForm = () => {
  //hooks
  const route = useRoute<EditInvoiceFormRouteProp>()
  const invoiceId = route?.params?.invoiceId ? route?.params?.invoiceId : ''

  console.log('invoiceId', invoiceId)

  return (
    <View>
      <Text>EditInvoiceForm</Text>
    </View>
  )
}

export default EditInvoiceForm
