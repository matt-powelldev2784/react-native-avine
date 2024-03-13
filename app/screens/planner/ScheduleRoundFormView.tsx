import React from 'react'
import { Dashboard, ScheduleRoundForm, ScreenMenu } from '../../components'
import theme from '../../utils/theme/theme'

const ScheduleRoundFormView = () => {
  return (
    <>
      <Dashboard>
        <ScreenMenu
          title={'Schedule Round'}
          bgColor={theme.colors.plannerPrimary}
        />
        <ScheduleRoundForm />
      </Dashboard>
    </>
  )
}

export default ScheduleRoundFormView
