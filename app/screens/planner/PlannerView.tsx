import React from 'react'
import { ScreenMenu, WeekPlanner } from '../../components'
import theme from '../../utils/theme/theme'

const PlannerView = () => {
  return (
    <>
      <ScreenMenu
        title={'Planner'}
        navigateTo={'Planner'}
        navigateToProp={{ screen: 'ScheduleRoundFormView' }}
        buttonText="Schedule Round"
        bgColor={theme.colors.plannerPrimary}
      />
      <WeekPlanner />
    </>
  )
}

export default PlannerView
