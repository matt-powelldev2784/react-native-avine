import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { usePlannerContext } from '../../../screens/planner/plannerContext/usePlannerContext'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../../screens/stackNavigator/StackNavigator'
import { useGetJobCardData } from './hooks/useGetJobCardData'
import { StackNavigationProp } from '@react-navigation/stack'
import useFormikIsComplete from './hooks/useFormikIsComplete'
import theme from '../../../utils/theme/theme'
import { format } from 'date-fns'
import DataLineItem from '../../../ui/dataItems/DataLineItem'
import DataSwitchItem from '../../../ui/dataItems/DataSwitchItem'
import LongDataItem from '../../../ui/dataItems/LongDataItem'
import { Loading } from '../../../ui'
import useFormikIsPaid from './hooks/useFormikIsPaid'

const ScheduledJobCard = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const { selectedDay, selectedJob } = usePlannerContext()

  const { jobData, isComplete, isPaid, client } = useGetJobCardData()

  const { isCompleteApiIsLoading, formik, isCompleteError } =
    useFormikIsComplete({
      isComplete,
      isPaid,
    })

  const { isPaidApiIsLoading, formikIsPaid, isPaidError } = useFormikIsPaid({
    isPaid,
    isComplete,
  })

  if (!selectedJob || !selectedDay) {
    navigation.navigate('Error')
    return
  }

  if (
    typeof isComplete !== 'boolean' ||
    typeof isPaid !== 'boolean' ||
    !jobData ||
    !client
  ) {
    return <Loading loadingText={'Loading job details...'} />
  }

  return (
    <View style={styles.cardWrapperWeb}>
      <View style={styles.cardContainer}>
        <View style={styles.titleContainer}>
          <Image
            source={require('../../../../assets/clipboard_white.png')}
            style={{ width: 24, height: 32, margin: 8 }}
          />

          <Text style={styles.titleText} numberOfLines={1} ellipsizeMode="tail">
            {jobData.jobName}
          </Text>

          <View style={styles.dateTextContainer}>
            <Text style={styles.dateText}>
              {format(selectedDay, 'dd MMMM yyyy')}
            </Text>
          </View>
        </View>

        <View style={styles.switchWrapper}>
          <DataSwitchItem
            name={'Job Complete'}
            value={isComplete}
            isLoading={isCompleteApiIsLoading}
            formik={formik}
            error={isCompleteError || false}
          />

          <DataSwitchItem
            name={'Invoice Paid'}
            value={isPaid}
            isLoading={isPaidApiIsLoading}
            formik={formikIsPaid}
            error={isPaidError || false}
          />
        </View>

        <View style={styles.infoWrapper}>
          <Text style={styles.infoTitle}>Job Infomation:</Text>
          <DataLineItem name={'Contact Name'} value={jobData.contactName} />
          <DataLineItem name={'Address'} value={jobData.address} />
          <DataLineItem name={'Town'} value={jobData.town} />
          <DataLineItem name={'Post Code'} value={jobData.postcode} />
          <DataLineItem name={'Contact Tel'} value={jobData.contactTel} />

          <View style={styles.spacer} />

          <DataLineItem name={'Job Type'} value={jobData.jobType} />
          <DataLineItem name={'Estimated Time'} value={`${jobData.time} hrs`} />
          <DataLineItem name={'Price'} value={jobData.price} />
          <DataLineItem name={'Frequency'} value={jobData.frequency} />

          <View style={styles.spacer} />
          <DataLineItem name={'Client Contact Name'} value={client.name} />
          <DataLineItem
            name={'Client Company Name'}
            value={client.companyName || ''}
          />
          <DataLineItem name={'Client Tel'} value={client.contactTel || ''} />

          <LongDataItem name={'Notes'} value={jobData.notes || ''} />
        </View>

        <View style={styles.footer} />
      </View>
    </View>
  )
}

export default ScheduledJobCard

const styles = StyleSheet.create({
  cardWrapperWeb: {
    width: '100%',
    padding: 12,
    alignItems: 'center',
    marginTop: 36,
    marginBottom: 100,
  },
  cardContainer: {
    position: 'relative',
    marginTop: 8,
    width: '100%',
    maxWidth: 600,
    marginBottom: 8,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
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
    paddingHorizontal: 16,
  },
  infoWrapper: {
    padding: 8,
    marginBottom: 80,
    width: '100%',
    paddingHorizontal: 16,
  },
  infoTitle: {
    fontSize: 20,
    color: theme.colors.primary,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    padding: 16,
    backgroundColor: theme.colors.primary,
    width: '100%',
    height: 30,
  },
  spacer: { height: 32 },
})
