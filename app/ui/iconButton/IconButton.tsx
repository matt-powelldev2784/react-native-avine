import { TouchableOpacity, Image } from 'react-native'
import React from 'react'

interface IconButtonProps {
  onPress: () => void
  imgSource: any
  size: number
}

const IconButton = ({ onPress, imgSource, size }: IconButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={imgSource} style={{ width: size, height: size }} />
    </TouchableOpacity>
  )
}

export default IconButton
