import { View, ScrollView, StyleSheet } from 'react-native'
import React, { useRef } from 'react'
import { RootStackParamList } from '../../../screens/stackNavigator/StackNavigator'
import { RouteProp, useRoute } from '@react-navigation/native'
import InputField from '../../../ui/formElements/InputField'
import useFormikInvoice from './hooks/useFormikInvoice'
import { Loading } from '../../../ui'
import FormFlowTitles from './components/FormFlowTitles'
import { useGetClientOptions } from '../../Jobs/editJob/hooks/useFetchClients'
import Dropdown from '../../../ui/formElements/DropDown'
import Button from '../../../ui/button/Button'
import theme from '../../../utils/theme/theme'
import { useCalculateTotal } from './hooks/useCalculateTotal'

type EditInvoiceFormRouteProp = RouteProp<RootStackParamList, 'EditInvoice'>

const EditInvoiceForm = () => {
  //hooks
  const route = useRoute<EditInvoiceFormRouteProp>()
  const invoiceId = route?.params?.invoiceId ? route?.params?.invoiceId : ''
  const { formik, getApiIsLoading, postApiIsLoading } = useFormikInvoice({
    invoiceId,
  })
  const clientList = useGetClientOptions()
  const netPriceRef = useRef(formik.values.price || '')
  const taxRateRef = useRef(formik.values.taxRate || '')
  useCalculateTotal({ formik, netPriceRef, taxRateRef })

  //functions
  const handleSumbit = () => {
    formik.handleSubmit()
  }

  if (getApiIsLoading) {
    return <Loading loadingText={'Loading invoice data...'} />
  }

  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      style={styles.wrapper}
    >
      <FormFlowTitles activeStep={0} />

      <View style={styles.formContainer}>
        <Dropdown
          formik={formik}
          name="clientId"
          placeholder="Select client for invoice"
          title="Select client for invoice"
          options={clientList}
          imageName={'person'}
        />

        <InputField
          formik={formik}
          name="price"
          placeholder="NET Price"
          title="NET Price"
          imageName={'poundSign'}
          ref={netPriceRef}
        />

        <View style={styles.splitContainer}>
          <View style={styles.splitInput}>
            <InputField
              formik={formik}
              name="taxRate"
              placeholder="Tax Rate"
              title="Tax Rate"
              imageName={'percent'}
              ref={taxRateRef}
            />
          </View>

          <View style={styles.splitInput}>
            <InputField
              formik={formik}
              name="TotalAmount"
              placeholder="Total Amount"
              title="Total Amount"
              imageName={'poundSign'}
              backgroundColor={theme.colors.backgroundGrey}
              disabled={true}
            />
          </View>
        </View>

        <InputField
          formik={formik}
          name="description"
          placeholder="Description"
          title="description"
          imageName={'notes'}
          height={200}
        />

        <Button
          onPress={handleSumbit}
          text={'Update Invoice'}
          isLoading={postApiIsLoading}
        />
      </View>
    </ScrollView>
  )
}

export default EditInvoiceForm

const styles = StyleSheet.create({
  contentContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  wrapper: {
    width: '100%',
    backgroundColor: 'white',
    paddingTop: 16,
  },
  formContainer: {
    width: '90%',
    maxWidth: 600,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 24,
    backgroundColor: 'white',
    paddingBottom: 80,
  },
  splitContainer: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: 700,
    width: '100%',
    gap: 10,
  },
  splitInput: { flex: 1, maxWidth: 340, width: '50%' },
})
