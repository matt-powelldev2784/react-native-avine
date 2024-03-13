import React from 'react'
import { Dashboard, ScreenMenu, ScheduledJobCard } from '../../components'
import theme from '../../utils/theme/theme'

const ScheduledJob = () => {
  return (
    <>
      <Dashboard>
        <ScreenMenu
          title={'Scheduled Job Details'}
          bgColor={theme.colors.plannerPrimary}
        />
        <ScheduledJobCard />
      </Dashboard>
    </>
  )
}

export default ScheduledJob
