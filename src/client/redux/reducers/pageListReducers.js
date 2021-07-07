import { handleActions } from 'redux-actions'
import { setPageList, clearPageList } from '@/client/actions/pageListAction'

const initialState = []

const pageListReducer = handleActions(
  {
    [setPageList]: (state, action) => {
      return action.payload
    },
    [clearPageList]: () => {
      return []
    }
  },
  initialState
)

export default pageListReducer
