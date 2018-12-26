import React from 'react'
import { ImageBackground, StyleSheet, Image } from 'react-native'

import BACKGROUND from '../assets/img/splash-bg.png'
import LOGO from '../assets/img/white-logo.png'

export default props => {
  return (
    <ImageBackground style={styles.screen} source={BACKGROUND}>
      <Image source={LOGO} style={styles.logo} />
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  logo: {
    width: '100%',
    resizeMode: 'contain'
  },
  screen: {
    flex: 1,
    width: '100%',
    justifyContent: 'center'
  }
})
