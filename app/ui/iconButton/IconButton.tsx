import { TouchableOpacity, Image } from 'react-native'
import React from 'react'

interface IconButtonProps {
  onPress: () => void
  imgSource: any
  size: number
  width?: number
  height?: number
}

const IconButton = ({
  onPress,
  imgSource,
  size,
  width,
  height,
}: IconButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={imgSource}
        style={{ width: width || size, height: height || size }}
      />
    </TouchableOpacity>
  )
}

export default IconButton
