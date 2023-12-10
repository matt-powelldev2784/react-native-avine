import React from 'react'
import { EditRoundForm, Dashboard } from '../../components'
import { ScreenMenu } from '../../components'
import theme from '../../utils/theme/theme'

const EditRound = () => {
  return (
    <Dashboard>
      <ScreenMenu title={'Edit Round'} bgColor={theme.colors.roundPrimary} />
      <EditRoundForm />
    </Dashboard>
  )
}

export default EditRound
