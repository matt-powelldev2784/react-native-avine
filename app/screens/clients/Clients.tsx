import React from 'react'
import { Dashboard, ScreenMenu } from '../../components'
import theme from '../../utils/theme/theme'

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
      </Dashboard>
    </>
  )
}

export default Client
