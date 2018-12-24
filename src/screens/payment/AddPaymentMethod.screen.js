import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  TextInput,
  Image
} from 'react-native'
import { Header } from 'react-native-elements'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import { connect } from 'react-redux'

import { selectPaymentMethod } from '../../store/actions'

// assets
import CAMERA from '../../assets/icon/camera.png'
import QUESTION_MARK from '../../assets/icon/question-mark.png'

// components
import CountryPicker from '../../components/modals/CountryPicker.modal'

const AppHeader = props => {
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
          text: 'Card Detail',
          style: { color: '#000000', fontSize: 18 }
        }}
        rightComponent={{
          text: 'Save',
          style: { color: '#007AFF', fontSize: 18 },
          onPress: props.back
        }}
        containerStyle={{
          backgroundColor: '#FFF',
          justifyContent: 'space-around',
          borderBottomWidth: 0,
          paddingTop: ifIphoneX ? 0 : 10
        }}
      />
    </SafeAreaView>
  )
}

const CardInput = props => {
  return (
    <View style={styles.inputWrapper}>
      <TextInput style={styles.input} placeholder="111111111" />
      <TouchableOpacity>
        <Image source={CAMERA} style={styles.rightIcon} />
      </TouchableOpacity>
    </View>
  )
}

const DateInput = props => {
  return (
    <View style={styles.inputWrapper}>
      <TextInput style={styles.input} placeholder="111111111" {...props} />
      <Image source={QUESTION_MARK} style={styles.rightIcon} />
    </View>
  )
}

class PaymentMethod extends Component {
  state = {
    countryPickerVisible: false,
    country: null
  }

  toggleCountryPicker = () => {
    const { countryPickerVisible } = this.state
    this.setState({
      countryPickerVisible: !countryPickerVisible
    })
  }

  back = () => {
    this.props.navigation.goBack()
  }

  render () {
    const { countryPickerVisible, country } = this.state
    return (
      <View style={styles.screen}>
        <AppHeader back={this.back} />
        <View style={styles.container}>
          <Text style={styles.label}>Card Number</Text>
          <CardInput />
          <View style={styles.br} />
          <View style={styles.row}>
            <View style={[styles.col, styles.dateCol]}>
              <DateInput placeholder="Exp. Date" />
            </View>
            <View style={[styles.col, styles.cvvCol]}>
              <DateInput maxLength={3} placeholder="CVV" />
            </View>
          </View>
          <View style={styles.br} />
          <Text style={styles.label}>Country</Text>
          <TouchableOpacity
            style={styles.inputWrapper}
            onPress={this.toggleCountryPicker}
          >
            <View style={[styles.left, styles.countryPicker]}>
              {country && country !== null ? (
                <View style={styles.textRow}>
                  <Image source={{ uri: country.flag }} style={styles.flag} />
                  <Text style={styles.country}>{country.name}</Text>
                </View>
              ) : (
                <Text style={styles.country}>Select Country</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
        <CountryPicker
          visible={countryPickerVisible}
          selected={country}
          onSelect={country => this.setState({ country })}
          toggle={this.toggleCountryPicker}
        />
      </View>
    )
  }
}

const mapState = state => state.cart

export default connect(
  mapState,
  { selectPaymentMethod }
)(PaymentMethod)

const styles = StyleSheet.create({
  countryPicker: {
    paddingHorizontal: 20
  },
  textRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  flag: {
    marginRight: 20,
    width: 30,
    height: 20,
    resizeMode: 'contain'
  },
  country: {},
  col: {},
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  dateCol: {
    flex: 3,
    paddingRight: 5
  },
  cvvCol: {
    flex: 2,
    paddingLeft: 5
  },
  br: {
    marginVertical: 10
  },
  input: {
    flex: 1
  },
  inputWrapper: {
    padding: 10,
    borderColor: '#CCCCCC',
    borderWidth: 0.3,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  label: {
    color: '#7E7E7E',
    marginBottom: 10
  },
  container: {
    padding: '10%',
    flex: 1
  },
  screen: {
    flex: 1,
    backgroundColor: '#FFF'
  }
})
