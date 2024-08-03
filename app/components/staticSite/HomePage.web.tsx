import React from 'react'
import PlanMeLogo from '../PlanMeLogo/PlanMeLogo'
import { CSSProperties } from 'react'
import Button from '../../ui/button/Button'
import theme from '../../utils/theme/theme'
import { useDeviceType } from '../../utils/hooks/useDeviceTypes'
import { useWindowDimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../screens/stackNavigator/StackNavigator'

const HomePage = () => {
  const { isLargeWeb } = useDeviceType()
  const { width } = useWindowDimensions()
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  const handleSignUp = () => {
    navigation.navigate('SignIn')
  }

  const handleFeaturesClick = () => {
    const featuresSection = document.getElementById('features')
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const logoStyle = isLargeWeb ? styles.logo : styles.logoSmall
  const h1Style = isLargeWeb ? styles.h1 : styles.h1Small
  const h2Style = isLargeWeb ? styles.h2 : styles.h2Small
  const heroStyle = isLargeWeb ? styles.hero : styles.heroSmall
  const buttonContainerStyle = isLargeWeb
    ? styles.buttonContainer
    : styles.buttonContainerSmall
  const heroTextContainerStyle = isLargeWeb
    ? styles.heroTextContainer
    : styles.heroTextContaineSmall
  const featuresContainerStyle = isLargeWeb
    ? styles.featuresContainer
    : styles.featuresContainerSmall
  const featureImageContainerStyle = isLargeWeb
    ? styles.featureImageContainer
    : styles.featureImageContainerSmall
  const featureTextContainerStyle = isLargeWeb
    ? styles.featureTextContainer
    : styles.featureTextContaineSmall
  const featureFontSize =
    width < 500 ? { fontSize: '13.5px' } : { fontSize: '16px' }
  const featureTextStyle = isLargeWeb
    ? { ...styles.featureText, ...featureFontSize }
    : { ...styles.featureTextSmall, ...featureFontSize }

  return (
    <section style={styles.container}>
      <nav style={styles.nav}>
        <div style={logoStyle}>
          <PlanMeLogo width={200} height={48} />
        </div>
        {isLargeWeb ? (
          <div style={styles.navItems}>
            <a style={styles.navItem} onClick={handleFeaturesClick}>
              FEATURES
            </a>
            <a style={styles.navItem} onClick={handleSignUp}>
              SIGN UP
            </a>
            <p style={styles.navItem} onClick={handleSignUp}>
              LOGIN
            </p>
          </div>
        ) : (
          <p style={styles.navItem} onClick={handleSignUp}>
            LOGIN
          </p>
        )}
      </nav>

      <div style={heroStyle}>
        <img
          src={require('../../../assets/sky_clean_blur_extended.jpg')}
          style={styles.backgroundImage2}
        />

        <div style={heroTextContainerStyle}>
          <h1 style={h1Style}>Welcome to PlanMe</h1>
          <h2 style={h2Style}>
            A intuitive database, planner and invoicing application for{' '}
            <span style={{ color: theme.colors.lightBlue }}>
              window cleaning professionals
            </span>
            . Purpose built to streamline your business and improve profits.
          </h2>

          <div style={buttonContainerStyle}>
            <Button
              text="Get Started"
              onPress={handleSignUp}
              backgroundColor={theme.colors.plannerPrimary}
              width={200}
            />
          </div>
        </div>

        {isLargeWeb ? <div style={styles.imageContainer}></div> : null}
      </div>

      <div style={featuresContainerStyle} id="features">
        <div style={featureImageContainerStyle}>
          <img
            src={require('../../../assets/planner_screenshot.jpg')}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        <div style={featureTextContainerStyle}>
          <p style={styles.featureHeadingStyle}>Features</p>

          <div style={styles.featureCard}>
            <img
              src={require('../../../assets/calender_red.png')}
              style={{ width: 50, height: 50, padding: '20px' }}
            />
            <div style={styles.featureCardTextContainer}>
              <p style={styles.featureTitle}>Planner</p>
              <p style={featureTextStyle}>
                Simple planner system that schedules one off or recurring
                rounds. Rounds can be rescheduled easily from a computer or
                mobile device.
              </p>
            </div>
          </div>

          <div style={styles.featureCard}>
            <img
              src={require('../../../assets/graph.png')}
              style={{ width: 50, height: 50, padding: '20px' }}
            />
            <div style={styles.featureCardTextContainer}>
              <p style={styles.featureTitle}>Business Stastistics</p>
              <p style={featureTextStyle}>
                Track your business performance with our easy to use statistics
                page. Real time updates of your NET income, average price per
                hour and more.
              </p>
            </div>
          </div>

          <div style={styles.featureCard}>
            <img
              src={require('../../../assets/automate.png')}
              style={{ width: 50, height: 50, padding: '20px' }}
            />
            <div style={styles.featureCardTextContainer}>
              <p style={styles.featureTitle}>Automatied Invoicing</p>
              <p style={featureTextStyle}>
                Automated invoice generation and payment tracking. Email PDF
                invoices to clients from any device.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.footer}>
        <p style={styles.footerTitle}>PlanME</p>
        <a
          style={styles.footerText}
          onClick={() => {
            navigation.navigate('PrivacyPolicy')
          }}
        >
          Privacy Policy
        </a>

        <a style={styles.footerText} href="mailto:planmewindows@gmail.com">
          Support
        </a>

        <a style={styles.footerText} href="mailto:planmewindows@gmail.com">
          planmewindows@gmail.com
        </a>
      </div>
    </section>
  )
}

const styles: { [key: string]: CSSProperties } = {
  container: {
    minHeight: '100vh',
    minWidth: '100vw',
    background: '#2272ab',
    overflowX: 'hidden',
  },
  backgroundImage2: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 0,
    opacity: 0.2,
    objectFit: 'cover',
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    paddingLeft: '30px',
    paddingRight: '20px',
    paddingTop: '10px',
    paddingBottom: '10px',
  },
  logoSmall: {
    width: '100%',
    paddingLeft: 15,
    paddingRight: 0,
    paddingTop: '10px',
    paddingBottom: '10px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navItems: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '30px',
    paddingRight: '30px',
  },
  navItem: {
    color: 'white',
    fontSize: '20px',
    fontFamily: 'Roboto_400Regular',
    minWidth: '80px',
    cursor: 'pointer',
  },
  hero: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    height: '70vh',
    minHeight: '500px',
    overflow: 'hidden',
  },
  heroSmall: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    height: 'fit-content',
    overflow: 'hidden',
  },
  heroTextContainer: {
    width: '580px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 5,
    marginRight: 5,
  },
  heroTextContaineSmall: {
    width: '100%',
    maxWidth: '700px',
    height: 'fit-content',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 30,
    marginBottom: 40,
    marginLeft: 15,
    marginRight: 15,
    zIndex: 2,
  },
  h1: {
    fontFamily: 'Roboto_700Bold',
    fontSize: '38px',
    color: theme.colors.lightBlue,
    marginTop: 30,
    marginBottom: 0,
    marginLeft: 30,
    marginRight: 15,
    padding: 0,
  },
  h1Small: {
    fontFamily: 'Roboto_700Bold',
    fontSize: '35px',
    color: theme.colors.lightBlue,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    padding: 0,
    textAlign: 'center',
    width: '100%',
  },
  h2: {
    color: 'white',
    fontFamily: 'Roboto_300Light',
    fontSize: '20px',
    marginLeft: 30,
  },
  h2Small: {
    color: 'white',
    fontFamily: 'Roboto_300Light',
    fontSize: '18px',
    textAlign: 'center',
    marginLeft: 0,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '20px',
    marginTop: 20,
    marginLeft: 30,
  },
  buttonContainerSmall: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '20px',
    width: '100%',
    marginTop: 0,
    marginLeft: 0,
    padding: 0,
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '35%',
  },
  imageContainerSmall: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    zIndex: 0,
    opacity: 1,
    objectFit: 'cover',
    borderWidth: 1,
  },
  imageSmall: {
    width: '100%',
    height: '100px',
    maxWidth: '400px',
    zIndex: 0,
    opacity: 1,
    objectFit: 'contain',
  },
  featuresContainer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    height: '70vh',
    minHeight: '500px',
    overflow: 'hidden',
    marginLeft: 20,
    marginRight: 20,
    paddingBottom: 40,
  },
  featuresContainerSmall: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'column',
    height: 'fit-content',
    overflow: 'hidden',
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 0,
    marginRight: 0,
  },
  featureImageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '35%',
    borderRadius: '20px',
    overflow: 'hidden',
    borderWidth: 10,
    borderStyle: 'solid',
    borderColor: theme.colors.black,
    marginRight: 20,
  },
  featureImageContainerSmall: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    maxWidth: '450px',
    borderRadius: '20px',
    overflow: 'hidden',
    borderWidth: 10,
    borderStyle: 'solid',
    borderColor: theme.colors.black,
  },
  featureHeading: {
    fontFamily: 'Roboto_700Bold',
    fontSize: '24px',
    color: theme.colors.lightBlue,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    padding: 0,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'red',
  },
  featureHeadingSmall: {
    fontFamily: 'Roboto_700Bold',
    fontSize: '35px',
    color: theme.colors.lightBlue,
    padding: 0,
    marginTop: 20,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    textAlign: 'center',
    width: '100%',
  },
  featureTextContainer: {
    width: '550px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '20px',
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  featureTextContaineSmall: {
    width: '100%',
    maxWidth: '700px',
    height: 'fit-content',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 40,
    marginLeft: 15,
    marginRight: 15,
    gap: '20px',
    zIndex: 2,
  },
  featureHeadingStyle: {
    fontFamily: 'Roboto_700Bold',
    fontSize: '30px',
    color: theme.colors.lightBlue,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    padding: 0,
  },
  featureCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: '20px',
    backgroundColor: theme.colors.lightBlue,
    width: '100%',
    minWidth: '300px',
    height: 'fit-content',
    paddingTop: 6,
    paddingBottom: 6,
    marginLeft: 10,
    marginRight: 10,
  },
  featureCardTextContainer: {
    margin: 0,
    padding: 0,
    paddingTop: 5,
    paddingBottom: 5,
    marginRight: '5px',
  },
  featureTitle: {
    fontFamily: 'Roboto_700Bold',
    fontSize: '18px',
    color: theme.colors.primary,
    marginTop: 0,
    marginBottom: 2,
    marginLeft: 0,
    marginRight: 0,
    padding: 0,
  },
  featureText: {
    fontFamily: 'Roboto_400Regular',
    fontSize: '16px',
    color: theme.colors.black,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    padding: 0,
    paddingRight: 10,
  },
  featureTextSmall: {
    fontFamily: 'Roboto_400Regular',
    fontSize: '16px',
    color: theme.colors.black,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    padding: 0,
    paddingRight: 10,
    // textAlign: 'justify',
    // textJustify: 'inter-word',
  },
  footer: {
    width: '100vw',
    height: '200px',
    background: theme.colors.tertiaryBlue,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    flexDirection: 'column',
    gap: 2,
  },
  footerTitle: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 24,
    color: theme.colors.lightBlue,
    textAlign: 'right',
    marginTop: 20,
    marginBottom: 5,
    paddingRight: 30,
  },
  footerText: {
    fontFamily: 'Roboto_400Regular',
    color: theme.colors.white,
    textAlign: 'right',
    margin: 0,
    marginBottom: 4,
    cursor: 'pointer',
    textDecoration: 'none',
    paddingRight: 30,
  },
}

export default HomePage
