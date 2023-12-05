import React from 'react'
import { Dashboard, RoundList, ScreenMenu } from '../../components'

const Rounds = () => {
  return (
    <>
      <Dashboard>
        <ScreenMenu
          title={'Rounds'}
          navigateTo={'AddRound'}
          buttonText="Add Round"
        />
        <RoundList />
      </Dashboard>
    </>
  )
}

export default Rounds
