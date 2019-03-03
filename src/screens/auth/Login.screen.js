import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native'
import { Button } from 'react-native-elements'
import { KeyboardAwareView } from 'react-native-keyboard-aware-view'

import LOGO from '../../assets/img/logo.png'

// components
import AuthInput from '../../components/AuthInput.component'
import Spinner from '../../components/Spinner.component'

// services
import AuthService from '../../services/auth.service'
import ErrorHandler from '../../libs/error'

export default class LoginScreen extends Component {
  state = {
    username: '',
    password: '',
    loading: false
  }

  login = async () => {
    try {
      const { username, password } = this.state
      if (!username || username === null) {
        throw new Error('Please fill username')
      }
      if (!password || password === null) {
        throw new Error('Please fill username')
      }
      this.setState({ loading: true })
      await AuthService.login(username, password)
      this.setState({ loading: false })
      this.props.navigation.navigate('App')
    } catch (error) {
      this.setState({ loading: false })
      ErrorHandler(error)
    }
  }

  render () {
    const { navigation } = this.props
    const { username, password, loading } = this.state
    return (
      <KeyboardAwareView style={{ flex: 1 }} animated={true}>
        <View style={styles.screen}>
          <Image source={LOGO} style={styles.logo} />
          <Text style={styles.title}>ORDER KING</Text>
          <View style={styles.br} />
          <AuthInput
            placeholder="Username"
            icon="avatar"
            value={username}
            onChangeText={username => this.setState({ username })}
            returnKeyType={'next'}
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
            onPress={this.login}
            raised
          />
          <View style={styles.br} />
          <Text style={styles.span}>Don’t have an account</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}>Sign Up Now</Text>
          </TouchableOpacity>
        </View>
        <Spinner visible={loading} />
      </KeyboardAwareView>
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
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 1
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
