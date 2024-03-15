import React from 'react'
import { ScheduleRoundForm, ScreenMenu } from '../../components'
import theme from '../../utils/theme/theme'

const ScheduleRoundFormView = () => {
  return (
    <>
      <ScreenMenu
        title={'Schedule Round'}
        bgColor={theme.colors.plannerPrimary}
      />
      <ScheduleRoundForm />
    </>
  )
}

export default ScheduleRoundFormView
