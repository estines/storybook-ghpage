import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  SafeAreaView
} from 'react-native'
import { Header } from 'react-native-elements'

// components
import PinInput from '../../components/PinInput.component'

const ScreenHeader = props => {
  return (
    <SafeAreaView style={{ backgroundColor: '#FFF' }}>
      <Header
        leftComponent={{
          icon: 'keyboard-arrow-left',
          color: '#000000',
          size: 30,
          onPress: props.back
        }}
        centerComponent={{
          text: 'Verify Phone',
          style: { color: '#000000', fontSize: 18 }
        }}
        rightComponent={{
          text: 'Confirm',
          style: { color: '#007AFF', fontSize: 18 }
        }}
        containerStyle={{
          backgroundColor: '#FFF',
          justifyContent: 'space-around',
          onPress: props.confirm
        }}
      />
    </SafeAreaView>
  )
}

export default class EnterPhoneNumberScreen extends Component {
  state = {
    one: null,
    two: null,
    three: null,
    four: null,
    focus: 'one',
    phoneNumber: ''
  }

  componentDidMount = () => {
    const {
      state: {
        params: { phoneNumber }
      }
    } = this.props.navigation
    this.setState({
      phoneNumber
    })
  }

  resend = () => {
    this.setState({
      one: null,
      two: null,
      three: null,
      four: null,
      focus: 'one'
    })
    setTimeout(() => {
      Alert.alert('Success', 'OTP Sent.')
    }, 0)
  }

  renderPhone = () => {
    const { phoneNumber } = this.state
    if (phoneNumber && phoneNumber.length === 10) {
      return `*******${phoneNumber.slice(7, 10)}`
    }
  }

  submit = () => {
    this.props.navigation.popToTop()
    setTimeout(() => {
      Alert.alert('Success', 'Registration success.')
    }, 500)
  }

  back = () => {
    this.props.navigation.goBack()
  }

  render () {
    const { one, two, three, four, focus } = this.state
    return (
      <ScrollView contentContainerStyle={{ flex: 1 }} scrollEnabled={false}>
        <ScreenHeader confirm={this.submit} back={this.back} />
        <View style={styles.screen}>
          <Text style={styles.title}>
            Please enter the verification code we sent to your mobile{' '}
            {this.renderPhone()}
          </Text>
          <View style={styles.br} />
          <View style={styles.br} />
          <View style={styles.row}>
            <PinInput
              name="one"
              next={() => this.setState({ focus: 'two' })}
              onFocus={() => this.setState({ focus: 'one' })}
              focus={focus}
              onChangeText={one => this.setState({ one })}
              value={one}
            />
            <PinInput
              name="two"
              next={() => this.setState({ focus: 'three' })}
              onFocus={() => this.setState({ focus: 'two' })}
              focus={focus}
              onChangeText={two => this.setState({ two })}
              value={two}
            />
            <PinInput
              name="three"
              next={() => this.setState({ focus: 'four' })}
              onFocus={() => this.setState({ focus: 'three' })}
              focus={focus}
              onChangeText={three => this.setState({ three })}
              value={three}
            />
            <PinInput
              name="four"
              onFocus={() => this.setState({ focus: 'four' })}
              focus={focus}
              onChangeText={four => this.setState({ four })}
              value={four}
              next={this.submit}
            />
          </View>
          <View style={styles.br} />
          <View style={styles.br} />
          <Text style={styles.span}>I didn’t receive a code?</Text>
          <TouchableOpacity onPress={this.resend}>
            <Text style={styles.link}>Resend</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  span: {
    color: '#7E7E7E'
  },
  link: {
    color: '#E45655',
    fontSize: 20,
    fontWeight: '500',
    marginVertical: 10
  },
  br: {
    marginVertical: 10
  },
  title: {
    color: '#000000',
    textAlign: 'center',
    paddingHorizontal: '10%'
  },
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: '10%',
    paddingTop: '40%',
    backgroundColor: '#FFF'
  }
})
