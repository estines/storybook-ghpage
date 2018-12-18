import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import HeaderImageScrollView from 'react-native-image-header-scroll-view'
import { LinearGradient } from 'expo'

// assets
import HEADER from '../../assets/img/menu-bg.png'
import BAHT_SYMBOL_GROUP from '../../assets/img/bath-symbol-group.png'

// components
import CategoryCard from '../../components/CategoryCard.component'
import SearchMenu from '../../components/SearchMenu.component'

// services
import menuService from '../../services/menu.service'

const CATEGORIES = [
  {
    icon: require('../../assets/icon/most-popular.png'),
    title: 'Most Popular'
  },
  { icon: require('../../assets/icon/noodles.png'), title: 'Noodles' },
  { icon: require('../../assets/icon/rice.png'), title: 'Rice' },
  { icon: require('../../assets/icon/drinks.png'), title: 'Drinks' }
]

export default class LoginScreen extends Component {
  state = {
    menu: []
  }

  componentDidMount () {
    this.fetchMenu()
  }

  fetchMenu = async () => {
    this.setState({ loading: true })
    setTimeout(() => {
      const menu = menuService.list()
      this.setState({ menu, loading: false })
    }, 0)
  }

  renderCategory = ({ item }) => {
    return <CategoryCard data={item} menu={this.state.menu} />
  }
  render () {
    const { menu } = this.state
    return (
      <View style={styles.screen}>
        <HeaderImageScrollView
          maxHeight={200}
          minHeight={100}
          headerImage={HEADER}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <View style={[styles.card, styles.restaurantCard]}>
              <View style={styles.col}>
                <Text style={styles.title}>Ada Ramen</Text>
                <Text style={styles.subTitle}>Japanese Restaurant</Text>
              </View>
              <Image source={BAHT_SYMBOL_GROUP} style={styles.bahtSymbol} />
            </View>
            <View style={styles.br} />
            <SearchMenu />
            <FlatList
              data={CATEGORIES}
              keyExtractor={(item, index) => index.toString()}
              renderItem={this.renderCategory}
              extraData={menu}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <View style={styles.submitButtonWrapper}>
            <TouchableOpacity style={styles.submitBtnTouch}>
              <LinearGradient
                style={styles.submitBtn}
                colors={['#EE805F', '#E9685F', '#E8615F']}
                start={[0, 0]}
                end={[1, 0]}
              >
                <Text style={styles.submitBtnText}>Order 0 item</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </HeaderImageScrollView>
      </View>
    )
  }
}

const { height: HEIGHT } = Dimensions.get('window')

const styles = StyleSheet.create({
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
    top: HEIGHT - 300,
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
