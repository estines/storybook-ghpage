import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  FlatList,
  SafeAreaView,
  Image
} from 'react-native'
import { Header } from 'react-native-elements'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import { connect } from 'react-redux'

// components
import TableCard from '../../components/TableCard.component'
import BillDetail from '../../components/BillDetail.component'
import CartSummary from '../../components/CartSummary.component'

// assets
import APP_LOGO from '../../assets/img/full-logo.png'
import SLIP_TAIL from '../../assets/img/slip-tail.png'

const ED_SHEERAN = 'https://ichef.bbci.co.uk/images/ic/960x540/p02kq8k6.jpg'

const DETAIL = [
  { detail: 'Shabu Ramen', quantity: 1, price: 150 },
  { detail: 'Yakisoba', quantity: 1, price: 150 },
  { detail: 'Mineral Water', quantity: 1, price: 150 },
  { detail: 'Mi Goreng', quantity: 1, price: 150 },
  { detail: 'Green Tea', quantity: 1, price: 120 },
  { detail: 'Shabu Ramen', quantity: 1, price: 150 },
  { detail: 'Yakisoba', quantity: 1, price: 150 },
  { detail: 'Mineral Water', quantity: 1, price: 150 },
  { detail: 'Mi Goreng', quantity: 1, price: 150 },
  { detail: 'Green Tea', quantity: 1, price: 120 }
]

