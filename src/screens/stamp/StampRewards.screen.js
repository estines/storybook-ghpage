import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  FlatList,
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView
} from 'react-native'
import { Header } from 'react-native-elements'
import { ifIphoneX } from 'react-native-iphone-x-helper'

// assets
import HEADER from '../../assets/img/stamp-bg.png'
import STAMP from '../../assets/img/stamp.png'

// services
import StampService from '../../services/stamp.service'
// components
import Progress from '../../components/circularProgress'
import TabHeader from '../../components/RewardTabHeader.component'
import Promotion from '../../components/Promotion.component'
import RewardHistory from '../../components/RewardHistory.component'
const { width: WIDTH, height: HEIGHT } = Dimensions.get('screen')

const CircularWidth = WIDTH * 0.5

const AppHeader = props => {
  return (
    <SafeAreaView style={{ backgroundColor: 'transparent' }}>
      <Header
        leftComponent={{
          icon: 'keyboard-arrow-left',
          color: '#FFF',
          size: 35,
          onPress: props.back
        }}
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

class StampRewards extends Component {
  state = {
    tab: 'available',
    promotions: [],
    histories: []
  }

  componentDidMount = () => {
    this.fetchStamp()
    this.fetchHistories()
  }

  fetchStamp = () => {
    const stamp = StampService.get()
    this.setState({ ...stamp })
  }

  fetchHistories = () => {
    const histories = StampService.histories()
    this.setState({ histories })
  }

  renderPromotion = ({ item }) => {
    return <Promotion data={item} />
  }

  renderHistory = ({ item }) => {
    return <RewardHistory data={item} />
  }

  renderTab = () => {
    const { tab, promotions, histories } = this.state
    if (tab === 'available') {
      return (
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ paddingBottom: 50 }}
        >
          <View style={styles.header}>
            <Text style={styles.thead}>Rewards Available</Text>
            <Text style={styles.value}>as of 07:12PM</Text>
          </View>
          <FlatList
            data={promotions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderPromotion}
            extraData={this.state}
            contentContainerStyle={{ paddingHorizontal: '5%' }}
            scrollEnabled={false}
          />
          <View style={styles.br} />
        </ScrollView>
      )
    } else if (tab === 'history') {
      return (
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ paddingBottom: 50 }}
        >
          <View style={styles.header}>
            <Text style={styles.thead}>Rewards History</Text>
            <Text style={styles.value}>as of 07:12PM</Text>
          </View>
          <FlatList
            data={histories}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderHistory}
            extraData={this.state}
            contentContainerStyle={{ paddingHorizontal: '5%' }}
            scrollEnabled={false}
          />
          <View style={styles.br} />
        </ScrollView>
      )
    }
  }

  back = () => {
    this.props.navigation.goBack()
  }

  render () {
    const { tab } = this.state
    return (
      <View style={styles.screen}>
        <ImageBackground source={HEADER} style={styles.top}>
          <AppHeader back={this.back} />
          <View style={styles.foreground}>
            <Text style={styles.title}>Ada Ramen</Text>
            <Progress
              size={CircularWidth}
              width={15}
              fill={50}
              missingDegree={90}
              tintColor="#00e0ff"
              tintColor="#FFFCFC"
              backgroundColor="#F6ABA2"
              style={styles.progress}
            >
              <Image source={STAMP} style={styles.stampIcon} />
              <View style={styles.progressContainer}>
                <Text style={styles.progressTitle}>50/100</Text>
              </View>
            </Progress>
          </View>
        </ImageBackground>
        {this.renderTab()}
        <View style={styles.tabHeaderWrapper}>
          <TabHeader selected={tab} onSelect={tab => this.setState({ tab })} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    paddingHorizontal: '5%',
    borderBottomWidth: 0.5,
    borderColor: '#CECECE'
  },
  top: {
    flex: 1,
    width: '100%'
  },
  tabHeaderWrapper: {
    position: 'absolute',
    bottom: HEIGHT / 2,
    right: 0,
    left: 0,
    zIndex: 500,
    paddingHorizontal: '5%'
  },
  stampIcon: {
    position: 'absolute',
    top: 60,
    width: 80,
    height: 80
  },
  progressTitle: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: '600'
  },
  progress: {
    alignItems: 'center',
    position: 'relative'
  },
  title: {
    color: '#FFF',
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 40
  },
  foreground: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: '5%',
    alignItems: 'center'
  },
  br: {
    marginVertical: 10
  },
  container: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 50
  },
  screen: {
    flex: 1,
    backgroundColor: '#F6F6F6'
  }
})

export default StampRewards
