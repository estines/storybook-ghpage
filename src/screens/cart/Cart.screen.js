import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, Text } from 'react-native'
import HeaderImageScrollView from 'react-native-image-header-scroll-view'

// assets
import HEADER from '../../assets/img/cart-header.png'

// components
import TableCard from '../../components/TableCard.component'
import CardItemCard from '../../components/CardItemCard.component'

export default class LoginScreen extends Component {
  showMenu = () => {
    this.props.navigation.navigate('Menu')
  }
  render () {
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
            <TableCard />
            <View style={styles.br} />
            <CardItemCard add={this.showMenu} />
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
