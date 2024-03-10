import React from 'react'
import { Dashboard } from '../../components'
import { ScreenMenu } from '../../components'
import theme from '../../utils/theme/theme'

const EditClient = () => {
  return (
    <Dashboard>
      <ScreenMenu title={'Edit Client'} bgColor={theme.colors.jobPrimary} />
    </Dashboard>
  )
}

export default EditClient
