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
  const mainStyle = isLargeWeb ? styles.main : styles.mainSmall
  const buttonContainerStyle = isLargeWeb
    ? styles.buttonContainer
    : styles.buttonContainerSmall
  const textContainerStyle = isLargeWeb
    ? styles.mainTextContainer
    : styles.mainTextContaineSmall

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

      <div style={mainStyle}>
        <img
          src={require('../../../assets/sky_clean_blur_extended.jpg')}
          style={styles.backgroundImage2}
        />

        <div style={textContainerStyle}>
          <h1 style={h1Style}>Welcome to PlanMe</h1>
          <h2 style={h2Style}>
            A intuitive database, planner and invoicing application for window
            cleaning professionals. Purpose built to streamline your business
            and improve profits.
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
    </section>
  )
}

const styles: { [key: string]: CSSProperties } = {
  container: {
    minHeight: '100vh',
    minWidth: '100vw',
    background: '#2272ab',
    // background: 'linear-gradient(45deg, #2272ab 20%, #00b4e1 95%)',
    // background: 'linear-gradient(315deg, #2272ab 60%, #00b4e1 98%)',
    overflowX: 'hidden',
  },
  backgroundImage: {
    position: 'absolute',
    top: '70px',
    width: '100%',
    height: '200px',
    zIndex: 0,
    opacity: 0.2,
    objectFit: 'cover',
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
  main: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: '70vh',
    overflow: 'hidden',
  },
  mainSmall: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    height: 'fit-content',
    overflow: 'hidden',
  },
  mainTextContainer: {
    width: '580px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  mainTextContaineSmall: {
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
    color: '#d2e2ee',
    margin: 0,
    marginLeft: '30px',
    padding: 0,
  },
  h1Small: {
    fontFamily: 'Roboto_700Bold',
    fontSize: '35px',
    color: '#d2e2ee',
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
}

export default HomePage
