import React from 'react'
import { Dashboard, RoundList, ScreenMenu } from '../../components'
import theme from '../../utils/theme/theme'

const Rounds = () => {
  return (
    <>
      <Dashboard>
        <ScreenMenu
          title={'Rounds'}
          navigateTo={'AddRound'}
          buttonText="Add Round"
          bgColor={theme.colors.roundPrimary}
        />
        <RoundList />
      </Dashboard>
    </>
  )
}

export default Rounds
