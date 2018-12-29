import React from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native'

// components
import Header from '../components/Header.component'
// assets
import BARCODE from '../assets/icon/barcode.png'
import CART from '../assets/icon/cart.png'
import ACCOUNT from '../assets/icon/account.png'
import HISTORY from '../assets/icon/history.png'
import STAMPS from '../assets/icon/stamps.png'
import FEEDS from '../assets/icon/feeds.png'

const Row = props => {
  return <View style={styles.row}>{props.children}</View>
}

const Button = props => {
  return (
    <View style={styles.col}>
      <TouchableOpacity style={styles.card} onPress={props.onPress}>
        <Image source={props.icon} style={styles.icon} />
        <Text style={styles.title}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default props => {
  const {
    navigation: { openDrawer, navigate }
  } = props
  return (
    <View style={styles.screen}>
      <Header
        left="more"
        containerStyle={styles.header}
        onPressLeft={openDrawer}
      />
      <Row>
        <Button
          title="SCAN"
          icon={BARCODE}
          onPress={() => navigate('ScanStack')}
        />
        <Button
          title="MY CART"
          icon={CART}
          onPress={() => navigate('OrderStack')}
        />
      </Row>
      <Row>
        <Button
          title="ACCOUNT"
          icon={ACCOUNT}
          onPress={() => navigate('AccountStack')}
        />
        <Button
          title="HISTORY"
          icon={HISTORY}
          onPress={() => navigate('HistoryStack')}
        />
      </Row>
      <Row>
        <Button
          title="FEEDS"
          icon={FEEDS}
          onPress={() => navigate('FeedStack')}
        />
        <Button
          title="STAMPS"
          icon={STAMPS}
          onPress={() => navigate('StampStack')}
        />
      </Row>
    </View>
  )
}
const { width: WIDTH } = Dimensions.get('window')

const cardWidth = WIDTH / 2 - 30
const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0
  },
  title: {
    position: 'absolute',
    bottom: 20,
    fontWeight: 'bold'
  },
  card: {
    width: cardWidth,
    height: cardWidth,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#dbdbdb',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    position: 'relative'
  },
  col: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 15
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10
  }
})
