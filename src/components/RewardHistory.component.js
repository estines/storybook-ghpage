import React, { Component } from 'react'
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import Collapsible from 'react-native-collapsible'

import FREE_DRINK from '../assets/icon/free-drink.png'
import EARNPOINT from '../assets/icon/earn-point.png'

export default class RewardHistory extends Component {
  state = {
    contentVisible: false
  }

  toggleContent = () => {
    const { contentVisible } = this.state
    this.setState({
      contentVisible: !contentVisible
    })
  }
  render () {
    const {
      data: { name, point, description }
    } = this.props
    const { contentVisible } = this.state
    return (
      <View style={styles.wrapper}>
        <View style={styles.card}>
          <TouchableOpacity style={styles.row} onPress={this.toggleContent}>
            {point > 0 ? (
              <Image source={EARNPOINT} style={styles.icon} />
            ) : (
              <Image source={FREE_DRINK} style={styles.icon} />
            )}
            <View style={styles.center}>
              <Text style={styles.title}>{name}</Text>
              <Text style={styles.expire}>14 December 2018</Text>
            </View>
            {point > 0 ? (
              <Text style={styles.point}>{point} STAMPS</Text>
            ) : (
              <Text style={[styles.point, styles.use]}>{point} STAMPS</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  use: {
    color: '#E45655'
  },
  btnText: {
    color: '#FFF',
    fontWeight: '600'
  },
  btn: {
    width: '60%',
    backgroundColor: '#9ED14A',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  point: {
    marginBottom: 20,
    marginTop: 10,
    color: '#9ED14A'
  },
  description: {
    fontSize: 10,
    textAlign: 'center'
  },
  content: {
    padding: 10,
    alignItems: 'center'
  },
  hr: {
    width: '100%',
    height: 0.5,
    backgroundColor: '#7E7E7E',
    marginVertical: 10
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    marginBottom: 5
  },
  expire: {
    color: '#7E7E7E',
    fontSize: 10
  },
  icon: {
    marginRight: 20
  },
  center: {
    flex: 1,
    justifyContent: 'center'
  },
  card: {
    backgroundColor: '#FFF',
    width: '100%',
    borderRadius: 10,
    shadowColor: '#F17975',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    padding: 10,
    marginVertical: 5
  },
  wrapper: {
    paddingHorizontal: 10
  }
})
