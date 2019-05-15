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
import { Header as NHeader } from 'react-navigation'
import * as Animatable from 'react-native-animatable'
import MaterialIcon from '@expo/vector-icons/MaterialIcons'

// redux
import { fetchMenu } from '../../store/actions'

// assets
import HEADER from '../../assets/img/history-bg.png'

// components
import HistoryTabHeader from '../../components/HistoryTabHeader.component'
import HistoryItem from '../../components/HistoryItem.component'

// services
import HistoryService from '../../services/order.service'
import { uniqString } from '../../libs/utils'

const MIN_HEIGHT = NHeader.HEIGHT
const MAX_HEIGHT = 200

class CartScreen extends Component {
  state = {
    paymentType: 'cash',
    historyDates: [],
    histories: [],
    display: true
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
    console.log(item, 'item...')
    return <HistoryItem data={item} onPress={this.viewHistory} />
  }

  renderHistoryDate = ({ item }) => {
    const date = new Date(item)
    const { histories, paymentType } = this.state
    const targetHistories = histories.filter(
      h => h.dateString === item && paymentType === h.paymentMethod
    )
    console.log(targetHistories, 'targetHistories..')
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
          maxHeight={MAX_HEIGHT}
          minHeight={MIN_HEIGHT}
          maxOverlayOpacity={0.6}
          minOverlayOpacity={0.3}
          fadeOutForeground
          headerImage={HEADER}
          contentContainerStyle={{
            backgroundColor: '#F6F6F6',
            paddingBottom: 50
          }}
          ScrollViewComponent={ScrollView}
          renderFixedForeground={() => (
            <Animatable.View
              style={styles.navTitleView}
              ref={navTitleView => {
                this.navTitleView = navTitleView
              }}
            >
              <Text style={styles.navTitle}>History</Text>
            </Animatable.View>
          )}
          renderForeground={() => (
            <View style={styles.titleContainer}>
              <TouchableOpacity onPress={this.back}>
                <MaterialIcon name="close" color="#FFF" size={30} />
              </TouchableOpacity>
              <Text style={styles.title}>History</Text>
            </View>
          )}
        >
          <TriggeringView
            style={styles.section}
            onHide={() => this.navTitleView.fadeInUp(200)}
            onDisplay={() => {
              this.navTitleView.fadeOut(100)
            }}
          />
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
    // alignSelf: 'center',
    // position: 'absolute',
    // left: 10,
    // top: 10
  },
  titleContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: '5%',
    position: 'relative'
  },
  navTitleView: {
    width: '100%',
    height: MIN_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
    paddingTop: 20,
    paddingHorizontal: '5%'
  },
  navTitle: {
    color: 'white',
    fontSize: 18,
    backgroundColor: 'transparent'
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
    fontWeight: 'bold',
    marginTop: 40
  },
  br: {
    marginVertical: 10
  },
  section: {
    flex: 1,
    position: 'relative'
  },
  container: {
    paddingHorizontal: '5%',
    flex: 1,
    width: '100%',
    zIndex: 100,
    marginTop: -30
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
