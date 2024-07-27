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
          Welcome to PlanMe. A intuitive database, planner and invoicing
          application purpose built to streamline your business and improve
          profits.
        </Text>

        <View style={styles.instructions}>
          <Text style={styles.primaryText}>
            To get started follow steps 1-6.
          </Text>

          <Text style={styles.tertiaryText}>
            Navigate back to this home page after each step.
          </Text>
        </View>

        <View style={styles.instructionWrapper}>
          {/* -------------------- 1. Add Client ---------------------------- */}
          <InstructionBox
            number="1"
            text="Add Client"
            secondaryText="Click here to go to the client database. Click add client and fill in the form. These details are used for invoicing purposes."
            teriaryText=""
            navigateTo="ClientMenu"
            backgroundColor={theme.colors.clientPrimary}
          />

          {/* -------------------- 2. Add Job ---------------------------- */}
          <InstructionBox
            number="2"
            text="Add Job"
            secondaryText="Click here to go to the job database. Click add job and fill in the form. Jobs must be added to a round, which can be scheduled to the planner."
            navigateTo="JobsMenu"
            backgroundColor={theme.colors.jobPrimary}
          />

          {/* -------------------- 3. Add Round ---------------------------- */}
          <InstructionBox
            number="3"
            text="Add Round"
            secondaryText="Click here to go to the round database. Click add round and fill in the form. Rounds contain single or multiple jobs, that can be scheduled to the planner."
            navigateTo="RoundMenu"
            backgroundColor={theme.colors.roundPrimary}
          />

          {/* -------------------- 4. Schedule Round ---------------------------- */}
          <InstructionBox
            number="4"
            text="Schedule Round"
            secondaryText="Click here to go to the planner. Click on the menu button, then click schedule round. Fill in the form by selecting round, one off or recurring, and finally the date."
            navigateTo="Planner"
            backgroundColor={theme.colors.plannerPrimary}
          />
          {/* -------------------- 5. Set job to complete ---------------------------- */}
          <InstructionBox
            number="5"
            text="Set Job To Complete"
            secondaryText="Click here to go to the planner. Navigate to the date of the round. Click the round name, click goto ticket. Click the pencil icon and click the job complete toggle. "
            navigateTo="Planner"
            backgroundColor={theme.colors.primary}
          />
          {/* -------------------- 5. Invoice Job ---------------------------- */}
          <InstructionBox
            number="6"
            text="Invoice Job"
            teriaryText="Click here to go to invoice database. Click find all due invoices. Click the eye icon to view invoice details. You can download a PDF of the invoice to print or email to the client. Click the invoice paid toggle to mark as paid. "
            navigateTo="InvoiceListView"
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
  instructions: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    marginHorizontal: 12,
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
    textAlign: 'center',
    color: theme.colors.primary,
    marginTop: 16,
    fontFamily: 'Roboto_700Bold',
  },
  secondaryText: {
    fontSize: 18,
    color: theme.colors.primary,
    margin: 4,
    textAlign: 'center',
    marginHorizontal: 12,
    maxWidth: 800,
    fontFamily: 'Roboto_400Regular',
  },
  tertiaryText: {
    fontSize: 15,
    color: theme.colors.primary,
    textAlign: 'center',
    marginHorizontal: 8,
    maxWidth: 800,
    marginBottom: 4,
  },
})

export default Welcome
