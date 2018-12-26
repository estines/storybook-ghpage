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

// assets
import GRID from '../../assets/icon/grid.png'
import LIST from '../../assets/icon/list.png'

// services
import FeedService from '../../services/feed.service'

// components
import GridFeed from '../../components/GridFeed.component'
import RowFeed from '../../components/RowFeed.component'

const ED_SHEERAN = 'https://ichef.bbci.co.uk/images/ic/960x540/p02kq8k6.jpg'

const SIDE_CONTENT = props => {
  const { label, value } = props
  return (
    <View style={styles.sideContent}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value.toLocaleString()}</Text>
    </View>
  )
}

export default class FeedScreen extends Component {
  state = {
    image: ED_SHEERAN,
    status: 'Literally born to eat 🍔',
    name: 'Shawn Mentos',
    viewType: 'grid',
    feeds: []
  }

  componentDidMount () {
    this.fetchFeed()
  }

  fetchFeed = () => {
    const feeds = FeedService.list()
    this.setState({ feeds })
  }

  renderFeed = () => {
    const { feeds, viewType } = this.state
    if (viewType === 'grid') {
      return <GridFeed feeds={feeds} />
    }
    return <RowFeed feeds={feeds} />
  }
  render () {
    const { status, name, viewType } = this.state
    return (
      <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
        <View style={styles.top}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.status}>{status}</Text>
          <View style={styles.br} />
          <View style={styles.br} />
          <View style={styles.row}>
            <SIDE_CONTENT label="Pictures" value={1608} />
            <LinearGradient
              style={styles.avatarWrapper}
              colors={['#EF955E', '#BD5A5E']}
              start={[0, 0]}
              end={[1, 1]}
            >
              <Image source={{ uri: ED_SHEERAN }} style={[styles.avatar]} />
            </LinearGradient>
            <SIDE_CONTENT label="Pictures" value={1608} />
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

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window')

const avatarSize = WIDTH * 0.3
const avatarWrapperSize = avatarSize + 10

const styles = StyleSheet.create({
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
    flex: 1
  }
})
