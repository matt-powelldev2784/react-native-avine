import React from 'react'
import PlanMeLogo from '../PlanMeLogo/PlanMeLogo'
import { CSSProperties } from 'react'
import Button from '../../ui/button/Button'
import theme from '../../utils/theme/theme'
import { useDeviceType } from '../../utils/hooks/useDeviceTypes'

const HomePage = () => {
  const { isLargeWeb } = useDeviceType()

  const logoStyle = isLargeWeb ? styles.logo : styles.logoSmall
  const h1Style = isLargeWeb ? styles.h1 : styles.h1Small
  const h2Style = isLargeWeb ? styles.h2 : styles.h2Small
  const heroStyle = isLargeWeb ? styles.hero : styles.heroSmall
  const buttonContainerStyle = isLargeWeb
    ? styles.buttonContainer
    : styles.buttonContainerSmall
  const textContainerStyle = isLargeWeb
    ? styles.heroTextContainer
    : styles.heroTextContaineSmall

  return (
    <section style={styles.container}>
      {/* <img
        src={require('../../../assets/sky_clean_blur.jpg')}
        style={styles.backgroundImage}
      /> */}

      <nav style={styles.nav}>
        <div style={logoStyle}>
          <PlanMeLogo width={200} height={48} />
        </div>
        {isLargeWeb ? (
          <div style={styles.navItems}>
            <p style={styles.navItem}>FEATURES</p>
            <p style={styles.navItem}>SIGN UP</p>
            <p style={styles.navItem}>LOGIN</p>
          </div>
        ) : null}
      </nav>

      <div style={heroStyle}>
        <img
          src={require('../../../assets/sky_clean_blur_extended.jpg')}
          style={styles.backgroundImage2}
        />

        <div style={textContainerStyle}>
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
              text="SIGN UP TODAY"
              onPress={() => console.log('Sign Up')}
              backgroundColor={theme.colors.plannerPrimary}
              width={200}
            />
          </div>
        </div>

        {isLargeWeb ? <div style={styles.imageContainer}></div> : null}
      </div>

      <div style={heroStyle}>
        <div style={styles.featureContainer}>
          <img
            src={require('../../../assets/planner_screenshot.jpg')}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
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
    flexWrap: 'wrap',
  },
  logo: {
    paddingLeft: '30px',
    paddingRight: '20px',
    paddingTop: '10px',
    paddingBottom: '10px',
  },
  logoSmall: {
    width: '100%',
    paddingLeft: '30px',
    paddingRight: '20px',
    paddingTop: '10px',
    paddingBottom: '10px',
    display: 'flex',
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
  },
  hero: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: '70vh',
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
  },
  heroTextContaineSmall: {
    width: '100%',
    maxWidth: '700px',
    height: 'fit-content',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: '30px',
    marginBottom: '40px',
    marginLeft: '15px',
    marginRight: '15px',
    zIndex: 2,
  },
  h1: {
    fontFamily: 'Roboto_700Bold',
    fontSize: '38px',
    color: theme.colors.lightBlue,
    margin: 0,
    marginLeft: '30px',
    padding: 0,
  },
  h1Small: {
    fontFamily: 'Roboto_700Bold',
    fontSize: '35px',
    color: theme.colors.lightBlue,
    margin: 0,
    padding: 0,
    textAlign: 'center',
    width: '100%',
  },
  h2: {
    color: 'white',
    fontFamily: 'Roboto_300Light',
    fontSize: '20px',
    marginLeft: '30px',
  },
  h2Small: {
    color: 'white',
    fontFamily: 'Roboto_300Light',
    fontSize: '18px',
    textAlign: 'center',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '20px',
    marginTop: '20px',
    marginLeft: '30px',
  },
  buttonContainerSmall: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: '20px',
    width: '100%',
    margin: 0,
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
  featureContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '35%',
    borderRadius: '20px',
    overflow: 'hidden',
    borderWidth: 10,
    borderStyle: 'solid',
    borderColor: theme.colors.black,
  },
}

export default HomePage
