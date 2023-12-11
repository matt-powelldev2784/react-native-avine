import React from 'react'
import { Dashboard, ScreenMenu } from '../../components'
import theme from '../../utils/theme/theme'

const Planner = () => {
  return (
    <>
      <Dashboard>
        <ScreenMenu
          title={'Planner'}
          // navigateTo={'AddRound'}
          // buttonText="Add Payment"
          bgColor={theme.colors.plannerPrimary}
        />
      </Dashboard>
    </>
  )
}

export default Planner
