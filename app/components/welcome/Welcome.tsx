import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import theme from '../../utils/theme/theme'
import { useAuth } from '../auth/AuthProvider'
import InstructionBox from './components/InstructionBox'

const Welcome = () => {
  const { userInfo } = useAuth()

  return (
    <View style={styles.container}>
      <View style={styles.flexContainer}>
        <Image
          source={require('../../../assets/hi.png')}
          style={{ width: 83, height: 74.5, marginBottom: 8 }}
        />

        <Text style={styles.primaryText}>
          {userInfo?.displayName ? `Hello, ${userInfo.displayName}!` : ''}
        </Text>

        <Text style={styles.secondaryText}>
          Welcome to PlanMe. A free database, planner and invoicing application
          built to make life easy for window cleaning professionals.
        </Text>

        <Text style={styles.primaryText}>To get started:</Text>

        <View style={styles.instructionWrapper}>
          {/* -------------------- 1. Add Client ---------------------------- */}
          <InstructionBox
            number="1"
            text="Add Client"
            secondaryText="Click here to add a client. Every job requires a client for invoicing purposes."
            navigateTo="AddClient"
            backgroundColor={theme.colors.clientPrimary}
          />

          {/* -------------------- 2. Add Job ---------------------------- */}
          <InstructionBox
            number="2"
            text="Add Job"
            secondaryText="Click here to add a job. Follow the instructions in the form."
            navigateTo="AddJob"
            backgroundColor={theme.colors.jobPrimary}
          />

          {/* -------------------- 3. Add Round ---------------------------- */}
          <InstructionBox
            number="3"
            text="Add Round"
            secondaryText="Click here to add a round. Each round can contain multiple jobs, which can be ordered to your preference."
            navigateTo="AddRound"
            backgroundColor={theme.colors.roundPrimary}
          />

          {/* -------------------- 4. Schedule Round ---------------------------- */}
          <InstructionBox
            number="4"
            text="Schedule Round"
            secondaryText="Click here to scheudle a round. The round can be scheduled as a one-off clean or recurring round."
            navigateTo="Planner"
            backgroundColor={theme.colors.plannerPrimary}
          />
          {/* -------------------- 5. Set job to complete ---------------------------- */}
          <InstructionBox
            number="5"
            text="Set Job To Complete"
            secondaryText="Click here to go to the planner. Click on a job in the planner and set to complete."
            navigateTo="Planner"
            backgroundColor={theme.colors.plannerPrimary}
          />
          {/* -------------------- 5. Invoice Job ---------------------------- */}
          <InstructionBox
            number="6"
            text="Invoice Job"
            secondaryText="Click here to display due invoices. PDF invoices can be downloaded and emailed to clients. Once paid, the invoice can be marked as paid."
            navigateTo="DueInvoices"
            backgroundColor={theme.colors.invoicePrimary}
          />

          {/* -------------------------------------------------------------- */}
        </View>
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
  instructionWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 8,
    marginBottom: 50,
    maxWidth: 950,
  },

  primaryText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginTop: 16,
  },
  secondaryText: {
    fontSize: 18,
    color: theme.colors.primary,
    margin: 4,
    textAlign: 'center',
    marginHorizontal: 12,
    maxWidth: 800,
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
    marginVertical: 16,
    marginTop: 16,
    width: 200,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
})

export default Welcome
