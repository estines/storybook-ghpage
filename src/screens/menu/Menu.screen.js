import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  SafeAreaView
} from 'react-native'
import HeaderImageScrollView from 'react-native-image-header-scroll-view'
import { LinearGradient } from 'expo'
import { Header } from 'react-native-elements'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import { MaterialIcons } from '@expo/vector-icons'
import { connect } from 'react-redux'

// redux
import { addToCart } from '../../store/actions/index'
// assets
import HEADER from '../../assets/img/menu-bg.png'
import BAHT_SYMBOL_GROUP from '../../assets/img/bath-symbol-group.png'
import EMPTY_MENU from '../../assets/icon/empty-cart.png'

// components
import CategoryCard from '../../components/CategoryCard.component'
import SearchMenu from '../../components/SearchMenu.component'
import MenuDetail from '../../components/modals/MenuDetail.modal'

const ScreenHeader = props => {
  return (
    <SafeAreaView style={{ backgroundColor: 'transparent', height: 50 }}>
      <Header
        leftComponent={
          <TouchableOpacity style={styles.backButtonStyle} onPress={props.back}>
            <MaterialIcons name="keyboard-arrow-left" size={30} color="#FFF" />
          </TouchableOpacity>
        }
        centerComponent={{
          text: 'Menu',
          style: { color: '#FFF', fontSize: 20 }
        }}
        barStyle="light-content"
        containerStyle={{
          backgroundColor: 'transparent',
          justifyContent: 'space-around',
          borderBottomWidth: 0,
          paddingTop: ifIphoneX ? 0 : 10
        }}
      />
    </SafeAreaView>
  )
}

class MenuScreen extends Component {
  state = {
    menu: [],
    detailVisible: false,
    focusMenu: null,
    cart: []
  }

  renderCategory = ({ item }) => {
    const { cart } = this.state
    const {
      menu: { menu }
    } = this.props
    if (item && item.menus.length > 0) {
      return (
        <CategoryCard
          data={item}
          cart={cart}
          menu={menu}
          addToCart={this.addToCart}
        />
      )
    }
  }

  addToCart = async (menu, type) => {
    if (type === 'INCREMENT') {
      this.setState({
        focusMenu: menu,
        detailVisible: true
      })
    } else if (type === 'DECREMENT') {
      const { id } = menu
      let { cart } = this.state
      let targetItems = await cart.filter(c => c.productId === id)
      if (targetItems && targetItems.length > 0) {
        const targetItem = targetItems[targetItems.length - 1]
        const { quantity } = targetItem
        targetItems = await targetItems.filter(t => t.id !== targetItem.id)
        if (quantity > 1) {
          const newQuantity = quantity - 1
          targetItem.quantity = newQuantity
          targetItems = [...targetItems, targetItem]
        }
      }
      const newCart = await cart.filter(c => c.productId !== id)
      this.setState({
        cart: [...newCart, ...targetItems]
      })
    }
  }

  onSubmit = item => {
    const { cart } = this.state
    this.setState({
      cart: [...cart, item],
      detailVisible: false
    })
  }

  renderTotalItems = () => {
    const { cart } = this.state
    let total = 0
    for (let item of cart) {
      const { quantity } = item
      total += quantity
    }
    return total
  }

  back = () => {
    this.props.navigation.goBack()
  }

  submit = () => {
    const { cart } = this.state
    this.props.addToCart(cart)
    this.props.navigation.goBack()
  }

  fetchCategories = async () => {
    this.setState({ loading: true })
    await this.props.fetchCategories()
    this.setState({ loading: false })
  }

  render () {
    const { detailVisible, focusMenu, loading } = this.state
    const {
      menu: { categories },
      cart: {
        restaurant: { name: restaurantName, aboutUs: restaurantDescription }
      }
    } = this.props
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
              <ScreenHeader back={this.back} />
            </View>
          )}
        >
          <View style={styles.container}>
            <View style={[styles.card, styles.restaurantCard]}>
              <View style={styles.col}>
                <Text style={styles.title}>{restaurantName}</Text>
                <Text style={styles.subTitle}>{restaurantDescription}</Text>
              </View>
              <Image source={BAHT_SYMBOL_GROUP} style={styles.bahtSymbol} />
            </View>
            <View style={styles.br} />
            <SearchMenu />
            {categories.length > 0 ? (
              <View style={styles.container}>
                <FlatList
                  data={categories}
                  keyExtractor={(item, index) => index.toString()}
                  extraData={this.state}
                  renderItem={this.renderCategory}
                  style={{ height: '100%', width: '100%' }}
                  contentContainerStyle={{ paddingBottom: 100 }}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            ) : (
              <View style={styles.container}>
                <Image source={EMPTY_MENU} />
                <Text style={styles.emptyTitle}>
                  You haven’t added any item
                </Text>
              </View>
            )}
          </View>
        </HeaderImageScrollView>
        <View style={styles.submitButtonWrapper}>
          <TouchableOpacity style={styles.submitBtnTouch} onPress={this.submit}>
            <LinearGradient
              style={styles.submitBtn}
              colors={['#EE805F', '#E9685F', '#E8615F']}
              start={[0, 0]}
              end={[1, 0]}
            >
              <Text style={styles.submitBtnText}>
                Order {this.renderTotalItems()} item
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <MenuDetail
          onClose={() => this.setState({ detailVisible: false })}
          visible={detailVisible}
          data={focusMenu}
          submit={this.onSubmit}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  backButtonStyle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  foreground: {
    flex: 1
  },
  submitBtnTouch: {
    width: '60%',
    position: 'relative'
  },
  submitBtnText: {
    color: '#FFF',
    fontSize: 18
  },
  submitButtonWrapper: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
    width: '100%'
  },
  submitBtn: {
    backgroundColor: 'red',
    width: '100%',
    padding: 15,
    alignItems: 'center',
    borderRadius: 30,
    shadowColor: '#EE805F',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 10
  },
  bahtSymbol: {
    width: 40,
    height: 20,
    resizeMode: 'contain'
  },
  subTitle: {
    fontSize: 14,
    color: '#7E7E7E'
  },
  restaurantCard: {
    marginTop: -50,
    zIndex: 100,
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 30
  },
  container: {
    paddingHorizontal: '5%'
  },
  card: {
    borderRadius: 15,
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: '#dbdbdb',
    padding: 20,
    backgroundColor: '#FFF'
  },

  title: {
    color: '#000',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5
  },
  screen: {
    flex: 1,
    backgroundColor: '#F7F7F7'
  }
})

const mapState = state => {
  return {
    ...state
  }
}

export default connect(
  mapState,
  { addToCart }
)(MenuScreen)
