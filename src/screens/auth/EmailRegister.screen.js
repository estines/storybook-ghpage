import React, { Component } from 'react'
import ReactNative, {
  View,
  StyleSheet,
  Platform,
  Animated,
  Keyboard,
  Text
} from 'react-native'
import { Button } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// components
import { Br } from '../../components/layout'
import Spinner from '../../components/Spinner.component'
import Header from '../../components/Header.component'
import { TextInput } from '../../components/form'
// services
import AuthService from '../../services/auth.service'
import ErrorHandler from '../../libs/error'

export default class LoginScreen extends Component {
  state = {
    username: '',
    password: '',
    loading: false,
    keyboardHeight: new Animated.Value(0)
  }

  animateKeyboardHeight = (toValue, duration) => {
    Animated.timing(this.state.keyboardHeight, { toValue, duration }).start()
  }

  componentWillMount () {
    if (Platform.OS === 'android') {
      this.keyboardShowListener = Keyboard.addListener(
        'keyboardDidShow',
        ({ endCoordinates }) => {
          this.animateKeyboardHeight(endCoordinates.height, 0)
        }
      )
      this.keyboardHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
          this.animateKeyboardHeight(0, 300)
        }
      )
    }
  }

  submit = async () => {
    try {
      const {
        username,
        password,
        loading,
        firstName,
        lastName,
        email,
        phoneNumber
      } = this.state
      this.setState({ loading: true })
      const name = `${firstName} ${lastName}`
      const body = {
        username,
        password,
        loading,
        name,
        email,
        phoneNumber
      }
      await AuthService.register(body)
      this.setState({ loading: false })
      this.props.navigation.navigate('App')
    } catch (error) {
      this.setState({ loading: false })
      ErrorHandler(error)
    }
  }

  back = () => {
    this.props.navigation.goBack()
  }

  scrollToInput = reactNode => {
    this.view.scrollToFocusedInput(reactNode)
  }

  handleOnFocus = e => {
    if (Platform.OS === 'android') {
      this.scrollToInput(ReactNative.findNodeHandle(e.target))
    }
  }

  render () {
    const {
      username,
      password,
      loading,
      firstName,
      lastName,
      email,
      phoneNumber
    } = this.state

    return (
      <View style={styles.screen}>
        <Header center="Registration" left="back" onPressLeft={this.back} />
        <KeyboardAwareScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          enableOnAndroid
          extraHeight={Platform.OS === 'android' ? 100 : undefined}
          ref={ref => (this.view = ref)}
        >
          <View style={styles.container} behavior="padding">
            <TextInput
              value={firstName}
              onChangeText={firstName => this.setState({ firstName })}
              label="First Name"
              inputStyles={styles.input}
              onFocus={this.handleOnFocus}
            />
            <TextInput
              value={lastName}
              onChangeText={lastName => this.setState({ lastName })}
              label="Last Name"
              inputStyles={styles.input}
              onFocus={this.handleOnFocus}
            />
            <TextInput
              value={username}
              onChangeText={username => this.setState({ username })}
              label="Username"
              inputStyles={styles.input}
              onFocus={this.handleOnFocus}
            />
            <TextInput
              value={password}
              onChangeText={password => this.setState({ password })}
              label="Password"
              inputStyles={styles.input}
              secureTextEntry
              onFocus={this.handleOnFocus}
            />
            <TextInput
              value={email}
              onChangeText={email => this.setState({ email })}
              label="Email"
              inputStyles={styles.input}
              keyboardType="email-address"
              onFocus={this.handleOnFocus}
            />
            <TextInput
              value={phoneNumber}
              onChangeText={phoneNumber => this.setState({ phoneNumber })}
              label="Phone Number"
              inputStyles={styles.input}
              onFocus={this.handleOnFocus}
            />
            <Br size={20} />
            <Button
              title="Submit"
              buttonStyle={styles.button}
              containerStyle={styles.btnContainer}
              titleStyle={styles.btnText}
              onPress={this.submit}
            />
          </View>
          <View style={styles.spacer} />
          <Animated.View style={{ height: this.state.keyboardHeight }} />
          <Spinner visible={loading} />
        </KeyboardAwareScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    width: '100%'
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
  input: {
    width: '100%',
    marginBottom: 10
  },
  container: {
    flex: 1,
    paddingHorizontal: '5%',
    width: '100%',
    paddingBottom: 100
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '5%',
    backgroundColor: '#FFF',
    width: '100%'
  }
})
