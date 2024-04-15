import React from 'react'
import { Dashboard, AddCompanyInfoForm, ScreenMenu } from '../../components'
import theme from '../../utils/theme/theme'
import { FlatList, View } from 'react-native'

const AddCompanyInfo = () => {
  // flatlist is used to render children to allow the
  // dashboard header to be sticky in the webview
  const childrenArray = [<AddCompanyInfoForm key={0} />]

  return (
    <>
      <Dashboard>
        <ScreenMenu
          title={'Add Company Information'}
          bgColor={theme.colors.invoicePrimary}
        />

        <FlatList
          style={{
            flex: 1,
            width: '100%',
          }}
          data={childrenArray}
          renderItem={({ item }) => <View>{item}</View>}
          keyExtractor={(item, index) => `child-${index}`}
        />
      </Dashboard>
    </>
  )
}

export default AddCompanyInfo
