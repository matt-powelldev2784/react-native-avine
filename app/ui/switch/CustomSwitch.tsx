import { View } from 'react-native'
import React from 'react'
import { Switch } from 'react-native-switch'
import theme from '../../utils/theme/theme'

interface CustomSwitchProps {
  value: boolean
  onValueChange: () => void
  disabled: boolean
}

const CustomSwitch = ({
  value,
  onValueChange,
  disabled,
}: CustomSwitchProps) => {
  return (
    <View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        activeText={'On'}
        inActiveText={'Off'}
        circleSize={30}
        barHeight={38}
        circleBorderWidth={0}
        backgroundActive={theme.colors.primary}
        backgroundInactive={'#C4C4C4'}
        circleActiveColor={'white'}
        circleInActiveColor={theme.colors.primary}
        // renderInsideCircle={() => <CustomComponent />} // custom component to render inside the Switch circle (Text, Image, etc.)
        changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
        innerCircleStyle={{}} // style for inner animated circle for what you (may) be rendering inside the circle
        outerCircleStyle={{}} // style for outer animated circle
        renderActiveText={false}
        renderInActiveText={false}
        switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
        switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
        switchWidthMultiplier={2.5} // multiplied by the `circleSize` prop to calculate total width of the Switch
        switchBorderRadius={0} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
      />
    </View>
  )
}

export default CustomSwitch
