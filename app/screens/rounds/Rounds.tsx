import React from 'react'
import { Dashboard, RoundList, ScreenMenu } from '../../components'

const Rounds = () => {
  return (
    <>
      <Dashboard>
        <ScreenMenu title={'Rounds'} navigateTo={'Rounds'} />
        <RoundList />
      </Dashboard>
    </>
  )
}

export default Rounds