import { View, Text } from 'react-native'
import React from 'react'
import Button from '../../../ui/button/Button'
import { getPlanneerDocsInDateRange } from '../../../db/jobStats/getPlanneerDocsInDateRange'

const JobStats = () => {
  return (
    <View>
      <Text>JobStats</Text>
      <Button
        text="JobStats"
        onPress={() =>
          getPlanneerDocsInDateRange({
            startDate: '24072024',
            endDate: '22072026',
          })
        }
      />
    </View>
  )
}

export default JobStats
