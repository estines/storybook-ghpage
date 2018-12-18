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

export default class CategoryCard extends Component {
  state = {
    amount: 0,
    showBody: false
  }

  onPressCounter = (name, amount) => {
    this.setState({ [name]: amount })
  }
  renderMenu = ({ item }) => {
    const { img, name, description, price, id } = item
    const counterName = `amount_${id}`
    return (
      <View style={styles.menuItem}>
        <Image source={img} style={styles.menuImage} />
        <View style={styles.menuDesc}>
          <View style={styles.menuDescTop}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
          <View style={[styles.row, styles.priceRow]}>
            <Text style={styles.price}>{`฿ ${price}`}</Text>
            <CounterButton
              value={this.state[counterName] || 0}
              onChange={this.onPressCounter}
              name={counterName}
            />
          </View>
        </View>
      </View>
    )
  }
  render () {
    const {
      data: { icon, title },
      menu
    } = this.props
    const { showBody } = this.state
    return (
      <View style={[styles.card]}>
        <TouchableWithoutFeedback
          onPress={() => this.setState({ showBody: !showBody })}
        >
          <View style={styles.cardHeader}>
            <View style={styles.row}>
              <Image
                source={icon}
                style={[styles.menuIcon, { tintColor: showBody ? '#EE805F' : '#898989' }]}
              />
              <Text style={styles.menuTitle}>{title}</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="gray" />
          </View>
        </TouchableWithoutFeedback>
        <Collapsible style={styles.cardBody} collapsed={!showBody}>
          <FlatList
            data={menu}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderMenu}
            extraData={this.state}
          />
        </Collapsible>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cardBody: {
    marginTop: 20
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
    resizeMode: 'stretch'
  },
  menuDesc: {
    flex: 1,
    paddingLeft: 10
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
    shadowOpacity: 0.2,
    shadowRadius: 5,
    borderWidth: 0.2,
    borderColor: '#dbdbdb',
    padding: 20,
    backgroundColor: '#FFF',
    marginVertical: 5,
    marginHorizontal: 5
  }
})
