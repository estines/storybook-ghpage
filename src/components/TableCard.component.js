import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

// images
import QR_CODE_SCAN from '../assets/icon/qr-code-scan.png'
import PLACE from '../assets/icon/place.png'
import CLOCK from '../assets/icon/clock.png'
const ED_SHEERAN = 'https://ichef.bbci.co.uk/images/ic/960x540/p02kq8k6.jpg'

const Guest = props => {
  return (
    <TouchableOpacity style={styles.guest}>
      <Image source={{ uri: ED_SHEERAN }} style={styles.avatar} />
    </TouchableOpacity>
  )
}

const parseSatang = value => {
  if (value && value > 0) {
    return `.${value.toFixed(2).replace('0.', '')}`
  } else {
    return '.00'
  }
}

export default props => {
  const { cart } = props
  let totalPrice = 0
  if (cart && cart.length > 1) {
    totalPrice = cart.map(c => c.totalPrice).reduce((a, b) => a + b)
  } else if (cart && cart.length === 1) {
    totalPrice = cart[0].totalPrice
  }
  let totalPriceSatang = totalPrice % 1
  let totalPriceBaht = totalPrice - totalPriceSatang
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <View style={styles.textRow}>
          <Text style={styles.title}>Table 4</Text>
          <Image source={QR_CODE_SCAN} style={styles.qrScanIcon} />
        </View>
        <View style={styles.br} />
        <View style={styles.br} />
        <View style={[styles.textRow, styles.placeRow]}>
          <Image source={PLACE} style={styles.placeIcon} />
          <Text style={styles.label}>Ada Ramen - Wattana, Bangkok 12345</Text>
        </View>
      </View>
      <View style={styles.br} />
      <View style={styles.br} />
      <View style={[styles.textRow, styles.bottomRow]}>
        <View style={styles.textBlock}>
          <Text style={styles.label}>Time</Text>
          <View style={styles.br} />
          <View style={styles.textRow}>
            <Image source={CLOCK} style={styles.clockIcon} />
            <Text style={styles.value}>00:05</Text>
          </View>
        </View>
        <View style={styles.textBlock}>
          <Text style={styles.label}>Guests</Text>
          <View style={styles.br} />
          <Text style={styles.value}>1</Text>
        </View>
        <View style={styles.guestsRow}>
          <Guest />
          <Guest />
          <Guest />
        </View>
      </View>
      <View style={styles.circle}>
        <Text style={styles.total}>Total</Text>
        <View style={styles.textRow}>
          <Text style={styles.price}>฿{totalPriceBaht.toLocaleString()}</Text>
          <Text style={styles.priceDecimals}>
            {parseSatang(totalPriceSatang)}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  guest: {
    marginRight: 5,
    marginTop: 10
  },
  guestsRow: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: '#E8615F',
    borderWidth: 2
  },
  textBlock: {
    paddingHorizontal: 5
  },
  clockIcon: {
    tintColor: '#DADBDA',
    marginRight: 5
  },
  priceDecimals: {
    color: '#FFF',
    marginTop: 20
  },
  price: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600'
  },
  total: {
    color: '#FFF',
    fontSize: 10
  },
  circle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#FF3B30',
    borderColor: '#FFF',
    borderWidth: 5,
    position: 'absolute',
    top: 0,
    right: 0,
    marginTop: -20,
    marginRight: 0,
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    width: '80%'
  },
  placeRow: {
    borderBottomWidth: 1,
    borderColor: '#CECECE',
    paddingBottom: 5
  },
  br: {
    marginVertical: 5
  },
  label: {
    fontSize: 10,
    color: '#919191'
  },
  placeIcon: {
    marginRight: 10,
    width: 18,
    height: 18
  },
  qrScanIcon: {
    marginLeft: 10,
    width: 22,
    height: 22
  },
  textRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: 18
  },
  card: {
    borderRadius: 10,
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: '#dbdbdb',
    padding: 20,
    backgroundColor: '#FFF',
    marginTop: -50,
    zIndex: 100,
    position: 'relative'
  }
})
