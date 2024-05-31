import { View, Text, StyleSheet, ViewStyle } from 'react-native'
import React from 'react'
import theme from '../../../../utils/theme/theme'
import IconButton from '../../../../ui/iconButton/IconButton'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../../../screens/stackNavigator/StackNavigator'
import { StackNavigationProp } from '@react-navigation/stack'
import { JobWithIdT } from '../../../../types/JobT'
import { useDeviceType } from '../../../../utils/hooks/useDeviceTypes'

interface JobListItemProps {
  job: JobWithIdT
}

const JobListItem = ({ job }: JobListItemProps) => {
  //hooks
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const { isLargeWeb } = useDeviceType()

  //functions
  const handleNavigateToViewJob = () => {
    navigation.navigate('JobCardView', { jobId: job.id })
  }

  //variables
  const jobTextStyle: ViewStyle = isLargeWeb
    ? { maxWidth: '88%' }
    : { maxWidth: '78%' }

  return (
    <View style={styles.container}>
      <View style={styles.iconConatiner}>
        <IconButton
          size={34}
          imgSource={require('../../../../../assets/eye.png')}
          onPress={handleNavigateToViewJob}
        />
      </View>

      <View style={(styles.textContainer, jobTextStyle)}>
        <Text style={styles.jobText} ellipsizeMode="tail" numberOfLines={1}>
          {job.jobName}
        </Text>

        <Text style={styles.addressText} ellipsizeMode="tail" numberOfLines={1}>
          {isLargeWeb
            ? `${job.contactName}, ${job.address}, ${job.town}, ${job.postcode}`
            : `${job.town}, ${job.postcode}`}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 16,
    backgroundColor: theme.colors.formFlowSecondary,
    borderRadius: 8,
    margin: 2,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  iconConatiner: {
    width: '20%',
    maxWidth: 38,
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 4,
    overflow: 'hidden',
    width: '80%',
    maxWidth: 550,
    paddingRight: 16,
  },
  jobText: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
    maxwidth: '100%',
  },
  addressText: {
    color: theme.colors.primary,
    fontSize: 16,
    maxwidth: '100%',
  },
})

export default JobListItem
