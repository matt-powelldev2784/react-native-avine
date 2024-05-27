import { View, Text, StyleSheet, Platform, Image } from 'react-native'
import React, { useState } from 'react'
import { ConfirmModal, Loading } from '../../../../ui'
import useGetApiData from '../../../../utils/hooks/useGetApiData'
import theme from '../../../../utils/theme/theme'
import DataLineItem from '../../../../ui/dataItems/DataLineItem'
import LongDataItem from '../../../../ui/dataItems/LongDataItem'
import usePostApiData from '../../../../utils/hooks/usePostApiData'
import IconButton from '../../../../ui/iconButton/IconButton'
import { getJob } from '../../../../db/jobs/getJob'
import { deleteJob } from '../../../../db/jobs/deleteJob'

interface JobCardProps {
  jobId: string
}

const JobCard = ({ jobId }: JobCardProps) => {
  //state
  const [modalVisible, setModalVisible] = useState(false)

  //hooks
  const { getApiIsLoading, data: jobData } = useGetApiData({
    apiFunction: async () => getJob(jobId),
  })
  const { postApiIsLoading, setApiFunction } = usePostApiData({
    onSuccessScreen: 'Jobs',
    refreshScreen: { refresh: true },
  })

  //functions
  const handleDeleteClientPress = () => {
    setModalVisible(true)
  }
  const handleConfirmDeleteClientPress = async () => {
    setApiFunction(() => async () => deleteJob(jobId))
  }

  // if data is null show loading state
  if (getApiIsLoading || !jobData) {
    return <Loading loadingText={'Loading job details...'} />
  }

  return (
    <View style={styles.cardWrapperWeb}>
      <View style={styles.cardContainer}>
        {/* --------------------------  Title Conatiner Blue  -------------------------- */}
        <View style={styles.titleContainer}>
          <Image
            source={require('../../../../../assets/clipboard_tick_ratio.png')}
            style={{ width: 35, height: 40, margin: 8 }}
          />

          <Text style={styles.titleText} numberOfLines={1} ellipsizeMode="tail">
            {jobData.jobName}
          </Text>

          <View style={styles.roundIconsContainer}>
            <IconButton
              onPress={handleDeleteClientPress}
              imgSource={require('../../../../../assets/bin_white.png')}
              size={35}
              width={20}
              height={25}
            />

            <Text />
          </View>
        </View>

        {/* --------------------------  Info Conatiner White  -------------------------- */}
        <View style={styles.infoWrapper}>
          <Text style={styles.infoTitle}>Job Details:</Text>
          <DataLineItem name={'Contact Name'} value={jobData.contactName} />
          <DataLineItem name={'Contact Tel'} value={jobData.contactTel} />

          <View style={styles.spacer} />

          <DataLineItem name={'Job Name'} value={jobData.jobName} />
          <DataLineItem name={'Address'} value={jobData.address} />
          <DataLineItem name={'Town'} value={jobData.town} />
          <DataLineItem name={'Post Code'} value={jobData.postcode} />

          <View style={styles.spacer} />

          <DataLineItem name={'Frequency'} value={jobData.frequency} />
          <DataLineItem name={'Job Type'} value={jobData.jobType} />
          <DataLineItem name={'Price'} value={jobData.price} />
          <DataLineItem name={'Time'} value={`${jobData.time} hrs`} />

          <LongDataItem name={'Notes'} value={jobData.notes || ''} />
        </View>
      </View>

      <View style={{ height: 100 }} />

      {/* --------------------------------  Confirm Modal --------------------------------- */}
      <ConfirmModal
        modalText={`Are you sure you want to delete job ${jobData.jobName}?`}
        modalText2={`${jobData.jobName} will be deleted from view but will still be accessible for previously created invoices.`}
        onConfirm={handleConfirmDeleteClientPress}
        onCancel={() => setModalVisible(false)}
        visible={modalVisible}
        isLoading={postApiIsLoading}
      />
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
  spacer: { height: 32 },
})

export default JobCard
