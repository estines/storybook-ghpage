import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import Header from '../../components/Header.component'
import { fetchCard } from '../../store/actions'
import { TextInput, CountryPicker } from '../../components/form'
import { Br, Row, Column } from '../../components/layout'
import ErrorHandler from '../../libs/error'
import Spinner from '../../components/Spinner.component'
import CardService from '../../services/card.service'

class AddPaymentMethod extends Component {
  state = {
    countryPickerVisible: false,
    country: null,
    number: '',
    loading: false
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

  submit = async () => {
    try {
      this.setState({ loading: true })
      let { name, country, cvv, cardNumber, expireDate } = this.state
      const dateArr = expireDate.split('/')
      const month = dateArr[0]
      const year = dateArr[1]
      const number = cardNumber.replace(/ /g, '')
      const body = { name, country, cvv, number, month, year }
      await CardService.create(body)
      await this.props.fetchCard()
      this.setState({ loading: false })
      this.props.navigation.goBack()
    } catch (error) {
      this.setState({ loading: false })
      ErrorHandler(error)
    }
  }

  render () {
    const { loading, name, country, cvv, cardNumber, expireDate } = this.state
    return (
      <View style={styles.screen}>
        <Header
          left="back"
          right="Add"
          onPressLeft={this.back}
          center="Card Detail"
          onPressRight={this.submit}
        />
        <View style={styles.container}>
          <TextInput
            value={name}
            onChangeText={name => this.setState({ name })}
            placeholder="Card holder name"
            inputStyles={styles.input}
          />
          <Br />
          <TextInput
            value={cardNumber}
            onChangeText={cardNumber => this.setState({ cardNumber })}
            placeholder="Exp. Date"
            inputStyles={styles.input}
            mask
            maskType="credit-card"
            placeholder="0000 0000 0000 0000"
          />
          <Br />
          <Row>
            <Column paddingRight={20}>
              <TextInput
                value={expireDate}
                onChangeText={expireDate => this.setState({ expireDate })}
                inputStyles={styles.input}
                mask
                maskType="datetime"
                maskFormat="MM/YY"
                placeholder="Exp. Date"
              />
            </Column>
            <Column paddingLeft={20}>
              <TextInput
                value={cvv}
                onChangeText={cvv => this.setState({ cvv })}
                inputStyles={styles.input}
                placeholder="CVV"
                maxLength={3}
              />
            </Column>
          </Row>
          <Br />
          <Br />
          <CountryPicker
            selected={country}
            onSelect={country => this.setState({ country })}
            toggle={this.toggleCountryPicker}
          />
        </View>
        <Spinner visible={loading} />
      </View>
    )
  }
}

const mapState = state => state.cart

export default connect(
  mapState,
  { fetchCard }
)(AddPaymentMethod)

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#FFF',
    borderColor: '#CECECE'
  },
  container: {
    flex: 1,
    padding: '5%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: '20%',
    paddingHorizontal: '10%'
  },
  screen: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'flex-start'
  }
})
