import React, { Component } from 'react'
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import Collapsible from 'react-native-collapsible'

import DISCOUNT from '../assets/icon/discount.png'
export default class Promotion extends Component {
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
            <Image source={DISCOUNT} style={styles.icon} />
            <View style={styles.center}>
              <Text style={styles.title}>{name}</Text>
              <Text style={styles.expire}>Available until 1 Jan 2019</Text>
            </View>
            {contentVisible ? (
              <MaterialIcons
                name="keyboard-arrow-up"
                color="#E45655"
                size={20}
              />
            ) : (
              <MaterialIcons
                name="keyboard-arrow-down"
                color="#E45655"
                size={20}
              />
            )}
          </TouchableOpacity>
          <Collapsible style={styles.content} collapsed={!contentVisible}>
            <View style={styles.hr} />
            <Text style={styles.point}>{point} STAMPS</Text>
            <Text style={styles.description}>{description}</Text>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnText}>use now</Text>
            </TouchableOpacity>
          </Collapsible>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
    marginTop: 10
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
