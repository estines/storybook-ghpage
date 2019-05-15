import {
  CHECK_IN,
  CART_CHANGE,
  ADD_TO_CART,
  SELECT_PAYMENT_METHOD
} from '../actions/types'

const INITIAL_STATE = {
  cart: [],
  paymentMethod: 'cash',
  paymentMethodId: null,
  restaurant: {
    name: 'Huawei',
    phoneNumber: '0324234234',
    coverPhoto:
      'https://orderking.s3.amazonaws.com/images/original/1550276343186.png',
    aboutUs: 'Huawei restaurant',
    id: '5c67570d58f1f539ef5a9a89',
    manager: '5c6985655685c606456aead7',
    balance: '5000'
  },
  table: {
    name: 'testtest',
    description: 'testt',
    numOfSeats: 1,
    position: 1,
    id: '5c69a272bd9dc638b568280a',
    restaurantId: '5c67570d58f1f539ef5a9a89',
    userId: '5c6985655685c606456aead7'
  }
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHECK_IN:
      return { ...state, ...action.payload }
    case CART_CHANGE:
      return action.payload
    case ADD_TO_CART:
      return { ...state, cart: [...state.cart, ...action.payload] }
    case SELECT_PAYMENT_METHOD:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
