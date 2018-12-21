import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  Text,
  FlatList,
  ScrollView,
  Modal,
  TouchableOpacity
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo'

import LINE from '../../assets/icon/line.png'
import CLOCK from '../../assets/icon/clock.png'
import Radio from '../../components/Radio.component'
import CheckBox from '../../components/CheckBox.component'
import CounterButton from '../../components/CounterButton.component'

export default class MenuDetailModal extends Component {
  state = {
    selectedOptions: [],
    quantity: 1
  }
  open = () => {
    this.refs.detailModal.open()
  }

  selectOption = async (groupId, optionId) => {
    let { selectedOptions } = this.state
    const targetGroup = await selectedOptions.find(s => s.groupId === groupId)
    if (targetGroup && targetGroup.groupId) {
      selectedOptions = await selectedOptions.filter(s => s.groupId !== groupId)
    }
    selectedOptions.push({ groupId, optionId })
    this.setState({
      selectedOptions
    })
  }

  selectMultipleOption = async (groupId, optionId) => {
    let { selectedOptions } = this.state
    let targetGroup = await selectedOptions.find(s => s.groupId === groupId)
    if (targetGroup && targetGroup.groupId) {
      let { optionIds } = targetGroup
      if (optionIds.includes(optionId)) {
        optionIds = await optionIds.filter(g => g !== optionId)
      } else {
        await optionIds.push(optionId)
      }
      selectedOptions = await selectedOptions.filter(s => s.groupId !== groupId)
      if (optionIds.length > 0) {
        selectedOptions.push({ groupId, optionIds })
      }
    } else {
      selectedOptions.push({ groupId, optionIds: [optionId] })
    }
    this.setState({
      selectedOptions
    })
  }

  renderOption = ({ item }, multiple, groupId) => {
    const { name, price, highlight, id } = item
    const { selectedOptions } = this.state
    const targetOption = selectedOptions.find(o => o.groupId === groupId)
    let checked = false
    if (multiple) {
      if (targetOption && targetOption.groupId) {
        checked = targetOption.optionIds.includes(id)
      }
    } else {
      if (targetOption && targetOption.groupId) {
        checked = targetOption.optionId === id
      }
    }
    return (
      <View style={styles.optionRow}>
        <Text
          style={[styles.optionTitle, highlight ? styles.highlightText : {}]}
        >
          {name}
        </Text>
        <View style={styles.textRow}>
          {price && price > 0 ? (
            <Text style={styles.extraPrice}>{`+ ฿${price}`}</Text>
          ) : null}
          {multiple ? <CheckBox checked={checked} onPress={() => this.selectMultipleOption(groupId, id)} /> : <Radio checked={checked} onPress={() => this.selectOption(groupId, id, checked)} />}
        </View>
      </View>
    )
  }

  renderMainOption = ({ item }) => {
    const { name, required, options, multiple, id } = item
    return (
      <View style={styles.mainOption}>
        <View style={[styles.textRow, { justifyContent: 'space-between' }]}>
          <Text style={styles.mainOptionTitle}>{name}</Text>
          {required ? (
            <Text style={styles.required}>REQUIRED</Text>
          ) : (
            <Text style={styles.optional}>OPTIONAL</Text>
          )}
        </View>
        <View style={styles.br} />
        <View style={styles.optionCard}>
          <FlatList
            data={options}
            keyExtractor={(item, index) => (index + 100).toString()}
            renderItem={data => this.renderOption(data, multiple, id)}
            style={{ width: '100%' }}
            scrollEnabled={false}
          />
        </View>
      </View>
    )
  }

