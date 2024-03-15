import React from 'react'
import { ScreenMenu, ScheduledJobCard } from '../../components'
import theme from '../../utils/theme/theme'
import { View } from 'react-native'

const ScheduledJobView = () => {
  return (
    <View
      style={{ backgroundColor: theme.colors.backgroundGrey, width: '100%' }}
    >
      <ScreenMenu
        title={'Scheduled Job Details'}
        bgColor={theme.colors.plannerPrimary}
      />
      <ScheduledJobCard />
    </View>
  )
}

export default ScheduledJobView
