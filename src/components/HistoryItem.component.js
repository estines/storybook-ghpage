import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import format from 'date-fns/format'
import { MaterialIcons } from '@expo/vector-icons'

export default props => {
  const { data, onPress } = props
  if (data && data.id) {
    const {
      restaurant,
      totalPrice,
      table,
      guests,
      createdAt,
      paymentType
    } = data
    return (
      <TouchableOpacity style={styles.wrapper} onPress={onPress}>
        <View style={styles.row}>
          <View style={styles.leftCol}>
            <Text style={styles.title}>{restaurant}</Text>
          </View>
          <View style={styles.rightCol}>
            <Text style={styles.price}>฿{totalPrice.toLocaleString()}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.leftCol}>
            <Text
              style={styles.subTitle}
            >{`Table ${table} / ${guests} guests`}</Text>
          </View>
          <View style={styles.rightCol}>
            <Text style={styles.subTitle}>
              {format(createdAt, 'DD.MM.YYYY / HH:mm')}
            </Text>
          </View>
        </View>
        <View style={[styles.row, { marginBottom: 0 }]}>
          <View style={styles.leftCol}>
            <View style={styles.wrapPayment}>
              <View style={styles.br} />
              <View style={styles.paymentType}>
                {paymentType === 'card' ? (
                  <Text style={styles.paymentTypeText}>CREDIT CARD</Text>
                ) : (
                  <Text style={styles.paymentTypeText}>CASH</Text>
                )}
              </View>
            </View>
          </View>
          <View style={styles.rightCol}>
            <View style={styles.textRow}>
              <Text style={styles.subTitle}>Detail</Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={20}
                color="#8E8E93"
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  wrapPayment: {
    flexDirection: 'row'
  },
  paymentType: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#E45655',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  paymentTypeText: {
    color: '#E45655',
    fontSize: 10
  },
  br: {
    marginVertical: 5
  },
  textRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  price: {
    fontWeight: 'bold'
  },
  subTitle: {
    color: '#8E8E93'
  },
  title: {
    fontWeight: '400'
  },
  rightCol: {
    flex: 1,
    alignItems: 'flex-end'
  },
  leftCol: {
    flex: 1
  },
  wrapper: {
    backgroundColor: '#FFF',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#dbdbdb'
  }
})
