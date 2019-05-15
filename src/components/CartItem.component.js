import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'

const ED_SHEERAN = 'https://ichef.bbci.co.uk/images/ic/960x540/p02kq8k6.jpg'

const renderOptions = options => {
  return options.map((option, index) => (
    <Text key={index} style={styles.option}>
      {option}
    </Text>
  ))
}

const Status = ({ status }) => {
  let color = '#9ED14A'
  if (status === 'busy') {
    color = '#F18E54'
  }
  return <View style={[styles.status, { backgroundColor: color }]} />
}

const Avatar = ({ index }) => {
  return (
    <Image source={{ uri: ED_SHEERAN }} style={[styles.avatar, { zIndex: index }]} />
  )
}

export default props => {
  const { data, index } = props
  const { quantity, menuName, totalPrice, selectedOptionsName, note } = data
  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        <View style={[styles.col, styles.qtyCol]}>
          {index === 0 ? <Text style={[styles.thead]}>Qty</Text> : null}
          <Text style={styles.qty}>{quantity} x</Text>
        </View>
        <View style={[styles.col, styles.nameCol]}>
          {index === 0 ? (
            <Text style={[styles.thead, styles.nameThead]}>Order Details</Text>
          ) : null}
          <Text style={styles.name}>{menuName}</Text>
          <View style={styles.br} />
          {renderOptions(selectedOptionsName, note)}
          <Text style={styles.option}>{note}</Text>
        </View>
        <View style={[styles.col, { flex: 3 }]}>
          {index === 0 ? <Text style={styles.thead}>Guests</Text> : null}
          <View style={styles.textRow}>
            <Avatar index={2} />
            <Avatar index={1} />
          </View>
        </View>
        <View style={[styles.col, { flex: 2.5 }]}>
          {index === 0 ? <Text style={styles.thead}>Price (฿)</Text> : null}
          <View style={styles.textRow}>
            <Text style={styles.price}>{totalPrice.toLocaleString()}</Text>
            <Status status={index % 2 === 0 ? 'ready' : 'busy'} />
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
  textRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  status: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: '#9ED14A'
  },
  qtyCol: {
    flex: 1.2
  },
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
    fontSize: 14,
    marginRight: 10
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
    fontSize: 14
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
