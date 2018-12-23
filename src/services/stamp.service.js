const mock_data = [
  {
    name: 'WIMPY',
    quantity: 110,
    img: require('../assets/img/mock_stamp/wimpy.png')
  },
  {
    name: 'BURGER QUEEN',
    quantity: 10,
    img: require('../assets/img/mock_stamp/burger_queen.png')
  },
  {
    name: 'ADA RAMEN',
    quantity: 32,
    img: require('../assets/img/mock_stamp/ada_ramen.png')
  },
  {
    name: 'WAKAME',
    quantity: 12,
    img: require('../assets/img/mock_stamp/wakeame.png')
  },
  {
    name: 'STARDUCKS',
    quantity: 230,
    img: require('../assets/img/mock_stamp/starducks.png')
  }
]

const list = () => {
  return mock_data
}

export default {
  list
}
