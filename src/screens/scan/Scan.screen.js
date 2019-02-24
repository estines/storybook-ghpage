import React, { Component } from 'react'
import { View, StyleSheet, Text, Image, Alert } from 'react-native'
import { Button } from 'react-native-elements'
import { Permissions } from 'expo'
// components
import Header from '../../components/Header.component'
import ScanModal from '../../components/modals/Scan.modal'

// assets
import SCAN from '../../assets/img/scan-gif.gif'

// services
import TableService from '../../services/table.service'

export default class ScanScreen extends Component {
  state = {
    scannerVisible: false
  }

  componentDidMount = () => {
    Permissions.askAsync(Permissions.CAMERA)
  }

  toggleScanner = () => {
    const { scannerVisible } = this.state
    this.setState({
      scannerVisible: !scannerVisible
    })
  }

  back = () => {
    this.props.navigation.navigate('HomeScreen')
  }

  onRead = () => {
    this.setState({
      scannerVisible: false
    })
    this.props.navigation.navigate('ScanResult')
  }

  testScan = async () => {
    try {
      const dataString = '5c69a272bd9dc638b568280a'
      const tableData = await TableService.get(dataString)
      if (tableData && tableData.id) {
        this.props.navigation.navigate('ScanResult', { tableData })
      }
    } catch (error) {
      Alert.alert('Error', error.message)
    }
  }

  render () {
    const { scannerVisible } = this.state
    return (
      <View style={styles.screen}>
        <Header center="Scan QR code" left="close" onPressLeft={this.back} />
        <View style={styles.container}>
          <View style={styles.card}>
            <Image source={SCAN} style={styles.scanImage} />
            <Text style={styles.title}>This QR code is very safe</Text>
            <Text style={styles.title}>share to any others</Text>
            <Button
              title="Scan Code"
              buttonStyle={styles.button}
              onPress={this.toggleScanner}
            />
            <Button
              title="Test Scan Code"
              buttonStyle={styles.button}
              onPress={this.testScan}
            />
          </View>
        </View>
        <ScanModal
          visible={scannerVisible}
          onClose={this.toggleScanner}
          onRead={this.onRead}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginTop: 50,
    padding: 5,
    borderRadius: 30,
    backgroundColor: '#E45655',
    shadowColor: '#E45655',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5
  },
  scanImage: {
    marginBottom: 40
  },
  title: {
    fontSize: 14,
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
    justifyContent: 'space-between',
    flex: 1
  },
  screen: {
    flex: 1,
    backgroundColor: '#FFF'
  }
})
