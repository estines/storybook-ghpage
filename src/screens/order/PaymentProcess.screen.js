import React, { Component, Fragment } from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  SafeAreaView,
  Image,
  ImageBackground
} from 'react-native'
import { Header } from 'react-native-elements'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import { connect } from 'react-redux'
import { QRCode } from 'react-native-custom-qr-codes'

// components
import BillDetail from '../../components/BillDetail.component'
import PaymentProgress from '../../components/PaymentProgress.component'

// assets
import APP_LOGO from '../../assets/img/full-logo.png'
import SLIP_TAIL from '../../assets/img/slip-tail.png'

const ED_SHEERAN = 'https://ichef.bbci.co.uk/images/ic/960x540/p02kq8k6.jpg'

const AppHeader = props => {
  const { done } = props
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
          text: 'Card Payment',
          style: { color: '#000000', fontSize: 18 }
        }}
        rightComponent={{
          text: 'Done',
          style: { color: done ? '#007AFF' : '#CECECE', fontSize: 18 },
          onPress: props.finish
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
  state = {
    progress: 0,
    paymentMethod: 'card'
  }

  componentDidMount = () => {
    this.increaseProgress = setInterval(() => {
      const { progress } = this.state
      if (progress < 100) {
        this.setState({
          progress: progress + 20
        })
      } else {
        clearInterval(this.increaseProgress)
      }
    }, 1000)
  }

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

  renderFooter = () => {
    const { paymentMethod } = this.state
    if (paymentMethod === 'cash') {
      return (
        <Fragment>
          <Text style={[styles.title, { alignSelf: 'flex-start', marginBottom: 10 }]}>
            Payment method: Cash
          </Text>
          <RowValue label="Cash" value="1,000" />
          <RowValue label="Change" value="5" />
        </Fragment>
      )
    } else if (paymentMethod === 'card') {
      return (
        <Fragment>
          <Text style={[styles.title, { alignSelf: 'flex-start', marginBottom: 10 }]}>
            Payment method: Credit card
          </Text>
          <Text style={[styles.title, { alignSelf: 'flex-start', marginBottom: 10 }]}>
            Transaction number: 1v1309014-2
          </Text>
        </Fragment>
      )
    }
  }

  renderQrCode = () => {
    const { paymentMethod } = this.state
    if (paymentMethod === 'card') {
      return (
        <Fragment>
          <QRCode content="https://reactnative.com" size={150} />
          <Text style={styles.orderLabel}>ORDER 11425113</Text>
        </Fragment>
      )
    }
  }

  done = () => {
    this.props.navigation.navigate('ReviewScreen')
  }
  render () {
    const {
      cart: { cart }
    } = this.props
    const { progress } = this.state
    const mock_cart = [
      { id: 1, productName: 'Test', totalPrice: 500, quantity: 10 },
      { id: 2, productName: 'Test', totalPrice: 500, quantity: 10 },
      { id: 3, productName: 'Test', totalPrice: 500, quantity: 10 },
      { id: 4, productName: 'Test', totalPrice: 500, quantity: 10 }
    ]
    return (
      <View style={styles.screen}>
        <AppHeader back={this.back} done={progress === 100} finish={this.done} />
        <View style={styles.br} />
        <View style={styles.br} />
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ paddingBottom: 50 }}
          showsVerticalScrollIndicator={false}
        >
          <PaymentProgress progress={progress} />
          <View style={styles.card}>
            <Image source={APP_LOGO} style={styles.appLogo} />
            <View style={styles.br} />
            {this.renderQrCode()}
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
            <View style={styles.hr} />
            {this.renderFooter()}
            <View style={styles.br} />
            <View style={styles.br} />
          </View>

          <ImageBackground source={SLIP_TAIL} style={styles.slipTail}>
            <Text style={styles.title}>Thank you !</Text>
          </ImageBackground>
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
    marginTop: -10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  br: {
    marginVertical: 5
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
