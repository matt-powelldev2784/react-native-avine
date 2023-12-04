import React from 'react'
import { AddRoundForm, Dashboard } from '../../components'
import { ScreenMenu } from '../../components'

const AddRound = () => {
  return (
    <Dashboard>
      <ScreenMenu title={'Add Round'} />
      <AddRoundForm />
    </Dashboard>
  )
}

export default AddRound
