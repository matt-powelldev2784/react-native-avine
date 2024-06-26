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
        {isSmallDevice ? ' Update\nInvoice' : ' Update Invoice'}
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
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    padding: 7,
    textAlign: 'center',
    minWidth: 88,
    overflow: 'hidden',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
    backgroundColor: theme.colors.formFlowSecondary,
    borderRadius: 8,
    padding: 7,
    textAlign: 'center',
    minWidth: 88,
    overflow: 'hidden',
  },
  line: {
    width: 32,
    backgroundColor: theme.colors.primary,
    borderWidth: 3,
    borderStyle: 'solid',
    borderColor: theme.colors.primary,
  },
  lineSmallWeb: {
    width: 24,
    backgroundColor: theme.colors.primary,
    borderWidth: 3,
    borderStyle: 'solid',
    borderColor: theme.colors.primary,
  },
})

export default FormFlowTitles
