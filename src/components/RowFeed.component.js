import React from 'react'
import {
  StyleSheet,
  View,
  Image,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import StarRating from 'react-native-star-rating'

const ED_SHEERAN = 'https://ichef.bbci.co.uk/images/ic/960x540/p02kq8k6.jpg'

const renderFeed = ({ item }) => {
  if (item && item.img) {
    return (
      <View style={styles.feed}>
        <View style={styles.header}>
          <Image source={{ uri: ED_SHEERAN }} style={styles.avatar} />
          <View style={styles.center}>
            <Text style={styles.name}>Shawn Mentos</Text>
            <Text style={styles.location}>Ada Best Burger Ever</Text>
          </View>
          <TouchableOpacity>
            <MaterialIcons name="more-vert" color="#7E7E7E" size={25} />
          </TouchableOpacity>
        </View>
        <View style={styles.br} />
        <Image source={{ uri: item.img }} style={styles.image} />
        <View style={[styles.row, { paddingVertical: 0, marginTop: 10 }]}>
          <StarRating
            disabled
            maxStars={5}
            rating={3}
            starSize={14}
            fullStarColor="#E45655"
            emptyStarColor="#E45655"
            starStyle={{ marginHorizontal: 2 }}
          />
          <Text style={[styles.note, { marginLeft: 5 }]}>
            (3)
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.note, { marginRight: 20 }]}>Shawn Mentos</Text>
          <Text style={styles.note}>
            Probably the best burger in Bangkok I guess..
          </Text>
        </View>
      </View>
    )
  }
}

export default props => {
  const { feeds } = props
  return (
    <View style={styles.wrapper}>
      <FlatList
        data={feeds}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderFeed}
        extraData={this.state}
        style={{ flex: 1, width: '100%', paddingBottom: 50 }}
        contentContainerStyle={{ paddingBottom: 50 }}
        scrollEnabled={false}
        extraData={props}
      />
    </View>
  )
}

const { width: WIDTH } = Dimensions.get('window')

const imageSize = WIDTH * 0.9

const styles = StyleSheet.create({
  note: {
    fontSize: 12
  },
  row: {
    width: '100%',
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  br: {
    marginVertical: 5
  },
  name: {
    marginBottom: 5,
    fontWeight: '500'
  },
  center: {
    flex: 1,
    paddingHorizontal: 10
  },
  location: {
    fontSize: 10,
    color: '#7E7E7E'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  feed: {
    padding: 10,
    alignItems: 'center',
    paddingHorizontal: WIDTH * 0.05
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  image: {
    width: imageSize,
    height: imageSize,
    borderRadius: 10,
    backgroundColor: '#dbdbdb'
  },
  wrapper: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  }
})
