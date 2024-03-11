import React from 'react'
import { Dashboard, ScreenMenu } from '../../components'
import theme from '../../utils/theme/theme'
import ClientList from '../../components/clients/clientList/ClientList'

const Client = () => {
  return (
    <>
      <Dashboard>
        <ScreenMenu
          title={'Client List'}
          navigateTo={'AddClient'}
          buttonText="Add Client"
          bgColor={theme.colors.clientPrimary}
        />
        <ClientList />
      </Dashboard>
    </>
  )
}

export default Client
