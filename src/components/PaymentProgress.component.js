import React from 'react'
import { View, Image, StyleSheet, Text } from 'react-native'

import ProgressBar from './ProgressBar.component'

export default props => {
  const { progress } = props
  const tintColor = progress < 100 ? '#FF3B30' : '#4CD964'
  const title =
    progress < 100 ? 'The Process of receiving the bill' : 'Process completed !'
  const progressTitle =
    progress < 100
      ? 'Expected arrival: in less than 10 minutes'
      : 'Expected arrival: arrived'
  return (
    <View style={styles.wrapper}>
      <View style={[styles.header, { backgroundColor: tintColor }]}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      <View style={styles.content}>
        <ProgressBar progress={progress} valueStyle="balloon" />
        <Text style={[styles.progressTitle, { color: tintColor }]}>
          {progressTitle}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  progressTitle: {
    alignSelf: 'center',
    marginTop: 5
  },
  content: {
    padding: 20,
    paddingVertical: 10,
    paddingTop: 30
  },
  headerTitle: {
    color: '#FFF'
  },
  header: {
    padding: 10,
    alignItems: 'center'
  },
  wrapper: {
    width: '100%',
    marginVertical: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    overflow: 'hidden'
  }
})
