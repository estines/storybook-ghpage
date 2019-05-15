import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  RefreshControl
} from 'react-native'
import { connect } from 'react-redux'
import { MaterialIcons } from '@expo/vector-icons'

import { selectPaymentMethod, fetchCard } from '../../store/actions'
import Header from '../../components/Header.component'

import CASH from '../../assets/icon/cash.png'
import VISA from '../../assets/icon/visa.png'
import MASTER_CARD from '../../assets/icon/mastercard.png'

class PaymentMethod extends Component {
  state = {
    loading: false
  }
  componentDidMount = () => {
    this.props.fetchCard()
  }

  fetchCards = async () => {
    this.setState({ loading: true })
    await this.props.fetchCard()
    this.setState({ loading: false })
  }

  selectPaymentMethod = (paymentMethod, paymentMethodId) => {
    this.props.selectPaymentMethod({ paymentMethod, paymentMethodId })
  }

  renderPaymentMethod = ({ item }) => {
    const { paymentMethod, paymentMethodId } = this.props.cart
    const { last_digits, id, paymentType, brand } = item
    if (paymentType && paymentType === 'cash') {
      return (
        <TouchableOpacity
          style={styles.list}
          onPress={() => this.selectPaymentMethod('cash', null)}
        >
          <View style={styles.left}>
            <Image source={CASH} style={styles.listIcon} />
            <Text style={styles.thead}>Cash</Text>
          </View>
          {paymentMethod === 'cash' ? (
            <MaterialIcons name="check" size={20} color="#CCCCCC" />
          ) : null}
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity
          style={styles.list}
          onPress={() =>
            this.props.selectPaymentMethod({
              paymentMethod: 'card',
              paymentMethodId: id,
              paymentMethodData: { last_digits, brand }
            })
          }
        >
          <View style={styles.left}>
            <Image
              source={brand === 'Visa' ? VISA : MASTER_CARD}
              style={styles.listIcon}
            />
            <Text style={styles.thead}>{`**** **** **** ${last_digits}`}</Text>
          </View>
          {paymentMethod === 'card' && paymentMethodId === id ? (
            <MaterialIcons name="check" size={20} color="#CCCCCC" />
          ) : null}
        </TouchableOpacity>
      )
    }
  }

  add = () => {
    this.props.navigation.navigate('AddPaymentMethod')
  }

  back = () => {
    this.props.navigation.goBack()
  }

  render () {
    const {
      card: { cards }
    } = this.props
    return (
      <View style={styles.screen}>
        <Header left="back" onPressLeft={this.back} center="Payment Method" />
        <View style={styles.theadWrapper}>
          <Text style={styles.thead}>Payment Method</Text>
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.loading}
              onRefresh={this.fetchCards}
            />
          }
        >
          <FlatList
            data={[
              ...cards,
              {
                id: 0,
                paymentType: 'cash'
              }
            ]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderPaymentMethod}
            style={styles.listContainer}
            extraData={this.props}
            scrollEnabled={false}
          />
          <TouchableOpacity style={styles.list} onPress={this.add}>
            <View style={styles.center}>
              <MaterialIcons name="add" size={30} color="#E45655" />
              <Text style={styles.title}>Add Payment Method</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

const mapState = state => state

export default connect(
  mapState,
  { selectPaymentMethod, fetchCard }
)(PaymentMethod)

const styles = StyleSheet.create({
  title: {
    color: '#E45655',
    fontWeight: '600',
    marginLeft: 10
  },
  center: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  listIcon: {
    marginRight: 10,
    width: 30,
    height: 30,
    resizeMode: 'contain'
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  listContainer: {
    borderColor: '#CCCCCC',
    borderTopWidth: 0.3
  },
  list: {
    padding: 10,
    paddingHorizontal: 30,
    backgroundColor: '#FFF',
    borderColor: '#CCCCCC',
    borderBottomWidth: 0.3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  theadWrapper: {
    padding: 20
  },
  thead: {},
  screen: {
    flex: 1,
    backgroundColor: '#F6F6F6'
  }
})
