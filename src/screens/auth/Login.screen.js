import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import { Button } from 'react-native-elements'

import LOGO from '../../assets/img/logo.png'

// components
import AuthInput from '../../components/AuthInput.component'

export default class LoginScreen extends Component {
  state = {
    username: '',
    password: ''
  }
  render () {
    const { navigation } = this.props
    const { username, password } = this.state
    return (
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={styles.screen}>
          <Image source={LOGO} style={styles.logo} />
          <Text style={styles.title}>ORDER KING</Text>
          <View style={styles.br} />
          <AuthInput
            placeholder="Username"
            icon="avatar"
            value={username}
            onChangeText={username => this.setState({ username })}
          />
          <View style={styles.br} />
          <AuthInput
            placeholder="Password"
            icon="password"
            secureTextEntry
            value={password}
            onChangeText={password => this.setState({ password })}
          />
          <View style={styles.br} />
          <Button
            title="Sign In"
            buttonStyle={styles.button}
            containerStyle={styles.btnContainer}
            titleStyle={styles.btnText}
          />
          <View style={styles.br} />
          <Text style={styles.span}>Don’t have an account</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}>Sign Up Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  link: {
    color: '#E45655',
    fontSize: 20,
    fontWeight: '500',
    marginVertical: 10
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
