import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native'
import { Button } from 'react-native-elements'

import LOGO from '../../assets/img/logo.png'

// components
import AuthInput from '../../components/AuthInput.component'

export default class EnterPhoneNumberScreen extends Component {
  state = {
    phoneNumber: ''
  }
  submit = () => {
    try {
      const { phoneNumber } = this.state
      if (phoneNumber.length < 10) {
        throw new Error('Please enter your phone number')
      }
      this.props.navigation.navigate('VerifyPhone', { phoneNumber })
    } catch (error) {
      Alert.alert('Error', error.message)
    }
  }
  render () {
    const { phoneNumber } = this.state
    return (
      <ScrollView contentContainerStyle={{ flex: 1 }} scrollEnabled={false}>
        <View style={styles.screen}>
          <Image source={LOGO} style={styles.logo} />
          <Text style={styles.title}>ORDER KING</Text>
          <View style={styles.br} />
          <AuthInput
            placeholder="Phone Number"
            icon="mobile"
            keyboardType="phone-pad"
            maxLength={10}
            value={phoneNumber}
            onChangeText={phoneNumber => this.setState({ phoneNumber })}
          />
          <View style={styles.br} />
          <Button
            title="Sign Up"
            buttonStyle={styles.button}
            containerStyle={styles.btnContainer}
            titleStyle={styles.btnText}
            onPress={this.submit}
          />
          <View style={styles.br} />
          <TouchableOpacity>
            <Text style={styles.span}>Terms and Conditions</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  span: {
    color: '#7E7E7E'
  },
  btnContainer: {
    width: '100%'
  },
  btnText: {
    fontSize: 16
  },
  button: {
    backgroundColor: '#E45655',
    borderRadius: 30,
    width: '100%',
    padding: 10,
    shadowColor: '#dbdbdb',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 10
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
