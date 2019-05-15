import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { LinearGradient } from 'expo'
import { connect } from 'react-redux'

// redux
import { fetchProfile } from '../../store/actions'
// assets
import GRID from '../../assets/icon/grid.png'
import LIST from '../../assets/icon/list.png'

// services
import FeedService from '../../services/review.service'

// components
import GridFeed from '../../components/GridFeed.component'
import RowFeed from '../../components/RowFeed.component'
import Header from '../../components/Header.component'

import AVATAR from '../../assets/img/boy.png'

const SIDE_CONTENT = props => {
  const { label, value } = props
  return (
    <View style={styles.sideContent}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value.toLocaleString()}</Text>
    </View>
  )
}

const amountFromList = prices => {
  if (prices && prices.length > 0) {
    return prices.length > 1 ? prices.reduce((a, b) => a + b) : prices[0]
  } else {
    return 0
  }
}

const totalRestaurant = reviews => {
  let restaurants = []
  for (let review of reviews) {
    if (!restaurants.includes(review.restaurantId)) {
      restaurants.push(review.restaurantId)
    }
  }
  return restaurants.length
}

class FeedScreen extends Component {
  state = {
    image: '',
    viewType: 'grid',
    feeds: [],
    totalImages: 0,
    totalRestaurants: 0
  }

  async componentDidMount () {
    this.fetchFeed()
  }

  fetchFeed = async () => {
    try {
      const feeds = await FeedService.list()
      const amountList = await feeds.map(f => f.images.length)
      const totalImages = amountFromList(amountList)
      const totalRestaurants = totalRestaurant(feeds)
      this.setState({ feeds, totalImages, totalRestaurants })
    } catch (error) {
      console.log(error, 'error...')
    }
  }

  renderFeed = () => {
    const { feeds, viewType } = this.state
    if (viewType === 'grid') {
      return <GridFeed feeds={feeds} />
    }
    return <RowFeed feeds={feeds} />
  }

  back = () => {
    this.props.navigation.navigate('HomeScreen')
  }
  render () {
    const { viewType, totalImages, totalRestaurants } = this.state
    const { name, bio, image } = this.props
    let avatar = AVATAR
    if (image && image !== null) {
      avatar = {
        uri: `https://orderking.s3.amazonaws.com/images/thumbnail/${image}`
      }
    }
    return (
      <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
        <View style={styles.top}>
          <Header
            left="close"
            containerStyle={styles.header}
            onPressLeft={this.back}
          />
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.status}>{bio}</Text>
          <View style={styles.br} />
          <View style={styles.br} />
          <View style={styles.row}>
            <SIDE_CONTENT label="Pictures" value={totalImages} />
            <LinearGradient
              style={styles.avatarWrapper}
              colors={['#EF955E', '#BD5A5E']}
              start={[0, 0]}
              end={[1, 1]}
            >
              <Image
                source={avatar}
                style={[styles.avatar]}
              />
            </LinearGradient>
            <SIDE_CONTENT label="Restaurants" value={totalRestaurants} />
          </View>
          <View style={styles.br} />
        </View>
        <View style={styles.viewType}>
          <TouchableOpacity
            style={styles.col}
            onPress={() => this.setState({ viewType: 'grid' })}
          >
            <Image
              source={GRID}
              style={[
                styles.viewTypeIcon,
                viewType === 'grid' ? styles.viewActive : {}
              ]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.col}
            onPress={() => this.setState({ viewType: 'list' })}
          >
            <Image
              source={LIST}
              style={[
                styles.viewTypeIcon,
                viewType === 'list' ? styles.viewActive : {}
              ]}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.br} />
        {this.renderFeed()}
      </ScrollView>
    )
  }
}

const mapState = state => state.profile

export default connect(
  mapState,
  { fetchProfile }
)(FeedScreen)

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window')

const avatarSize = WIDTH * 0.3
const avatarWrapperSize = avatarSize + 10

const styles = StyleSheet.create({
  header: {
    paddingBottom: 0
  },
  viewActive: {
    tintColor: '#E45655'
  },
  viewTypeIcon: {
    tintColor: '#7E7E7E'
  },
  viewType: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#CECECE'
  },
  col: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5
  },
  sideContent: {
    alignItems: 'center'
  },
  value: {
    fontSize: 18
  },
  label: {
    fontSize: 10,
    marginBottom: 5
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  br: {
    marginVertical: 5
  },
  avatarWrapper: {
    width: avatarWrapperSize,
    height: avatarWrapperSize,
    borderRadius: avatarWrapperSize / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20
  },
  avatar: {
    width: avatarSize,
    height: avatarSize,
    borderRadius: avatarSize / 2,
    borderColor: '#FFF',
    borderWidth: avatarSize / 20,
    shadowColor: 'gray',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 10
    }
  },
  top: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: HEIGHT / 3
  },
  screen: {
    flex: 1,
    backgroundColor: '#FFF'
  }
})
