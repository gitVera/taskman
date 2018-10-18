import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import reducer from './reducer'

const logger = createLogger({
  collapsed: true,
  colors: {
    title: () => '#00d133',
    prevState: () => '#9E9E9E',
    action: () => '#03A9F4',
    nextState: () => '#4CAF50',
    error: () => '#F20404',
  },
})

export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk, logger))
)
