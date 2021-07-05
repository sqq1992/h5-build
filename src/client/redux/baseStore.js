import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import pageListReducer from './reducers/pageListReducers'
import currentSelectPageReducer from './reducers/currentSelectPageReducer'
import componentPanelReducer from './reducers/componentPanelReducer'

const rootReducer = combineReducers({
    pageListReducer,
    currentSelectPageReducer,
    componentPanelReducer
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)))

export default store
