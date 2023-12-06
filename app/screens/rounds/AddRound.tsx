import React from 'react'
import { AddRoundForm, Dashboard } from '../../components'
import { ScreenMenu } from '../../components'
import theme from '../../utils/theme/theme'

const AddRound = () => {
  return (
    <Dashboard>
      <ScreenMenu title={'Add Round'} bgColor={theme.colors.roundPrimary} />
      <AddRoundForm />
    </Dashboard>
  )
}

export default AddRound
