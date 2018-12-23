import format from 'date-fns/format'
const mock_histories = [
  {
    id: 1,
    restaurant: 'Ada Ramen',
    table: 3,
    guests: 2,
    totalPrice: 560,
    createdAt: new Date('2018-12-23'),
    paymentType: 'card'
  },
  {
    id: 2,
    restaurant: 'Chinese One',
    table: 3,
    guests: 2,
    totalPrice: 560,
    createdAt: new Date('2018-12-23'),
    paymentType: 'card'
  },
  {
    id: 3,
    restaurant: 'Ada Ramen',
    table: 3,
    guests: 2,
    totalPrice: 560,
    createdAt: new Date('2018-12-22'),
    paymentType: 'cash'
  },
  {
    id: 4,
    restaurant: 'Burger Bubbadub',
    table: 3,
    guests: 2,
    totalPrice: 560,
    createdAt: new Date('2018-12-22'),
    paymentType: 'card'
  },
  {
    id: 5,
    restaurant: 'Bibimbub',
    table: 3,
    guests: 2,
    totalPrice: 560,
    createdAt: new Date('2018-12-20'),
    paymentType: 'cash'
  },
  {
    id: 6,
    restaurant: 'Ada Ramen',
    table: 3,
    guests: 2,
    totalPrice: 560,
    createdAt: new Date('2018-12-20'),
    paymentType: 'card'
  },
  {
    id: 7,
    restaurant: 'Burger Bubbadub',
    table: 3,
    guests: 2,
    totalPrice: 560,
    createdAt: new Date('2018-12-23'),
    paymentType: 'cash'
  },
  {
    id: 8,
    restaurant: 'Ada Ramen',
    table: 3,
    guests: 2,
    totalPrice: 560,
    createdAt: new Date('2018-12-23'),
    paymentType: 'card'
  },
  {
    id: 9,
    restaurant: 'Burger Bubbadub',
    table: 3,
    guests: 2,
    totalPrice: 560,
    createdAt: new Date('2018-12-18'),
    paymentType: 'card'
  },
  {
    id: 10,
    restaurant: 'Ada Ramen',
    table: 3,
    guests: 2,
    totalPrice: 560,
    createdAt: new Date('2018-12-18'),
    paymentType: 'card'
  }
]

const list = async () => {
  try {
    return mock_histories
  } catch (error) {
    throw error
  }
}

export default {
  list
}