  calTotalPrice = () => {
    const { selectedOptions } = this.state
    const { data: { options, price } } = this.props
    let totalOptionPrice = 0
    if (selectedOptions && selectedOptions.length > 0) {
      for (let selectedOption of selectedOptions) {
        if (selectedOption.optionIds) {
          const { optionIds, groupId } = selectedOption
          for (let optionId of optionIds) {
            const targetGroup = options.find(o => o.id === groupId)
            if (targetGroup && targetGroup.id) {
              const targetOption = targetGroup.options.find(g => g.id === optionId)
              if (targetOption && targetOption.price) {
                totalOptionPrice += targetOption.price
              }
            }
          }
        } else {
          const { groupId, optionId } = selectedOption
          const targetGroup = options.find(o => o.id === groupId)
          if (targetGroup && targetGroup.id) {
            const targetOption = targetGroup.options.find(g => g.id === optionId)
            if (targetOption && targetOption.price) {
              totalOptionPrice += targetOption.price
            }
          }
        }
      }
    }
    return price + totalOptionPrice
  }

  calTotalPriceAsync = async () => {
    const { selectedOptions } = this.state
    const { data: { options, price } } = this.props
    let totalOptionPrice = 0
    if (selectedOptions && selectedOptions.length > 0) {
      for (let selectedOption of selectedOptions) {
        if (selectedOption.optionIds) {
          const { optionIds, groupId } = selectedOption
          for (let optionId of optionIds) {
            const targetGroup = await options.find(o => o.id === groupId)
            if (targetGroup && targetGroup.id) {
              const targetOption = await targetGroup.options.find(g => g.id === optionId)
              if (targetOption && targetOption.price) {
                totalOptionPrice += targetOption.price
              }
            }
          }
        } else {
          const { groupId, optionId } = selectedOption
          const targetGroup = await options.find(o => o.id === groupId)
          if (targetGroup && targetGroup.id) {
            const targetOption = await targetGroup.options.find(g => g.id === optionId)
            if (targetOption && targetOption.price) {
              totalOptionPrice += targetOption.price
            }
          }
        }
      }
    }
    return price + totalOptionPrice
  }

  onQuantityChange = type => {
    let { quantity } = this.state
    if (type === 'INCREMENT') {
      quantity += 1
    } else if (type === 'DECREMENT') {
      quantity = quantity - 1 > 0 ? quantity - 1 : 1
    }
    this.setState({
      quantity
    })
  }

