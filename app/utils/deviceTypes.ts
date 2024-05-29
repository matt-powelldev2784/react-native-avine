import { Platform, useWindowDimensions } from 'react-native'

export const useDeviceType = () => {
  const windowWidth = useWindowDimensions().width

  const isWeb = Platform.OS === 'web'
  const isLargeWeb = Platform.OS === 'web' && windowWidth > 1000
  const isSmallWeb = Platform.OS === 'web' && windowWidth < 1000 
  const isNative = Platform.OS !== 'web' // absolute

  return { isWeb, isLargeWeb, isSmallWeb, isNative }
}
