import React, { Component } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { Button } from 'react-native-elements'
import { StackActions, NavigationActions } from 'react-navigation'
import format from 'date-fns/format'
import { connect } from 'react-redux'

import { checkIn } from '../../store/actions'

// components
import Header from '../../components/Header.component'

// assets
import SCAN from '../../assets/img/circle-qr.png'
class ScanResultScreen extends Component {
  state = {
    tableData: {
      restaurant: {
        name: ''
      },
      name: ''
    }
  }
  componentDidMount = () => {
    const { tableData } = this.props.navigation.state.params
    this.setState({
      tableData
    })
  }

  back = () => {
    this.props.navigation.goBack()
  }

  next = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Scan' })]
    })
    const { tableData } = this.state
    const { restaurant } = tableData
    delete tableData.restaurant
    const x = {restaurant, table: tableData}
    console.log(JSON.stringify(x))
    this.props.checkIn({ restaurant, table: tableData })
    this.props.navigation.dispatch(resetAction)
    this.props.navigation.navigate('Cart')
  }

  render () {
    const {
      name,
      restaurant: { name: restaurantName }
    } = this.state.tableData
    return (
      <View style={styles.screen}>
        <Header left="back" onPressLeft={this.back} />
        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.title}>Welcome to</Text>
            <Text style={styles.title}>{restaurantName}</Text>
            <Image source={SCAN} style={styles.scanImage} />
            <Text style={styles.subTitle}>Table {name}</Text>
            <Text style={styles.date}>
              Date/ Time: {format(new Date(), 'DD/MM/YYYY / HH:mm')}
            </Text>
            <Button
              title="Next"
              buttonStyle={styles.button}
              onPress={this.next}
            />
          </View>
        </View>
      </View>
    )
  }
}

export default connect(
  null,
  { checkIn }
)(ScanResultScreen)

const styles = StyleSheet.create({
  date: {},
  subTitle: {
    fontSize: 18,
    marginBottom: 5
  },
  button: {
    width: '100%',
    marginTop: 40,
    padding: 5,
    borderRadius: 30,
    backgroundColor: '#E45655',
    shadowColor: '#E45655',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5
  },
  scanImage: {},
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 5
  },
  container: {
    flex: 1,
    paddingHorizontal: '5%',
    alignItems: 'center',
    paddingBottom: '20%'
  },
  card: {
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    backgroundColor: '#FFF',
    width: '100%',
    alignItems: 'center',
    padding: '10%',
    flex: 1
  },
  screen: {
    flex: 1,
    backgroundColor: '#FFF'
  }
})
