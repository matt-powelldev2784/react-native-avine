import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { usePlannerContext } from '../../../../../screens/planner/plannerContext/usePlannerContext'
import { useNavigation, useRoute } from '@react-navigation/native'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../../../../../screens/stackNavigator/StackNavigator'
import { useGetJobCardData } from './hooks/useGetJobCardData'
import { StackNavigationProp } from '@react-navigation/stack'
import useFormikIsComplete from './hooks/useFormikIsComplete'
import theme from '../../../../../utils/theme/theme'
import { format } from 'date-fns'
import DataLineItem from './components/DataLineItem'
import { ScrollView } from 'react-native-gesture-handler'
import DataSwitchItem from './components/DataSwitchItem'
import LongDataItem from './components/LongDataItem'
import { Loading } from '../../../../../ui'
import useFormikIsPaid from './hooks/useFormikIsPaid'

type ScheduledJobCardRouteProp = RouteProp<RootStackParamList, 'Planner'>

const ScheduledJobCard = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const route = useRoute<ScheduledJobCardRouteProp>()
  const { selectedDay, selectedJob } = usePlannerContext()

  const { jobData, isComplete, isPaid } = useGetJobCardData({
    route,
  })

  const { postApiIsLoading, formik } = useFormikIsComplete({
    isComplete,
  })

  const { isPaidApiIsLoading, formikIsPaid } = useFormikIsPaid({
    isPaid,
  })

  if (!selectedJob || !selectedDay) {
    navigation.navigate('Error')
    return
  }

  if (typeof isComplete !== 'boolean' || typeof isPaid !== 'boolean') {
    return <Loading loadingText={'Loading job details...'} />
  }

  return (
    <ScrollView
      contentContainerStyle={styles.cardWrapper}
      style={styles.cardWrapperWeb}
    >
      <View style={styles.cardContainer}>
        <View style={styles.titleContainer}>
          <Image
            source={require('../../../../../../assets/clipboard_white.png')}
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
            isLoading={postApiIsLoading}
            formik={formik}
          />
          <DataSwitchItem
            name={'Invoice Paid'}
            value={isPaid}
            isLoading={isPaidApiIsLoading}
            formik={formikIsPaid}
          />
        </View>

        <View style={styles.infoWrapper}>
          <Text style={styles.infoTitle}>Job Infomation:</Text>
          <DataLineItem name={'Contact Name'} value={jobData.contactName} />
          <DataLineItem name={'Address'} value={jobData.address} />
          <DataLineItem name={'Town'} value={jobData.town} />
          <DataLineItem name={'Post Code'} value={jobData.postcode} />
          <DataLineItem name={'Contact Tel'} value={jobData.contactTel} />
          <DataLineItem name={'Job Type'} value={jobData.jobType} />
          <DataLineItem name={'Estimated Time'} value={`${jobData.time} hrs`} />
          <DataLineItem name={'Client'} value={jobData.clientId} />
          <DataLineItem name={'Price'} value={jobData.price} />
          <DataLineItem name={'Frequency'} value={jobData.frequency} />

          <LongDataItem name={'Notes'} value={jobData.notes || ''} />
        </View>
      </View>

      <View style={{ height: 100 }} />
    </ScrollView>
  )
}

export default ScheduledJobCard

const styles = StyleSheet.create({
  cardWrapper: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 8,
    paddingHorizontal: 8,
  },
  cardWrapperWeb: {
    width: '100%',
    marginVertical: 8,
    paddingHorizontal: 8,
  },
  cardContainer: {
    marginTop: 8,
    width: '100%',
    maxWidth: 700,
    marginBottom: 8,
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 8,
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
    marginBottom: 8,
  },
})
