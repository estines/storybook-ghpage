import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import Reducers from './reducers'

const store = createStore(
  Reducers,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
