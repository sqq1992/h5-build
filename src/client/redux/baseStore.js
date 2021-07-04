import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const rootReducer = combineReducers({

})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)))

export default store