  renderBody = () => {
    const { data, onClose } = this.props
    if (data && data !== null) {
      const { quantity } = this.state
      const { gallery, name, description, estimated_time, options } = data
      const totalPrice = this.calTotalPrice()
      return (
        <View style={styles.wrapper}>
          <TouchableOpacity style={styles.top} onPress={onClose}>
            <SafeAreaView>
              <Image source={LINE} />
            </SafeAreaView>
            <View style={styles.br} />
            <View style={styles.textRow}>
              <Text style={styles.title}>Menu Detail</Text>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={18}
                color="gray"
                style={{ marginLeft: 10, marginTop: 5 }}
              />
            </View>
            <View style={styles.br} />
          </TouchableOpacity>
          <ScrollView
            style={{ width: '100%', paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
          >
            <Image source={{ uri: gallery[0] }} style={styles.photo} />
            <View style={styles.card}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.description}>{description}</Text>
              <View style={styles.textRow}>
                <Image source={CLOCK} />
                <Text style={styles.time}>{estimated_time}</Text>
              </View>
            </View>
            <View style={styles.br} />
            <FlatList
              data={options}
              keyExtractor={(item, index) => index.toString()}
              renderItem={this.renderMainOption}
              style={{ width: '100%' }}
              scrollEnabled={false}
              extraData={this.state}
            />
          </ScrollView>
          <SafeAreaView>
            <View style={styles.footer}>
              <View style={styles.col}>
                <View style={styles.qtyCol}>
                  <CounterButton size="big" value={quantity} onChange={this.onQuantityChange} />
                </View>
              </View>
              <View style={[styles.col]}>
                <TouchableOpacity onPress={this.submit}>
                  <LinearGradient
                    style={styles.totalPriceCol}
                    colors={['#EE805F', '#E9685F', '#E8615F']}
                    start={[0, 0]}
                    end={[1, 0]}
                  >
                    <Text style={styles.totalPrice}>THB {totalPrice}</Text>
                    <Text style={styles.addToCart}>ADD TO CART</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </View>
      )
    }
  }

  getOptionsName = async (selectedOptions) => {
    try {
      let optionsName = []
      const { data: { options } } = this.props
      for (let selectedOption of selectedOptions) {
        const { groupId, optionIds, optionId } = selectedOption
        if (optionIds) {
          const targetOptions = await options.find(o => o.id === groupId)
          const { options: subOptions } = targetOptions
          const targetSubOptions = await subOptions.filter(o => optionIds.includes(o.id))
          const targetSubOptionsName = await targetSubOptions.map(o => o.name)
          optionsName = [ ...optionsName, ...targetSubOptionsName ]
        } else {
          const targetOptions = await options.find(o => o.id === groupId)
          const { options: subOptions } = targetOptions
          const targetSubOptions = await subOptions.find(o => o.id === optionId)
          optionsName = [ ...optionsName, targetSubOptions.name ]
        }
      }
      return optionsName
    } catch (error) {
      throw error
    }
  }

  submit = async () => {
    const { selectedOptions, quantity } = this.state
    const totalPrice = await this.calTotalPriceAsync()
    const { data: { id, name } } = this.props
    const optionsName = await this.getOptionsName(selectedOptions)
    this.props.submit({ id: Date.now(), productId: id, productName: name, options: selectedOptions, selectedOptionsName: optionsName, quantity, totalPrice })
    this.setState({
      selectedOptions: [],
      quantity: 1
    })
  }

  render () {
    const { visible } = this.props
    return (
      <Modal
        visible={visible}
        style={styles.modal}
        ref="detailModal"
        backdropPressToClose
        backdrop
        position="bottom"
        backdropOpacity={0.1}
        transparent
        animationType="side"
      >
        {this.renderBody()}
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  qtyCol: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addToCart: {
    color: '#FFF',
    fontSize: 12
  },
  totalPrice: {
    fontSize: 22,
    color: '#FFF'
  },
  totalPriceCol: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  col: {
    flex: 1
  },
  footer: {
    backgroundColor: '#FFF',
    width: '100%',
    flexDirection: 'row'
  },
  optional: {
    color: '#7E7E7E',
    fontWeight: '300'
  },
  highlightText: {
    fontWeight: 'bold',
    color: '#000'
  },
  extraPrice: {
    color: '#E45655',
    fontWeight: '400',
    marginRight: 20
  },
  top: {
    alignItems: 'center',
    width: '100%'
  },
  optionTitle: {
    color: '#7E7E7E'
  },
  optionCard: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    width: '100%',
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    borderWidth: 0.2,
    borderColor: '#dbdbdb'
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderColor: '#dbdbdb',
    borderBottomWidth: 0.7
  },
  required: {
    color: '#E45655',
    fontSize: 14,
    fontWeight: '400'
  },
  mainOptionTitle: {
    fontSize: 18,
    marginLeft: 20,
    fontWeight: 'bold'
  },
  mainOption: {
    width: '100%',
    padding: 20
  },
  time: {
    color: '#7E7E7E',
    alignSelf: 'flex-start',
    marginLeft: 10
  },
  textRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  card: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    width: '100%',
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    borderWidth: 0.2,
    borderColor: '#dbdbdb'
  },
  br: {
    marginVertical: 10
  },
  description: {
    color: '#7E7E7E',
    alignSelf: 'flex-start',
    marginBottom: 10
  },
  name: {
    fontSize: 23,
    alignSelf: 'flex-start',
    marginBottom: 10
  },
  photo: {
    width: '100%',
    height: 200
  },
  modal: {
    backgroundColor: 'transparent'
  },
  wrapper: {
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  }
})
