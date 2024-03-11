import React from 'react'
import { Dashboard, AddClientForm } from '../../components'
import { ScreenMenu } from '../../components'
import theme from '../../utils/theme/theme'

const AddClient = () => {
  return (
    <Dashboard>
      <ScreenMenu title={'Add Client'} bgColor={theme.colors.clientPrimary} />
      <AddClientForm />
    </Dashboard>
  )
}

export default AddClient
