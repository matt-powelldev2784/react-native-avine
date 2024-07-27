import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useDeviceType } from '../../../../utils/hooks/useDeviceTypes'
import theme from '../../../../utils/theme/theme'

interface FormFlowTitlesProps {
  activeStep: number
}

const FormFlowTitles = ({ activeStep }: FormFlowTitlesProps) => {
  const { isSmallWeb, isNative } = useDeviceType()
  const isSmallDevice = isSmallWeb || isNative

  return (
    <View
      style={
        isSmallDevice ? styles.titleContainerSmallWeb : styles.titleContainer
      }
    >
      <Text style={activeStep === 0 ? styles.titleActive : styles.title}>
        {isSmallDevice ? ' Edit\nClient\nDetails' : ' Edit Client Details'}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 16,
    marginTop: 16,
  },
  titleContainerSmallWeb: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 16,
  },
  titleActive: {
    fontSize: 15,
    color: 'white',
    backgroundColor: theme.colors.clientPrimary,
    borderRadius: 8,
    padding: 7,
    textAlign: 'center',
    minWidth: 88,
    overflow: 'hidden',
    fontFamily: 'Roboto_700Bold',
  },
  title: {
    fontSize: 15,
    color: theme.colors.clientPrimary,
    borderRadius: 8,
    padding: 7,
    textAlign: 'center',
    minWidth: 80,
    overflow: 'hidden',
    fontFamily: 'Roboto_700Bold',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: theme.colors.clientPrimary,
  },
  line: {
    width: 32,
    backgroundColor: theme.colors.clientPrimary,
    borderWidth: 3,
    borderStyle: 'solid',
    borderColor: theme.colors.clientPrimary,
  },
  lineSmallWeb: {
    width: 24,
    backgroundColor: theme.colors.clientPrimary,
    borderWidth: 3,
    borderStyle: 'solid',
    borderColor: theme.colors.clientPrimary,
  },
})

export default FormFlowTitles
