import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, Text } from 'react-native'
import HeaderImageScrollView from 'react-native-image-header-scroll-view'
import { connect } from 'react-redux'

// redux
import { fetchMenu } from '../../store/actions'
// assets
import HEADER from '../../assets/img/cart-header.png'

// components
import TableCard from '../../components/TableCard.component'
import CardItemCard from '../../components/CardItemCard.component'

class CartScreen extends Component {
  async componentDidMount () {
    try {
      this.setState({ loading: true })
      await this.props.fetchMenu()
      this.setState({ loading: false })
    } catch (error) {
      this.setState({ loading: false })
    }
  }

  showMenu = () => {
    this.props.navigation.navigate('Menu')
  }
  render () {
    const { cart: { cart } } = this.props
    return (
      <View style={styles.screen}>
        <HeaderImageScrollView
          maxHeight={200}
          minHeight={100}
          headerImage={HEADER}
          showsVerticalScrollIndicator={false}
          style={{ paddingBottom: 100 }}
          contentContainerStyle={{ marginBottom: 100 }}
          ScrollViewComponent={ScrollView}
          renderFixedForeground={() => (
            <View style={styles.foreground}>
              <Text style={styles.title}>My Cart</Text>
            </View>
          )}
        >
          <View style={styles.container}>
            <TableCard cart={cart} />
            <View style={styles.br} />
            <CardItemCard add={this.showMenu} cart={cart} />
          </View>
        </HeaderImageScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
    paddingHorizontal: '5%'
  },
  screen: {
    flex: 1,
    backgroundColor: '#F7F7F7'
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
  { fetchMenu }
)(CartScreen)
