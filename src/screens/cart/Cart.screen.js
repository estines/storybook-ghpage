import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView
} from 'react-native'
import HeaderImageScrollView from 'react-native-image-header-scroll-view'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'
import { MaterialIcons } from '@expo/vector-icons'
import { ifIphoneX } from 'react-native-iphone-x-helper'

// redux
import { fetchCategory } from '../../store/actions'

// assets
import HEADER from '../../assets/img/cart-header.png'
import CASH from '../../assets/icon/cash.png'
import AVATAR from '../../assets/icon/avatar.png'

// components
import TableCard from '../../components/TableCard.component'
import CardItemCard from '../../components/CardItemCard.component'
import CartSummary from '../../components/CartSummary.component'

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
          restaurant: { id }
        }
      } = this.props
      await this.props.fetchCategory(id)
      this.setState({ loading: false })
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

  render () {
    const {
      cart: { cart, table, restaurant }
    } = this.props
    const { time } = this.state
    return (
      <View style={styles.screen}>
        <HeaderImageScrollView
          maxHeight={200}
          minHeight={100}
          headerImage={HEADER}
          showsVerticalScrollIndicator={false}
          style={{
            paddingBottom: 100,
            backgroundColor: 'transparent',
            flex: 1
          }}
          contentContainerStyle={{
            marginBottom: 100,
            backgroundColor: '#F6F6F6'
          }}
          ScrollViewComponent={ScrollView}
          renderFixedForeground={() => (
            <View style={styles.foreground}>
              <TouchableOpacity style={styles.closeBtn} onPress={this.back}>
                <MaterialIcons name="close" size={30} color="#FFF" />
              </TouchableOpacity>
              <Text style={styles.title}>My Cart</Text>
            </View>
          )}
        >
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
                <Image source={CASH} style={styles.paymentMethodIcon} />
                <Text style={styles.paymentMethodBtnText}>CASH</Text>
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
              onPress={() => this.props.navigation.navigate('ConfirmPayment')}
            />
          </View>
        </SafeAreaView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  closeBtn: {
    position: 'absolute',
    top: ifIphoneX ? 40 : 10,
    left: 0,
    marginLeft: '5%'
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
    fontWeight: 'bold'
  },
  foreground: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: '5%'
  },
  br: {
    marginVertical: 10
  },
  container: {
    paddingHorizontal: '5%',
    backgroundColor: '#F6F6F6',
    flex: 1
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
