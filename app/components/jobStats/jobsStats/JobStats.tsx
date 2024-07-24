import { View, Text } from 'react-native'
import React from 'react'
import Button from '../../../ui/button/Button'
import { getJob } from '../../../db/jobs/getJob'
import { getJobStats } from '../../../db/jobStats/getJobStats'

const JobStats = () => {
  return (
    <View>
      <Text>JobStats</Text>
      <Button
        text="JobStats"
        onPress={() =>
          getJobStats({
            startDate: '24072024',
            endDate: '22072026',
          })
        }
      />
      <Button text="getJob" onPress={() => getJob('AnACuqQomK4mk490Ctl3')} />
    </View>
  )
}

export default JobStats
