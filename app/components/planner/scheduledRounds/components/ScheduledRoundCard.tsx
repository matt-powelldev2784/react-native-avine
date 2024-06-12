import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native'
import React, { useState } from 'react'
import { RoundWithRecurringFlagT } from '../../../../types/RoundT'
import { JobWithIdT } from '../../../../types/JobT'
import theme from '../../../../utils/theme/theme'
import ScheduledListItem from './ScheduledJobListItem'
import { ConfirmModal } from '../../../../ui'
import useHandleDelete from '../hooks/useHandleDelete'
import { batchToggleJobIsComplete } from '../../../../db/jobs/batchToggleJobIsComplete'
import { formatDateForDb } from '../../../../utils/formatDateForDb'
import { usePlannerContext } from '../../../../screens/planner/plannerContext/usePlannerContext'
import { batchToggleInvoiceIsPaid } from '../../../../db/jobs/batchToogleInvoiceIsPaid'
import Button from '../../../../ui/button/Button'
import { getInvoicesRelatedToRound } from '../../../../db/invoice/getInvoicesRelatedToRound'
import useGetApiData from '../../../../utils/hooks/useGetApiData'
import { useJobAndInvoiceStatus } from '../hooks/useJobandInvoiceStatus'

interface ScheduledRoundCardProps {
  round: RoundWithRecurringFlagT
}

const ScheduledRoundCard = ({ round }: ScheduledRoundCardProps) => {
  //state
  const [recurringModalVisible, setRecurringModalVisible] = useState(false)
  const [oneOffModalVisible, setOneOffModalVisible] = useState(false)

  //hooks
  const { selectedDay, plannerCardNeedsUpdate, setPlannerCardNeedsUpdate } =
    usePlannerContext()
  const selectedDayForDb = formatDateForDb(selectedDay)

  const { data: relatedInvoices } = useGetApiData({
    apiFunction: async () =>
      getInvoicesRelatedToRound({ round, plannerDate: selectedDayForDb }),
    selectedDay,
  })

  const { noJobStatusHasChanged, allJobsAreComplete, allInvoicesArePaid } =
    useJobAndInvoiceStatus({ round, relatedInvoices, plannerCardNeedsUpdate })

  const {
    handleDeletePress,
    handleDeleteOneOffRound,
    handleDeleteAllRecurringRounds,
    handleDeleteSingleRecurringRound,
    postApiIsLoading,
  } = useHandleDelete({
    setRecurringModalVisible,
    setOneOffModalVisible,
    round,
  })

  // variables
  const recurringRound = round?.recurringRound
  // const totalRoundtTime = round?.relatedJobs?.reduce(
  //   (totalTime: number, job: JobWithIdT) => totalTime + parseFloat(job.time),
  //   0,
  // )
  const plannerDate = formatDateForDb(selectedDay)

  //functions
  const toggleAllJobsComplete = async () => {
    await batchToggleJobIsComplete({ round, plannerDate })
    setPlannerCardNeedsUpdate(true)
  }

  const toggleAllJobsPaid = async () => {
    await batchToggleInvoiceIsPaid({ round, plannerDate })
    setPlannerCardNeedsUpdate(true)
  }

  return (
    <View style={styles.roundWrapper}>
      <View style={styles.roundContainer}>
        {/* ---------------------- Round Title ----------------------- */}
        <View style={styles.roundTitleContainer}>
          <Image
            source={require('../../../../../assets/round_icon.png')}
            style={{ width: 30, height: 30, margin: 8, marginTop: 20 }}
          />

          <Text
            style={styles.roundTitleText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {round.roundName}
          </Text>

          <View style={styles.roundIconsContainer}>
            {recurringRound ? (
              <Image
                source={require('../../../../../assets/repeat.png')}
                style={{ width: 25, height: 25 }}
              />
            ) : (
              <Text />
            )}

            <TouchableOpacity onPress={handleDeletePress}>
              <Image
                source={require('../../../../../assets/bin.png')}
                style={{ width: 34, height: 34 }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* ---------------------- Jobs List ----------------------- */}

        {round?.relatedJobs?.map((job: JobWithIdT, index, self) => (
          <View key={job.id}>
            <ScheduledListItem
              key={job.id}
              job={job}
              recurringRound={recurringRound}
              roundId={round.id}
            />
            {index !== self.length - 1 && <View style={styles.jobCardLine} />}
          </View>
        ))}

        <View style={styles.buttonContainer}>
          {allJobsAreComplete && !allInvoicesArePaid ? (
            <Button
              text={'Set all invoices to paid'}
              onPress={toggleAllJobsPaid}
              backgroundColor={theme.colors.invoicePrimary}
            />
          ) : null}
          {noJobStatusHasChanged ? (
            <Button
              text={'Set all jobs to complete'}
              onPress={toggleAllJobsComplete}
            />
          ) : null}
        </View>
      </View>

      {/* ---------------------- Delete one off round modal ----------------------- */}
      <ConfirmModal
        modalText={`Are you sure you want to delete the ${round.roundName} one off round from the planner?`}
        onConfirm={handleDeleteOneOffRound}
        onCancel={() => setOneOffModalVisible(false)}
        visible={oneOffModalVisible}
        confirmButtonText={'Yes'}
        isLoading={postApiIsLoading}
      />

      {/* ---------------------- Delete recurring rounds modal ----------------------- */}
      <ConfirmModal
        modalText={`Please confirm deletion of ${round.roundName} recurring round from the planner.`}
        modalText2={`Do you want to delete a single entry for this date only or all recurring entries?`}
        onConfirm={handleDeleteAllRecurringRounds}
        onConfirm2={handleDeleteSingleRecurringRound}
        onCancel={() => setRecurringModalVisible(false)}
        visible={recurringModalVisible}
        confirmButtonText={'Delete All'}
        onConfirmText2={'Delete Single'}
        isLoading={postApiIsLoading}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  roundWrapper: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 8,
    paddingHorizontal: 12,
  },
  roundContainer: {
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
  roundTitleContainer: {
    padding: 8,
    overflow: 'hidden',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  roundTitleText: {
    color: theme.colors.primary,
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
  roundTimeText: {
    color: theme.colors.white,
    borderRaadiusBottomLeft: 20,
    borderRadiusBottomRight: 12,
    fontSize: 10,
    width: '25%',
    textAlign: 'right',
  },
  roundCardLine: {
    height: 2,
    backgroundColor: theme.colors.primary,
    width: '100%',
  },
  jobCardLine: {
    height: 1,
    backgroundColor: theme.colors.primary,
    width: '100%',
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
    paddingHorizontal: 20,
  },
})

export default ScheduledRoundCard
