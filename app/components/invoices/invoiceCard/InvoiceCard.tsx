import { View, Text, StyleSheet, Image, Platform } from 'react-native'
import React, { useRef, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { RouteProp } from '@react-navigation/native'
import { useGetInvoiceData } from '../hooks/getInvoiceData'
import { ConfirmModal, Loading } from '../../../ui'
import useFormikIsPaid from '../hooks/useFormikIsPaid'
import DataSwitchItem from '../../planner/weekPlanner/components/scheduledJobCard/components/DataSwitchItem'
import { RootStackParamList } from '../../../screens/stackNavigator/StackNavigator'
import theme from '../../../utils/theme/theme'
import DataLineItem from '../../planner/weekPlanner/components/scheduledJobCard/components/DataLineItem'
import { convertPlannerDateToShortDate } from '../../../utils/convertPlannerDateToShortDate'
import LongDataItem from '../../planner/weekPlanner/components/scheduledJobCard/components/LongDataItem'
import IconButton from '../../../ui/iconButton/IconButton'
import { StackNavigationProp } from '@react-navigation/stack'
import { CreateInvoice } from '../invoicePdf/web/CreateInvoice'
import jsPDF from 'jspdf'

interface InvoiceCardProps {
  invoiceId: string
}

type DueInvoiceCardRouteProp = RouteProp<RootStackParamList, 'DueInvoices'>

const InvoiceCard = ({ invoiceId }: InvoiceCardProps) => {
  // state
  const [modalVisible, setModalVisible] = useState<boolean>(false)

  // hooks
  const invoiceTemplateRef = useRef<HTMLDivElement>(null)
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const route = useRoute<DueInvoiceCardRouteProp>()
  const { invoiceData, user, client, isComplete, isPaid } = useGetInvoiceData({
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
    !invoiceData ||
    !user ||
    !client
  ) {
    return <Loading loadingText={'Loading job details...'} />
  }

  //functions
  const handleNavigateToEditInvoice = () => {
    navigation.navigate('EditInvoice', { invoiceId })
  }
  const handleDownloadInvoice = async () => {
    if (!user.companyDetailsProvided) {
      setModalVisible(true)
      return
    }

    const doc = new jsPDF({
      format: 'a4',
      unit: 'mm',
    })

    doc.setFont('Inter-Regular', 'normal')

    // Fetch the image, convert it to a Blob and then to a base64 data URL
    const response = await fetch(user.logoUrl)
    const blob = await response.blob()
    const reader = new FileReader()
    reader.readAsDataURL(blob)

    reader.onloadend = () => {
      const base64data = reader.result as string

      // Create a new image element using the native JavaScript API
      const img = new window.Image()
      img.src = base64data

      img.onload = () => {
        // calculate the aspect ratio of the image
        const aspectRatio = img.width / img.height
        const desiredHeight = 38
        const desiredWidth = desiredHeight * aspectRatio

        // Add the image to the PDF with the desired width and calculated height
        doc.addImage(base64data, 'JPEG', 0, 0, desiredWidth, desiredHeight)
        doc.save('document.pdf')
      }
    }

    // if (invoiceTemplateRef.current !== null) {
    //   doc.html(invoiceTemplateRef.current, {
    //     callback: function () {
    //       doc.save('document.pdf')
    //     },
    //   })
    // }
  }
  // variables
  const shortDateString = convertPlannerDateToShortDate(
    invoiceData?.completedDate,
  )

  return (
    <View style={styles.cardWrapperWeb}>
      <View style={styles.cardContainer}>
        <View style={styles.titleContainer}>
          <Image
            source={require('../../../../assets/paper_white.png')}
            style={{ width: 27, height: 32, margin: 8 }}
          />

          <Text style={styles.titleText} numberOfLines={1} ellipsizeMode="tail">
            {invoiceData.job.jobName}
          </Text>

          <View style={styles.dateTextContainer}>
            <Text style={styles.dateText}>{shortDateString}</Text>
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

        <View style={styles.infoWrapper}>
          <Text style={styles.infoTitle}>Invoice Details:</Text>
          <DataLineItem name={'Date Completed'} value={shortDateString} />
          <DataLineItem name={'Price'} value={`£${invoiceData.price}`} />

          <LongDataItem
            name={'Description'}
            value={invoiceData.description || ''}
          />
        </View>

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

        {isPaid ? (
          <Text style={styles.warningText}>
            If you wish to edit this invoice please set the status back not
            paid.
          </Text>
        ) : null}
      </View>

      <ConfirmModal
        visible={modalVisible}
        onConfirm={() => navigation.navigate('AddCompanyInfo')}
        onCancel={() => setModalVisible(false)}
        modalText={
          'You need to add your company details before downloading invoices'
        }
        confirmButtonText={'Add Details'}
      />

      <View style={{ height: 100 }} />

      <div ref={invoiceTemplateRef}>
        {user && client && invoiceData && Platform.OS === 'web' && (
          <>
            <CreateInvoice
              user={user}
              client={client}
              invoiceData={invoiceData}
            />
          </>
        )}
      </div>
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
    color: theme.colors.secondary,
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
  infoWrapper: { padding: 8, marginBottom: 24, width: '100%' },
  infoTitle: {
    fontSize: 20,
    color: theme.colors.primary,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 12,
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
