import { createActions } from 'redux-actions'
import { v4 as uuidv4 } from 'uuid'


const { pageList } = createActions({
  'PAGE_LIST/SET_PAGE_LIST': (pageList = []) => pageList,
  'PAGE_LIST/CLEAR_PAGE_LIST': () => []
})

const { setPageList, clearPageList } = pageList


const addPage = (pageInfo) => (dispatch, getState) => {
  const state = getState()
  const pageList = state.pageListReducer
  const info = {
    ...pageInfo,
    id: pageInfo.id || uuidv4()
  }
  const newPageList = pageList.concat([info])

  dispatch(
    setPageList(newPageList)
  )

}

const editPage = (pageInfo) => (dispatch, getState) => {
  const state = getState()
  const pageList = state.pageListReducer
  const newPageList = pageList.map(item => {
    if (item.id === pageInfo.id) {
      return {
        ...pageInfo
      }
    }
    return item
  })

  dispatch(setPageList(newPageList))

}

const deletePage = (pageId) => (dispatch, getState) => {

  const state = getState()
  const pageList = state.pageListReducer
  const newPageList = pageList.filter(item => item.id !== pageId)

  dispatch(setPageList(newPageList))

}

export {
  setPageList,
  clearPageList,
  addPage,
  editPage,
  deletePage
}
