import { useState, useEffect } from 'react'
import { Dimensions, ScaledSize } from 'react-native'

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width)

  useEffect(() => {
    const onChange = ({ window: { width } }: { window: ScaledSize }) => {
      setWindowWidth(width)
    }

    const subscription = Dimensions.addEventListener('change', onChange)

    return () => {
      subscription.remove()
    }
  }, [])

  return windowWidth
}

export default useWindowWidth
