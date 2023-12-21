import React from 'react'
import { Dashboard, ScreenMenu, WeekPlanner } from '../../components'
import theme from '../../utils/theme/theme'

const ScheduleRound = () => {
  return (
    <>
      <Dashboard>
        <ScreenMenu
          title={'Schedule Round'}
          // navigateTo={'AddRound'}
          // buttonText="Add Payment"
          bgColor={theme.colors.plannerPrimary}
        />
        <WeekPlanner />
      </Dashboard>
    </>
  )
}

export default ScheduleRound
