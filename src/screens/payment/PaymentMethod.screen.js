import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { Header } from 'react-native-elements'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import { connect } from 'react-redux'
import { MaterialIcons } from '@expo/vector-icons'

import { selectPaymentMethod } from '../../store/actions'

import CASH from '../../assets/icon/cash.png'
import VISA from '../../assets/icon/visa.png'

const paymentMethods = [
  {
    id: 1,
    paymentType: 'card',
    cardNumber: '****2536'
  },
  {
    id: 2,
    paymentType: 'card',
    cardNumber: '****1234'
  },
  {
    id: 0,
    paymentType: 'cash'
  }
]

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
          text: 'Payment Method',
          style: { color: '#000000', fontSize: 18 }
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

class PaymentMethod extends Component {
  selectPaymentMethod = (paymentMethod, paymentMethodId) => {
    this.props.selectPaymentMethod({ paymentMethod, paymentMethodId })
  }

  renderPaymentMethod = ({ item }) => {
    const { paymentMethod, paymentMethodId } = this.props
    const { paymentType } = item
    if (paymentType === 'cash') {
      return (
        <TouchableOpacity
          style={styles.list}
          onPress={() => this.selectPaymentMethod('cash', null)}
        >
          <View style={styles.left}>
            <Image source={CASH} style={styles.listIcon} />
            <Text style={styles.thead}>Cash</Text>
          </View>
          {paymentMethod === 'cash' ? (
            <MaterialIcons name="check" size={20} color="#CCCCCC" />
          ) : null}
        </TouchableOpacity>
      )
    } else if (paymentType === 'card') {
      const { cardNumber, id } = item
      return (
        <TouchableOpacity
          style={styles.list}
          onPress={() => this.selectPaymentMethod('card', id)}
        >
          <View style={styles.left}>
            <Image source={VISA} style={styles.listIcon} />
            <Text style={styles.thead}>{cardNumber}</Text>
          </View>
          {paymentMethod === 'card' && paymentMethodId === id ? (
            <MaterialIcons name="check" size={20} color="#CCCCCC" />
          ) : null}
        </TouchableOpacity>
      )
    }
  }

  add = () => {
    this.props.navigation.navigate('AddPaymentMethod')
  }

  back = () => {
    this.props.navigation.goBack()
  }

  render () {
    return (
      <View style={styles.screen}>
        <AppHeader back={this.back} />
        <View style={styles.theadWrapper}>
          <Text style={styles.thead}>Payment Method</Text>
        </View>
        <ScrollView>
          <FlatList
            data={paymentMethods}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderPaymentMethod}
            style={styles.listContainer}
            extraData={this.props}
            scrollEnabled={false}
          />
          <TouchableOpacity style={styles.list} onPress={this.add}>
            <View style={styles.center}>
              <MaterialIcons name="add" size={30} color="#E45655" />
              <Text style={styles.title}>Add Payment Method</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
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
  title: {
    color: '#E45655',
    fontWeight: '600',
    marginLeft: 10
  },
  center: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  listIcon: {
    marginRight: 10,
    width: 30,
    height: 30,
    resizeMode: 'contain'
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  listContainer: {
    borderColor: '#CCCCCC',
    borderTopWidth: 0.3
  },
  list: {
    padding: 10,
    paddingHorizontal: 30,
    backgroundColor: '#FFF',
    borderColor: '#CCCCCC',
    borderBottomWidth: 0.3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  theadWrapper: {
    padding: 20
  },
  thead: {},
  screen: {
    flex: 1,
    backgroundColor: '#F6F6F6'
  }
})