const AppHeader = props => {
  return (
    <SafeAreaView style={{ backgroundColor: '#FFF' }}>
      <Header
        leftComponent={{
          icon: 'keyboard-arrow-left',
          color: '#7E7E7E',
          size: 30,
          onPress: props.back
        }}
        centerComponent={{
          text: 'Cash Payment',
          style: { color: '#000000', fontSize: 18 }
        }}
        rightComponent={{
          text: 'Pay',
          style: { color: '#007AFF', fontSize: 18 },
          onPress: props.pay
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

const RowValue = props => {
  const { label, value } = props
  return (
    <View style={[styles.detailRow]}>
      <Text style={styles.thead}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  )
}

class ConfirmPayment extends Component {
  renderDetail = ({ item, index }) => {
    const { detail, quantity, price } = item
    return (
      <View style={[styles.row, styles.justifyBetween, { marginBottom: 10 }]}>
        <View style={styles.qtyCol}>
          {index === 0 ? <Text style={styles.rowThead}>qty</Text> : null}
          <Text style={styles.rowText}>{quantity} x</Text>
        </View>
        <View style={styles.detailCol}>
          {index === 0 ? (
            <Text style={styles.rowThead}>Order Details</Text>
          ) : null}
          <Text style={[styles.rowText, { alignSelf: 'flex-start' }]}>
            {detail}
          </Text>
        </View>
        <View style={styles.avatarCol}>
          {index === 0 ? <Text style={styles.rowThead}>Guests</Text> : null}
          <View style={[styles.avatarRow]}>
            <Image
              source={{ uri: ED_SHEERAN }}
              style={[styles.rowAvatar, { zIndex: 3 }]}
            />
            <Image
              source={{ uri: ED_SHEERAN }}
              style={[styles.rowAvatar, { zIndex: 2 }]}
            />
            <Image
              source={{ uri: ED_SHEERAN }}
              style={[styles.rowAvatar, { zIndex: 1 }]}
            />
          </View>
        </View>
        <View style={styles.priceCol}>
          {index === 0 ? <Text style={styles.rowThead}>Price (฿)</Text> : null}
          <Text style={styles.rowText}>{price}</Text>
        </View>
      </View>
    )
  }

  back = () => {
    this.props.navigation.goBack()
  }

  pay = () => {
    this.props.navigation.navigate('PaymentProcess')
  }

  render () {
    const {
      cart: { cart }
    } = this.props
    const mock_cart = [
      { id: 1, productName: 'Test', totalPrice: 500, quantity: 10 },
      { id: 2, productName: 'Test', totalPrice: 500, quantity: 10 },
      { id: 3, productName: 'Test', totalPrice: 500, quantity: 10 },
      { id: 4, productName: 'Test', totalPrice: 500, quantity: 10 }
    ]
    return (
      <View style={styles.screen}>
        <AppHeader back={this.back} pay={this.pay} />
        <View style={styles.br} />
        <View style={styles.br} />
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ paddingBottom: 50 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            <Image source={APP_LOGO} style={styles.appLogo} />
            <View style={styles.br} />
            <View style={styles.br} />
            <View style={[styles.row, styles.justifyBetween]}>
              <Text style={styles.restaurant}>Ada Ramen</Text>
              <Text style={styles.date}>12.11.2018 / 12:30</Text>
            </View>
            <View style={[styles.row, styles.justifyBetween]}>
              <Text style={styles.text}>Table 4 </Text>
              <Text style={styles.text}>3 Guests</Text>
              <View style={styles.avatarRow}>
                <Image
                  source={{ uri: ED_SHEERAN }}
                  style={[styles.avatar, { zIndex: 3 }]}
                />
                <Image
                  source={{ uri: ED_SHEERAN }}
                  style={[styles.avatar, { zIndex: 2 }]}
                />
                <Image
                  source={{ uri: ED_SHEERAN }}
                  style={[styles.avatar, { zIndex: 1 }]}
                />
              </View>
            </View>
            <View style={styles.hr} />
            <BillDetail cart={mock_cart} />
            <View style={styles.hr} />
            <RowValue label="Total items..." value="4" />
            <RowValue label="Subtotal" value="64" />
            <RowValue label="Tax (7.000%)…" value="930" />
            <View style={[styles.row, styles.justifyBetween]}>
              <Text style={styles.thead}>Total :</Text>
              <Text style={styles.totalPrice}>฿ 995.00</Text>
            </View>
            <View style={styles.br} />
          </View>
          <Image source={SLIP_TAIL} style={styles.slipTail} />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  priceCol: {
    flex: 1,
    alignItems: 'center'
  },
  avatarCol: {
    flex: 2,
    alignItems: 'center'
  },
  detailCol: {
    flex: 2,
    alignItems: 'center'
  },
  qtyCol: {
    flex: 1,
    alignItems: 'center'
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10
  },
  rowThead: {
    fontSize: 10,
    color: '#7E7E7E',
    marginBottom: 10
  },
  alignSelfCenter: {
    alignSelf: 'center'
  },
  footerText: {
    marginBottom: 10,
    alignSelf: 'flex-start'
  },
  totalPrice: {
    fontSize: 18,
    color: '#E45655',
    fontWeight: 'bold'
  },
  hr: {
    width: '100%',
    height: 0.5,
    backgroundColor: '#7E7E7E',
    marginVertical: 10
  },
  text: {},
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rowAvatar: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    marginLeft: -10,
    borderColor: '#FFF',
    borderWidth: 1,
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 10
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: -10,
    borderColor: '#FFF',
    borderWidth: 1,
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 10
  },
  date: {
    fontSize: 10,
    color: '#7E7E7E'
  },
  restaurant: {
    fontSize: 18,
    fontWeight: '500',
    color: '#4E5766'
  },
  justifyBetween: {
    justifyContent: 'space-between'
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  slipTail: {
    width: '100%',
    marginTop: -10
  },
  br: {
    marginVertical: 5
  },
  orderLabel: {
    marginTop: 5,
    fontSize: 10,
    fontWeight: 'bold'
  },
  container: {
    paddingHorizontal: '5%'
  },
  card: {
    backgroundColor: '#FFF',
    width: '100%',
    alignItems: 'center',
    padding: '5%',
    paddingBottom: 0
  },
  appLogo: {},
  screen: {
    flex: 1,
    backgroundColor: '#F6F6F6'
  }
})

const mapState = state => {
  const { menu, cart } = state
  return {
    menu,
    cart
  }
}
export default connect(mapState)(ConfirmPayment)
