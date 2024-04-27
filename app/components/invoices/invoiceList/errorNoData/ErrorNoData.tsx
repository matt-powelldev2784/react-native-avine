import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import theme from '../../../../utils/theme/theme'

interface ErrorNoDataProps {
  invoiceType: string
}

const ErrorNoData = ({ invoiceType }: ErrorNoDataProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.flexContainer}>
        <Image
          source={require('../../../../../assets/clipboard.png')}
          style={{ width: 100, height: 135, marginBottom: 8 }}
        />

        <Text style={styles.primaryText}>No Invoice Data</Text>

        {invoiceType === 'due' ? (
          <Text style={styles.secondaryText}>
            You currenly have no {invoiceType} invoices. Invoices will appear
            here once you have completed a job.
          </Text>
        ) : null}

        {invoiceType === 'paid' ? (
          <Text style={styles.secondaryText}>
            You currenly have no {invoiceType} invoices. Invoices will appear
            here once you have completed a job and set the invoice status to
            paid.
          </Text>
        ) : null}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    marginVertical: 36,
  },
  flexContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    margin: 4,
  },
  primaryText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginVertical: 16,
  },
  secondaryText: {
    fontSize: 18,
    color: theme.colors.primary,
    margin: 4,
    textAlign: 'center',
    marginHorizontal: 50,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 32,
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    gap: 8,
    marginBottom: 60,
    marginTop: 16,
    width: 200,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
})

export default ErrorNoData
