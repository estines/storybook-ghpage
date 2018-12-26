import React from 'react'
import { StyleSheet, View, Image, FlatList, Dimensions } from 'react-native'

const renderFeed = ({ item }) => {
  return (
    <View style={styles.imgWrapper}>
      {item.img ? (
        <Image source={{ uri: item.img }} style={styles.image} />
      ) : null}
    </View>
  )
}

export default props => {
  const { feeds } = props
  const lastRowLength = feeds.length % 3
  const missingLength = 3 - lastRowLength
  let finalFeeds = feeds
  for (let i = 1; i <= missingLength; i++) {
    finalFeeds.push({})
  }
  return (
    <View style={styles.wrapper}>
      <FlatList
        data={finalFeeds}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderFeed}
        extraData={this.state}
        style={{ flex: 1, width: '100%', paddingBottom: 50 }}
        contentContainerStyle={{ paddingBottom: 50 }}
        numColumns={3}
        columnWrapperStyle={styles.row}
        scrollEnabled={false}
      />
    </View>
  )
}

const { width: WIDTH } = Dimensions.get('window')

const imageSize = WIDTH / 3 - 5

const styles = StyleSheet.create({
  imgWrapper: {
    flex: 1,
    padding: 5
  },
  row: {
    backgroundColor: '#FFF',
    justifyContent: 'space-around',
    marginBottom: 1,
    paddingLeft: 10,
    paddingRight: 10
  },
  image: {
    width: '100%',
    height: imageSize
  },
  wrapper: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  }
})
