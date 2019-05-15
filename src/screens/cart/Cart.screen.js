import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  AsyncStorage
} from 'react-native'
import HeaderImageScrollView, {
  TriggeringView
} from 'react-native-image-header-scroll-view'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'
import { MaterialIcons } from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable'
import { Header as NHeader } from 'react-navigation'

// redux
import { fetchCategory } from '../../store/actions'

// assets
import HEADER from '../../assets/img/cart-header.png'
import CASH from '../../assets/icon/cash.png'
import VISA from '../../assets/icon/visa.png'
import MASTER_CARD from '../../assets/icon/mastercard.png'
import AVATAR from '../../assets/icon/avatar.png'

// components
import TableCard from '../../components/TableCard.component'
import CardItemCard from '../../components/CardItemCard.component'
import CartSummary from '../../components/CartSummary.component'

// service
import socket from '../../services/socket.service'

const MIN_HEIGHT = NHeader.HEIGHT
const MAX_HEIGHT = 200

class CartScreen extends Component {
  state = {
    time: new Date()
  }

  async componentDidMount () {
    try {
      // clock
      setInterval(() => {
        this.setState({
          time: new Date()
        })
      }, 1000)

      this.setState({ loading: true })
      const {
        cart: {
          restaurant: { id },
          table
        }
      } = this.props
      await this.props.fetchCategory(id)

      this.setState({ loading: false })
      // const userId = await AsyncStorage.getItem('userId')
      // socket.emit('join table', {
      //   table: table.id,
      //   restaurant: id,
      //   userId: userId
      // })
    } catch (error) {
      this.setState({ loading: false })
    }
  }

  showMenu = () => {
    this.props.navigation.navigate('Menu')
  }

  back = () => {
    this.props.navigation.navigate('HomeScreen')
  }

  renderPaymentMethod = () => {
    const {
      cart: { paymentMethod }
    } = this.props
    if (paymentMethod === 'card') {
      const {
        cart: {
          paymentMethodData: { last_digits, brand }
        }
      } = this.props
      return [
        <Image
          source={brand === 'Visa' ? VISA : MASTER_CARD}
          style={styles.paymentMethodIcon}
        />,
        <Text
          style={styles.paymentMethodBtnText}
        >{`**** **** **** ${last_digits}`}</Text>
      ]
    } else {
      return [
        <Image source={CASH} style={styles.paymentMethodIcon} />,
        <Text style={styles.paymentMethodBtnText}>CASH</Text>
      ]
    }
  }

  makePayment = () => {
    this.props.navigation.navigate('ConfirmPayment')
  }

  render () {
    const {
      cart: { cart, table, restaurant }
    } = this.props
    const { time } = this.state
    return (
      <View style={styles.screen}>
        <HeaderImageScrollView
          maxHeight={MAX_HEIGHT}
          minHeight={MIN_HEIGHT}
          headerImage={HEADER}
          showsVerticalScrollIndicator={false}
          ScrollViewComponent={ScrollView}
          renderFixedForeground={() => (
            <Animatable.View
              style={styles.navTitleView}
              ref={navTitleView => {
                this.navTitleView = navTitleView
              }}
            >
              <Text style={styles.navTitle}>My Cart</Text>
            </Animatable.View>
          )}
          renderForeground={() => (
            <View style={styles.titleContainer}>
              <TouchableOpacity onPress={this.back}>
                <MaterialIcons name="close" color="#FFF" size={30} />
              </TouchableOpacity>
              <Text style={styles.title}>My Cart</Text>
            </View>
          )}
        >
          <TriggeringView
            onHide={() => this.navTitleView.fadeInUp(200)}
            onDisplay={() => {
              this.navTitleView.fadeOut(100)
            }}
          />
          <View style={styles.container}>
            <TableCard
              time={time}
              cart={cart}
              table={table}
              restaurant={restaurant}
            />
            <View style={styles.br} />
            <CardItemCard add={this.showMenu} cart={cart} />
            <CartSummary cart={cart} />
          </View>
        </HeaderImageScrollView>
        <SafeAreaView style={{ backgroundColor: '#FFF' }}>
          <View style={styles.footer}>
            <View style={[styles.row, styles.justifyBetween]}>
              <TouchableOpacity
                style={styles.paymentMethod}
                onPress={() => this.props.navigation.navigate('PaymentMethod')}
              >
                {this.renderPaymentMethod()}
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={25}
                  color="#CECECE"
                />
              </TouchableOpacity>
              <View style={styles.paymentMethod}>
                <Image source={AVATAR} />
                <Text style={styles.totalGuests}>3</Text>
              </View>
            </View>
            <Button
              title="MAKE A PAYMENT"
              buttonStyle={styles.submitBtn}
              titleStyle={styles.submitBtnTitle}
              onPress={this.makePayment}
            />
          </View>
        </SafeAreaView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: '5%',
    position: 'relative',
    paddingTop: '10%'
  },
  navTitleView: {
    width: '100%',
    height: MIN_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
    paddingTop: 20,
    paddingHorizontal: '5%'
  },
  navTitle: {
    color: 'white',
    fontSize: 18,
    backgroundColor: 'transparent'
  },
  totalGuests: {
    marginLeft: 5
  },
  justifyBetween: {
    justifyContent: 'space-between'
  },
  paymentMethodIcon: {
    height: 20,
    width: 25,
    resizeMode: 'contain'
  },
  paymentMethodBtnText: {
    marginHorizontal: 5
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    paddingVertical: 10
  },
  footer: {
    backgroundColor: '#FFF',
    padding: 20,
    paddingVertical: 10
  },
  submitBtnTitle: {
    fontWeight: '700',
    fontSize: 14
  },
  submitBtn: {
    backgroundColor: '#E45655',
    borderColor: 'transparent',
    borderWidth: 0,
    fontSize: 10,
    padding: 10,
    borderRadius: 0
  },
  title: {
    color: '#FFF',
    fontSize: 34,
    fontWeight: 'bold',
    marginTop: 30
  },
  br: {
    marginVertical: 10
  },
  container: {
    paddingHorizontal: '5%',
    backgroundColor: '#F6F6F6',
    flex: 1,
    paddingBottom: 150
  },
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

export default connect(
  mapState,
  { fetchCategory }
)(CartScreen)
