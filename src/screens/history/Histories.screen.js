import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  FlatList,
  TouchableOpacity
} from 'react-native'
import HeaderImageScrollView, {
  TriggeringView
} from 'react-native-image-header-scroll-view'
import { connect } from 'react-redux'
import format from 'date-fns/format'
import isSameDay from 'date-fns/is_same_day'
import { MaterialIcons } from '@expo/vector-icons'
import { ifIphoneX } from 'react-native-iphone-x-helper'

// redux
import { fetchMenu } from '../../store/actions'

// assets
import HEADER from '../../assets/img/history-bg.png'

// components
import HistoryTabHeader from '../../components/HistoryTabHeader.component'
import HistoryItem from '../../components/HistoryItem.component'
import Header from '../../components/Header.component'

// services
import HistoryService from '../../services/history.service'
import { uniqString } from '../../libs/utils'

class CartScreen extends Component {
  state = {
    paymentType: 'cash',
    historyDates: [],
    histories: []
  }
  async componentDidMount () {
    try {
      this.setState({ loading: true })
      await this.fetchHistories()
      this.setState({ loading: false })
    } catch (error) {
      this.setState({ loading: false })
    }
  }

  fetchHistories = async () => {
    try {
      const histories = await HistoryService.list()
      let historyDates = []
      const historiesWithDate = await histories.map(d => {
        historyDates.push(format(d.createdAt, 'YYYY-MM-DD'))
        return {
          ...d,
          dateString: format(d.createdAt, 'YYYY-MM-DD')
        }
      })
      historyDates = await uniqString(historyDates)
      this.setState({
        histories: historiesWithDate,
        historyDates
      })
    } catch (error) {
      console.log(error, 'error')
    }
  }

  showMenu = () => {
    this.props.navigation.navigate('Menu')
  }

  viewHistory = () => {
    this.props.navigation.navigate('History')
  }

  renderHistory = ({ item }) => {
    return <HistoryItem data={item} onPress={this.viewHistory} />
  }

  renderHistoryDate = ({ item }) => {
    const date = new Date(item)
    const { histories, paymentType } = this.state
    const targetHistories = histories.filter(
      h => h.dateString === item && paymentType === h.paymentType
    )
    let totalPrice = 0
    if (targetHistories.length > 0) {
      if (targetHistories.length > 1) {
        totalPrice = targetHistories
          .map(h => parseFloat(h.totalPrice))
          .reduce((a, b) => a + b)
      } else if (targetHistories.length === 1) {
        totalPrice = targetHistories[0].totalPrice
      }
    } else {
      return <View />
    }
    if (isSameDay(new Date(), date)) {
      return (
        <View style={styles.historyGroup}>
          <View style={styles.historyGroupHeader}>
            <Text style={styles.historyGroupTitle}>
              TODAY, {format(date, 'MMM DD, YYYY')}
            </Text>
            <Text style={styles.totalPrice}>
              ฿{totalPrice.toLocaleString()}
            </Text>
          </View>
          <View style={styles.br} />
          <FlatList
            data={targetHistories}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderHistory}
            style={{ width: '100%' }}
          />
        </View>
      )
    }
    return (
      <View style={styles.historyGroup}>
        <View style={styles.historyGroupHeader}>
          <Text style={styles.historyGroupTitle}>
            {format(date, 'ddd, MMM DD, YYYY')}
          </Text>
          <Text style={styles.totalPrice}>฿{totalPrice.toLocaleString()}</Text>
        </View>
        <View style={styles.br} />
        <FlatList
          data={targetHistories}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderHistory}
          style={{ width: '100%' }}
        />
      </View>
    )
  }

  back = () => {
    this.props.navigation.navigate('HomeScreen')
  }

  render () {
    const { paymentType, historyDates } = this.state
    return (
      <View style={styles.screen}>
        <HeaderImageScrollView
          maxHeight={200}
          minHeight={100}
          headerImage={HEADER}
          showsVerticalScrollIndicator={false}
          style={{
            backgroundColor: 'transparent',
            flex: 1,
            paddingBottom: 50
          }}
          contentContainerStyle={{
            backgroundColor: '#F6F6F6',
            paddingBottom: 50
          }}
          ScrollViewComponent={ScrollView}
          renderFixedForeground={() => (
            <View style={styles.foreground}>
              <TouchableOpacity style={styles.closeBtn} onPress={this.back}>
                <MaterialIcons name="close" size={30} color="#FFF" />
              </TouchableOpacity>
              <TriggeringView onHide={() => console.log('text hidden')}>
                <Text style={styles.title}>History</Text>
              </TriggeringView>
            </View>
          )}
        >
          <View style={styles.container}>
            <HistoryTabHeader
              selected={paymentType}
              onSelect={paymentType => this.setState({ paymentType })}
            />
            <View style={styles.br} />
          </View>
          <FlatList
            data={historyDates}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderHistoryDate}
            extraData={this.state}
            scrollEnabled={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        </HeaderImageScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  closeBtn: {
    position: 'absolute',
    top: ifIphoneX ? 40 : 10,
    left: 0,
    marginLeft: '5%'
  },
  totalPrice: {
    color: '#FF3B30'
  },
  historyGroupHeader: {
    paddingHorizontal: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  historyGroup: {
    paddingVertical: '5%',
    marginTop: 10
  },
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
    paddingHorizontal: '5%',
    backgroundColor: '#F6F6F6'
  },
  screen: {
    flex: 1,
    backgroundColor: '#F6F6F6'
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
