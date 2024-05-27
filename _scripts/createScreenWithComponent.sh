#!/bin/bash
# to run this script, use the following command from the root of the project:
# bash ./_scripts/createScreenWithComponent.sh

# Input parameters
folderName="rounds"
ScreenName="RoundMenu"
ComponentName="RoundMenu"
componentFolderName="roundMenu"
navigateTo="navigateTo"
buttonText="buttonText"
screenTitle="Round Database"
importComment="rounds"

# Create the directory if it doesn't exist
mkdir -p "./app/screens/$folderName"
mkdir -p "./app/components/$folderName/$componentFolderName"

# Create the .tsx file with the specified content
cat << EOF > "./app/screens/$folderName/$ScreenName.tsx"
import React from 'react'
import { Dashboard, $ComponentName, ScreenMenu } from '../../components'
import theme from '../../utils/theme/theme'
import { FlatList, View } from 'react-native'

const $ScreenName = () => {
  // flatlist is used to render children to allow the
  // dashboard header to be sticky in the webview
  const childrenArray = [<$ComponentName key={0} />]

  return (
    <>
      <Dashboard>
        <ScreenMenu
          title={'$screenTitle'}
          bgColor={theme.colors.invoicePrimary}
          navigateTo="$navigateTo"
          buttonText="$buttonText"
        />

        <FlatList
          style={{
            flex: 1,
            width: '100%',
            backgroundColor: theme.colors.backgroundGrey,
          }}
          data={childrenArray}
          renderItem={({ item }) => <View>{item}</View>}
          keyExtractor={(item, index) => \`child-\${index}\`}
        />
      </Dashboard>
    </>
  )
}

export default $ScreenName
EOF

# Create the component .tsx file with the specified content
cat << EOF > "./app/components/$folderName/$componentFolderName/$ComponentName.tsx"
import { View, Text } from 'react-native'
import React from 'react'

const $ComponentName = () => {
  return (
    <View>
      <Text>$ComponentName</Text>
    </View>
  )
}

export default $ComponentName
EOF

echo "Screen file created at ./app/screens/$folderName/$ScreenName.tsx"
echo "Component file created at ./app/components/$folderName/$ComponentName.tsx"

# Add import and export to screens index.ts
sed -i '' "/^\/\/$importComment/a\\
import $ScreenName from './$folderName/$ScreenName'
" ./app/screens/index.ts
sed -i '' "/^export {/a\\
  $ScreenName,
" ./app/screens/index.ts

# Add import and export to components index.ts
sed -i '' "/^\/\/$importComment/a\\
import $ComponentName from './$folderName/$componentFolderName/$ComponentName'
" ./app/components/index.tsx
sed -i '' "/^export {/a\\
  $ComponentName,
" ./app/components/index.tsx

echo "Import and export added to ./app/screens/index.ts"
echo "Import and export added to ./app/components/index.tsx"
