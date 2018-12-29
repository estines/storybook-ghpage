import React from 'react'
import { View, ImageBackground, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
export default props => {
  return (
    <ImageBackground
      style={styles.screen}
      source={require('../../assets/img/main-bg.png')}
    >
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.topCard}>
            <TouchableOpacity style={styles.closeBtn} onPress={() => props.navigation.navigate('HomeScreen')}>
              <MaterialIcons name="close" color="#FFF" size={30} />
            </TouchableOpacity>
            <Text style={styles.title}>Congrats!</Text>
            <Image source={require('../../assets/img/star.png')} style={{ marginVertical: 20 }} />
          </View>
          <Text style={styles.bottom}>
            <Text style={styles.subTitle}>
              You earned <Text style={styles.highlight}>+ 2 stamps</Text>
            </Text>
          </Text>
        </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  closeBtn: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 20,
    right: 20
  },
  highlight: {
    color: '#FF3B30'
  },
  subTitle: {
    fontWeight: '500',
    fontSize: 18,
    textAlign: 'center'
  },
  bottom: {
    alignItems: 'center',
    padding: 20,
    width: '100%'
  },
  title: {
    color: '#FFF',
    fontSize: 23,
    fontWeight: 'bold'
  },
  card: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10
  },
  topCard: {
    backgroundColor: '#E45655',
    padding: 20,
    alignItems: 'center',
    paddingTop: 40
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '10%',
    width: '100%'
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
