import React from 'react'
import { Dashboard, ScreenMenu } from '../../components'
import theme from '../../utils/theme/theme'

const Payments = () => {
  return (
    <>
      <Dashboard>
        <ScreenMenu
          title={'Payments'}
          navigateTo={'AddRound'}
          buttonText="Add Payment"
          bgColor={theme.colors.paymentPrimary}
        />
      </Dashboard>
    </>
  )
}

export default Payments
