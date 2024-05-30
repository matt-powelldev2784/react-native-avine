import { View, Text, StyleSheet, Image, Platform } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { RouteProp } from '@react-navigation/native'
import { useGetInvoiceData } from './hooks/getInvoiceData'
import { ConfirmModal, Loading } from '../../../ui'
import useFormikIsPaid from './hooks/useFormikIsPaid'
import DataSwitchItem from '../../../ui/dataItems/DataSwitchItem'
import { RootStackParamList } from '../../../screens/stackNavigator/StackNavigator'
import theme from '../../../utils/theme/theme'
import DataLineItem from '../../../ui/dataItems/DataLineItem'
import { convertPlannerDateToShortDate } from '../../../utils/convertPlannerDateToShortDate'
import LongDataItem from '../../../ui/dataItems/LongDataItem'
import IconButton from '../../../ui/iconButton/IconButton'
import { StackNavigationProp } from '@react-navigation/stack'
import { createWebPdf } from '../invoicePdf/web/createWebPdf'
import Button from '../../../ui/button/Button'

interface InvoiceCardProps {
  invoiceId: string
}

type InvoiceCardRouteProp = RouteProp<RootStackParamList, 'InvoiceCardView'>

const InvoiceCard = ({ invoiceId }: InvoiceCardProps) => {
  // state
  const [modalVisible, setModalVisible] = useState<boolean>(false)

  // hooks
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const route = useRoute<InvoiceCardRouteProp>()
  const { invoiceData, user, isComplete, isPaid } = useGetInvoiceData({
    invoiceId,
    route,
  })
  const { isPaidApiIsLoading, formikIsPaid, isPaidError } = useFormikIsPaid({
    isPaid,
    isComplete,
    invoiceId,
    plannerDate: invoiceData?.completedDate || null,
  })

  // if data is null show loading state
  if (
    typeof isComplete !== 'boolean' ||
    typeof isPaid !== 'boolean' ||
    !invoiceData
  ) {
    return <Loading loadingText={'Loading job details...'} />
  }

  //functions
  const handleNavigateToEditInvoice = () => {
    navigation.navigate('EditInvoice', { invoiceId })
  }
  const handleAddCompanyDetails = () => {
    setModalVisible(false)
    navigation.navigate('AddCompanyInfo')
  }
  const handleDownloadInvoice = async () => {
    if (!user.companyDetailsProvided) {
      setModalVisible(true)
      return
    }

    createWebPdf({ invoiceId })
  }

  // variables
  const shortDateString = convertPlannerDateToShortDate(
    invoiceData?.completedDate,
  )

  return (
    <View style={styles.cardWrapperWeb}>
      <View style={styles.cardContainer}>
        {/* --------------------------  Title Conatiner Blue  -------------------------- */}
        <View style={styles.titleContainer}>
          <Image
            source={require('../../../../assets/paper_white.png')}
            style={{ width: 27, height: 32, margin: 8 }}
          />

          <Text style={styles.titleText} numberOfLines={1} ellipsizeMode="tail">
            Invoice
          </Text>

          <View style={styles.dateTextContainer}>
            <Text style={styles.dateText}>{invoiceData.invoiceId}</Text>
          </View>

          <View style={styles.roundIconsContainer}>
            <IconButton
              size={34}
              imgSource={require('../../../../assets/download_blue.png')}
              onPress={handleDownloadInvoice}
            />

            <Text />

            {!isPaid ? (
              <IconButton
                size={34}
                imgSource={require('../../../../assets/edit_white.png')}
                onPress={handleNavigateToEditInvoice}
              />
            ) : null}
          </View>
        </View>

        {/* --------------------------  Invoice Info -------------------------- */}
        <View style={styles.switchWrapper}>
          <View style={styles.line} />
          <DataSwitchItem
            name={'Invoice Paid'}
            value={isPaid}
            isLoading={isPaidApiIsLoading}
            formik={formikIsPaid}
            error={isPaidError || false}
          />
        </View>

        <View style={styles.infoWrapper}>
          <DataLineItem name={'Job Name'} value={invoiceData.job.jobName} />
          <DataLineItem name={'Date Completed'} value={shortDateString} />
          <DataLineItem name={'Price'} value={`£${invoiceData.price}`} />

          <LongDataItem
            name={'Description'}
            value={invoiceData.description || ''}
          />
        </View>

        {/* --------------------------  Buttons -------------------------- */}
        <View style={styles.buttonContainer}>
          <Button text={'Download Invoice'} onPress={handleDownloadInvoice} />
          <Button text={'Edit Invoice'} onPress={handleNavigateToEditInvoice} />
        </View>

        {isPaid ? (
          <Text style={styles.warningText}>
            If you wish to edit this invoice please set the status back to not
            paid.
          </Text>
        ) : null}
      </View>

      <ConfirmModal
        visible={modalVisible}
        onConfirm={handleAddCompanyDetails}
        onCancel={() => setModalVisible(false)}
        modalText={
          'You need to add your company details before downloading invoices'
        }
        confirmButtonText={'Add Details'}
      />

      <View style={{ height: 100 }} />
    </View>
  )
}

const styles = StyleSheet.create({
  cardWrapperWeb: {
    width: '100%',
    padding: 12,
    backgroundColor: theme.colors.backgroundGrey,
    alignItems: 'center',
  },
  cardContainer: {
    marginTop: 8,
    width: '100%',
    maxWidth: 700,
    marginBottom: 8,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.colors.primary,
  },
  titleContainer: {
    padding: 16,
    overflow: 'hidden',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    width: '100%',
  },
  titleText: {
    color: theme.colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  roundIconsContainer: {
    position: 'absolute',
    top: 8,
    paddingHorizontal: 8,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Platform.OS === 'web' ? '96%' : '100%',
    height: 40,
  },
  dateTextContainer: {
    borderRadius: 12,
    backgroundColor: 'white',
    margin: 8,
  },
  dateText: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
    padding: 8,
  },
  switchWrapper: {
    justifyContent: 'space-between',
    flexGrow: 2,
    padding: 8,
    marginBottom: 16,
    marginTop: 8,
  },
  line: {
    height: 1,
    backgroundColor: theme.colors.primary,
  },
  infoWrapper: {
    padding: 8,
    marginBottom: 24,
    width: '100%',
  },
  infoTitle: {
    fontSize: 20,
    color: theme.colors.primary,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 12,
  },
  buttonContainer: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingVertical: 20,
  },
  warningText: {
    fontSize: 14,
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: 16,
    marginHorizontal: 8,
  },
  logo: {
    width: 285,
    height: 150,
    objectFit: 'contain' as const,
  },
})

export default InvoiceCard
