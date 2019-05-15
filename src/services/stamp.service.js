const promotions = [
  {
    name: '10 % Discount',
    description: `Enjoy 10% off your food bill ! Discount applies to the regular price of food and non-alcoholic beverages. `,
    point: 30,
    expire: new Date()
  },
  {
    name: '10 % Discount',
    description: `Enjoy 10% off your food bill ! Discount applies to the regular price of food and non-alcoholic beverages. `,
    point: 30,
    expire: new Date()
  },
  {
    name: '10 % Discount',
    description: `Enjoy 10% off your food bill ! Discount applies to the regular price of food and non-alcoholic beverages. `,
    point: 30,
    expire: new Date()
  },
  {
    name: '10 % Discount',
    description: `Enjoy 10% off your food bill ! Discount applies to the regular price of food and non-alcoholic beverages. `,
    point: 30,
    expire: new Date()
  },
  {
    name: '10 % Discount',
    description: `Enjoy 10% off your food bill ! Discount applies to the regular price of food and non-alcoholic beverages. `,
    point: 30,
    expire: new Date()
  }
]

const mock_data = [
  {
    name: 'WIMPY',
    quantity: 110,
    img: require('../assets/img/mock_stamp/wimpy.png'),
    promotions
  },
  {
    name: 'BURGER QUEEN',
    quantity: 10,
    img: require('../assets/img/mock_stamp/burger_queen.png'),
    promotions
  },
  {
    name: 'ADA RAMEN',
    quantity: 32,
    img: require('../assets/img/mock_stamp/ada_ramen.png'),
    promotions
  },
  {
    name: 'WAKAME',
    quantity: 12,
    img: require('../assets/img/mock_stamp/wakeame.png'),
    promotions
  },
  {
    name: 'STARDUCKS',
    quantity: 230,
    img: require('../assets/img/mock_stamp/starducks.png'),
    promotions
  }
]

const mock_histories = [
  { name: 'Earned Free Drink', point: -10 },
  { name: 'Earned Stamps', point: 10 },
  { name: 'Earned Free Drink', point: -10 },
  { name: 'Earned Free Drink', point: -10 },
  { name: 'Earned Free Drink', point: -10 }
]

const list = () => {
  return mock_data
}

const get = () => {
  return mock_data[0]
}

const histories = () => {
  return mock_histories
}

export default {
  list,
  get,
  histories
}
