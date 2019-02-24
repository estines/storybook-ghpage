import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  TouchableWithoutFeedback
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import Collapsible from 'react-native-collapsible'

// components
import CounterButton from './CounterButton.component'

import RICE from '../assets/icon/rice.png'

export default class CategoryCard extends Component {
  state = {
    amount: 0,
    showBody: false
  }

  getQuantity = id => {
    const { cart } = this.props
    const targetItems = cart.filter(c => c.productId === id)
    console.log(targetItems, 'targetItems')
    let total = 0
    for (let item of targetItems) {
      total += item.quantity
    }
    return total
  }

  renderMenu = ({ item }) => {
    const { images, name, description, price, id } = item
    const quantity = this.getQuantity(id)
    const counterName = `amount_${id}`
    let img = ''
    if (images && images.length > 0) {
      img = `https://orderking.s3.amazonaws.com/images/thumbnail/${images[0]}`
    }
    return (
      <View style={styles.menuItem}>
        <Image source={{ uri: img }} style={styles.menuImage} />
        <View style={styles.menuDesc}>
          <View style={styles.menuDescTop}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
          <View style={[styles.row, styles.priceRow]}>
            <Text style={styles.price}>{`฿ ${price}`}</Text>
            <CounterButton
              value={quantity}
              onChange={type => this.props.addToCart(item, type)}
              name={counterName}
            />
          </View>
        </View>
      </View>
    )
  }
  render () {
    const {
      data: { menus, name }
    } = this.props
    const { showBody } = this.state
    console.log(this.props, 'data....')
    return (
      <View style={styles.card}>
        <TouchableWithoutFeedback
          onPress={() => this.setState({ showBody: !showBody })}
        >
          <View
            style={[
              styles.cardHeader,
              {
                paddingBottom: showBody ? 5 : 10
              }
            ]}
          >
            <View style={styles.row}>
              <Image
                source={RICE}
                style={[
                  styles.menuIcon,
                  { tintColor: showBody ? '#EE805F' : '#898989' }
                ]}
              />
              <Text style={styles.menuTitle}>{name}</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="gray" />
          </View>
        </TouchableWithoutFeedback>
        <Collapsible style={styles.cardBody} collapsed={!showBody}>
          <FlatList
            data={menus}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderMenu}
            extraData={this.props}
          />
        </Collapsible>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cardBody: {
    marginTop: 10,
    paddingVertical: 10
  },
  priceRow: {
    justifyContent: 'space-between'
  },
  menuDescTop: {
    marginBottom: 20
  },
  price: {
    color: '#E45655',
    fontSize: 14,
    fontWeight: 'bold'
  },
  description: {
    fontSize: 12,
    color: '#CECECE'
  },
  menuDesc: {
    flex: 1,
    justifyContent: 'space-between'
  },
  menuImage: {
    height: 80,
    width: 80,
    resizeMode: 'stretch',
    marginRight: 10
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    padding: 10
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  menuIcon: {
    marginRight: 20
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  menuTitle: {
    fontSize: 14
  },
  card: {
    borderRadius: 15,
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: '#dbdbdb',
    padding: 20,
    backgroundColor: '#FFF',
    marginVertical: 5,
    marginHorizontal: 5,
    paddingBottom: 5
  }
})
