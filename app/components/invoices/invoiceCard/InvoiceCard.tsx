import { View, Text, StyleSheet, Image, Platform } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { RouteProp } from '@react-navigation/native'
import { useGetInvoiceData } from '../hooks/getInvoiceData'
import { Loading } from '../../../ui'
import useFormikIsPaid from '../hooks/useFormikIsPaid'
import DataSwitchItem from '../../planner/weekPlanner/components/scheduledJobCard/components/DataSwitchItem'
import { RootStackParamList } from '../../../screens/stackNavigator/StackNavigator'
import theme from '../../../utils/theme/theme'
import DataLineItem from '../../planner/weekPlanner/components/scheduledJobCard/components/DataLineItem'
import { convertPlannerDateToShortDate } from '../../../utils/convertPlannerDateToShortDate'
import LongDataItem from '../../planner/weekPlanner/components/scheduledJobCard/components/LongDataItem'
import IconButton from '../../../ui/iconButton/IconButton'
import { StackNavigationProp } from '@react-navigation/stack'

interface InvoiceCardProps {
  invoiceId: string
}

type DueInvoiceCardRouteProp = RouteProp<RootStackParamList, 'DueInvoices'>

const InvoiceCard = ({ invoiceId }: InvoiceCardProps) => {
  // hooks
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const route = useRoute<DueInvoiceCardRouteProp>()
  const { invoiceData, isComplete, isPaid } = useGetInvoiceData({
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
              onPress={() => {}}
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
          <DataSwitchItem
            name={'Invoice Paid'}
            value={isPaid}
            isLoading={isPaidApiIsLoading}
            formik={formikIsPaid}
            error={isPaidError || false}
          />
        </View>
      </View>

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
})

export default InvoiceCard
