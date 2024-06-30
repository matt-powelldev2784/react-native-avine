import { View, Text, StyleSheet, Image, Platform } from 'react-native'
import React, { useState } from 'react'
import { JobWithIdT } from '../../../types/JobT'
import theme from '../../../utils/theme/theme'
import { ConfirmModal, Loading } from '../../../ui'
import { batchToggleJobIsComplete } from '../../../db/jobs/batchToggleJobIsComplete'
import { formatDateForDb } from '../../../utils/formatDateForDb'
import { batchToggleInvoiceIsPaid } from '../../../db/jobs/batchToogleInvoiceIsPaid'
import Button from '../../../ui/button/Button'
import ScheduledJobListItem from '../scheduledRounds/components/ScheduledJobListItem'
import { useRoundTicketData } from './hooks/useRoundtTicketData'
import { usePlannerContext } from '../../../screens/planner/plannerContext/usePlannerContext'

const PlannerRoundTicket = () => {
  //state
  const [allPaidModalVisible, setAllPaidModalVisible] = useState(false)
  const [allCompleteModalVisible, setAllCompleteModalVisible] = useState(false)

  //hooks
  const { selectedDay, setPlannerCardNeedsUpdate } = usePlannerContext()

  const {
    round,
    noJobStatusHasChanged,
    allJobsAreComplete,
    allInvoicesArePaid,
  } = useRoundTicketData()

  if (!round)
    return <Loading loadingText="Loading Planner Round Ticket Data..." />

  // variables
  const recurringRound = round?.recurringRound
  const plannerDate = formatDateForDb(selectedDay)

  //functions
  const toggleAllJobsComplete = async () => {
    if (!round) return
    await batchToggleJobIsComplete({ round, plannerDate })
    setPlannerCardNeedsUpdate(true)
  }

  const toggleAllJobsPaid = async () => {
    if (!round) return
    await batchToggleInvoiceIsPaid({ round, plannerDate })
    setPlannerCardNeedsUpdate(true)
  }

  return (
    <View style={styles.roundWrapper}>
      <View style={styles.roundContainer}>
        {/* ---------------------- Round Title ----------------------- */}
        <View style={styles.roundTitleContainer}>
          <Image
            source={require('../../../../assets/round_icon.png')}
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
                source={require('../../../../assets/repeat.png')}
                style={{ width: 25, height: 25 }}
              />
            ) : (
              <Text />
            )}
          </View>
        </View>

        {/* ---------------------- Jobs List ----------------------- */}

        {round?.relatedJobs?.map((job: JobWithIdT, index, self) => (
          <View key={job.id}>
            <ScheduledJobListItem
              key={job.id}
              job={job}
              recurringRound={recurringRound}
              roundId={round.id}
            />
            {index !== self.length - 1 && <View style={styles.jobCardLine} />}
            {round?.relatedJobs.length === 1 && (
              <View style={styles.jobCardLine} />
            )}
          </View>
        ))}

        <View style={styles.buttonContainer}>
          {!allInvoicesArePaid && allJobsAreComplete ? (
            <Button
              text={'Set all invoices to paid'}
              onPress={() => setAllPaidModalVisible(true)}
              backgroundColor={theme.colors.invoicePrimary}
            />
          ) : null}
          {noJobStatusHasChanged ? (
            <Button
              text={'Set all jobs to complete'}
              onPress={() => setAllCompleteModalVisible(true)}
            />
          ) : null}
        </View>
      </View>

      {/* ---------------------- Toogle all complete model ----------------------- */}
      <ConfirmModal
        modalText={`Are you sure you want to set all the jobs in ${round.roundName} round to complete?`}
        onConfirm={toggleAllJobsComplete}
        onCancel={() => setAllCompleteModalVisible(false)}
        visible={allCompleteModalVisible}
        confirmButtonText={'Yes'}
      />

      {/* ---------------------- Toogle all paid model ----------------------- */}
      <ConfirmModal
        modalText={`Are you sure you want to set all the invoices in ${round.roundName} round to paid?`}
        onConfirm={toggleAllJobsPaid}
        onCancel={() => setAllPaidModalVisible(false)}
        visible={allPaidModalVisible}
        confirmButtonText={'Yes'}
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
    minHeight: 82.5,
  },
})

export default PlannerRoundTicket
