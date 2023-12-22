import React from 'react'
import { Dashboard, ScreenMenu, WeekPlanner } from '../../components'
import theme from '../../utils/theme/theme'

const Planner = () => {
  return (
    <>
      <Dashboard>
        <ScreenMenu
          title={'Planner'}
          navigateTo={'ScheduleRound'}
          buttonText="Schedule Round"
          bgColor={theme.colors.plannerPrimary}
        />
        <WeekPlanner />
      </Dashboard>
    </>
  )
}

export default Planner
