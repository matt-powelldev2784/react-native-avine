import React from 'react'
import { ScreenMenu, ScheduledJobCard } from '../../components'
import theme from '../../utils/theme/theme'

const ScheduledJobView = () => {
  return (
    <>
      <ScreenMenu
        title={'Scheduled Job Details'}
        bgColor={theme.colors.plannerPrimary}
      />
      <ScheduledJobCard />
    </>
  )
}

export default ScheduledJobView
