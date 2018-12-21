import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

const renderOptions = options => {
  return options.map((option, index) => (
    <Text key={index} style={styles.option}>
      {option}
    </Text>
  ))
}

export default props => {
  const { data, index } = props
  const { quantity, productName, totalPrice, selectedOptionsName, note } = data
  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        <View style={styles.col}>
          {index === 0 ? <Text style={styles.thead}>Qty</Text> : null}
          <Text style={styles.qty}>{quantity} x</Text>
        </View>
        <View style={[styles.col, styles.nameCol]}>
          {index === 0 ? <Text style={[styles.thead, styles.nameThead]}>Order Details</Text> : null}
          <Text style={styles.name}>{productName}</Text>
          <View style={styles.br} />
          {renderOptions(selectedOptionsName, note)}
          <Text style={styles.option}>{note}</Text>
        </View>
        <View style={[styles.col, { flex: 3 }]}>
          {index === 0 ? <Text style={styles.thead}>Guests</Text> : null}
        </View>
        <View style={[styles.col, { flex: 2 }]}>
          {index === 0 ? <Text style={styles.thead}>Price (฿)</Text> : null}
          <Text style={styles.price}>{totalPrice}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  nameThead: {
    alignSelf: 'flex-start'
  },
  thead: {
    fontSize: 12,
    color: '#7E7E7E',
    marginBottom: 10,
    alignSelf: 'center'
  },
  price: {
    fontSize: 16
  },
  br: {
    marginVertical: 5
  },
  option: {
    color: '#E45655',
    fontSize: 11,
    marginVertical: 1
  },
  name: {
    fontSize: 16
  },
  nameCol: {
    flex: 4,
    alignItems: 'flex-start'
  },
  qty: {
    color: '#E45655',
    fontWeight: '500',
    fontSize: 16
  },
  col: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 5
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  wrapper: {
    flex: 1,
    marginVertical: 10
  }
})
