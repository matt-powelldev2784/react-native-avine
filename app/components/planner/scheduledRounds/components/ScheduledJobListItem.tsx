import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import theme from '../../../../utils/theme/theme'
import { JobWithIdT } from '../../../../types/JobT'
import { usePlannerContext } from '../../../../screens/planner/plannerContext/usePlannerContext'
import CardModal from '../../../../ui/modal/CardModal'
import ScheduledJobCard from '../../scheduledJobCard/ScheduledJobCard'

interface ScheduledJobCardProps {
  job: JobWithIdT
  roundId: string
  recurringRound: boolean
}

const ScheduledJobListItem = ({
  job,
  recurringRound,
  roundId,
}: ScheduledJobCardProps) => {
  //state
  const [modalVisible, setModalVisible] = useState<boolean>(false)

  // hooks
  const { setSelectedJob } = usePlannerContext()

  // functions
  const handleViewScheduledJobDetails = () => {
    setSelectedJob({ jobId: job.id, recurringRound, roundId })
    setModalVisible(true)
  }

  //variables
  const isComplete = job?.jobIsComplete
  const completeStyle = isComplete ? 0.5 : 1

  return (
    <View style={[styles.container, { opacity: completeStyle }]}>
      <View style={styles.leftContainer}>
        <View style={styles.timeContainer}>
          <Text style={styles.time} numberOfLines={1}>
            {job.time} h&nbsp;&nbsp;
          </Text>
        </View>

        <Text style={styles.jobText} numberOfLines={1} ellipsizeMode="tail">
          {job.jobName}
        </Text>
      </View>

      <View style={styles.iconsConatiner}>
        <TouchableOpacity onPress={handleViewScheduledJobDetails}>
          <Image
            source={require('../../../../../assets/edit.png')}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>

      {modalVisible ? (
        <CardModal
          isVisible={modalVisible}
          onCancel={() => setModalVisible(false)}
          reactElement={<ScheduledJobCard />}
        />
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 4,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    overflow: 'hidden',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexGrowth: 2,
    maxWidth: '80%',
  },
  jobText: {
    fontSize: 16,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  image: {
    width: 35,
    height: 35,
  },
  iconsConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    width: 38,
  },
  timeContainer: {
    backgroundColor: theme.colors.primary,
    color: 'white',
    borderRadius: 8,
    height: 24,
    width: 40,
    paddingTop: 4,
    textAlign: 'right',
  },
  time: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'right',
  },
  opacity50opercent: {
    opacity: 0.5,
  },
})

export default ScheduledJobListItem
