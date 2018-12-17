import React, { Component } from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'

import LOGO from '../../assets/img/logo.png'
import FACEBOOK from '../../assets/icon/fb.png'
import MOBILE from '../../assets/icon/mobile.png'

export default class RegisterScreen extends Component {
  render () {
    const { navigation } = this.props

    return (
      <View style={styles.screen}>
        <Image source={LOGO} style={styles.logo} />
        <Text style={styles.title}>ORDER KING</Text>
        <View style={styles.br} />
        <Button
          title="Sign Up with Facebook"
          buttonStyle={[styles.button, styles.fbButton]}
          containerStyle={styles.btnContainer}
          titleStyle={[styles.btnText, styles.fbBtnText]}
          icon={<Image source={FACEBOOK} style={styles.btnIcon} />}
        />
        <View style={styles.br} />
        <Button
          title="Sign Up with Phone Number"
          buttonStyle={styles.button}
          containerStyle={styles.btnContainer}
          titleStyle={styles.btnText}
          icon={<Image source={MOBILE} style={styles.btnIcon} />}
          onPress={() => navigation.navigate('EnterPhoneNumber')}
        />
        <View style={styles.br} />
        <View style={styles.br} />
        <Text style={styles.span}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Log In Here</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  btnIcon: {
    position: 'absolute',
    left: 0,
    marginLeft: 30
  },
  fbBtnText: {
    color: '#FFF'
  },
  fbButton: {
    backgroundColor: '#3E55A5'
  },
  link: {
    color: '#4E5766',
    fontSize: 20,
    fontWeight: '500',
    marginVertical: 10
  },
  btnContainer: {
    width: '100%'
  },
  btnText: {
    fontSize: 16,
    color: '#2F4773'
  },
  button: {
    backgroundColor: '#FFF',
    borderRadius: 30,
    width: '100%',
    padding: 10,
    shadowColor: '#dbdbdb',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    position: 'relative'
  },
  br: {
    marginVertical: 10
  },
  title: {
    color: '#E45655',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 100
  },
  logo: {
    width: '50%'
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '10%',
    backgroundColor: '#FFF'
  }
})
