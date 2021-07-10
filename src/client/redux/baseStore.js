import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import pageListReducer from './reducers/pageListReducers'
import currentSelectPageReducer from './reducers/currentSelectPageReducer'
import componentPanelReducer from './reducers/componentPanelReducer'
import currentSelectComponentReducer from './reducers/currentSelectComponentReducer'

const rootReducer = combineReducers({
    pageListReducer,
    currentSelectPageReducer,
    componentPanelReducer,
    currentSelectComponentReducer
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)))

export default store
