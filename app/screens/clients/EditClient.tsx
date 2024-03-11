import React from 'react'
import { Dashboard, EditClientForm } from '../../components'
import { ScreenMenu } from '../../components'
import theme from '../../utils/theme/theme'

const EditClient = () => {
  return (
    <Dashboard>
      <ScreenMenu title={'Edit Client'} bgColor={theme.colors.clientPrimary} />
      <EditClientForm />
    </Dashboard>
  )
}

export default EditClient
