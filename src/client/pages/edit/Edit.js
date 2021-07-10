import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import styled from 'styled-components'

import queryString from 'query-string'
import CustomHeader from "@/client/model/customApp/customHeader/CustomHeader";
import useAppList from "@/client/hooks/useAppList";
import pageListReducer from "@/client/redux/reducers/pageListReducers";
import {clearPageList, setPageList} from "@/client/actions/pageListAction";
import {clearCurrentSelectPage, setCurrentSelectPage} from "@/client/actions/currentSelectPage";
import ComponentPanel from "@/client/model/customApp/componentPanel/ComponentPanel";
import SandBox from "@/client/model/customApp/sandBox/SandBox";
import EditPanel from "@/client/model/customApp/editPanel/EditPanel";

const Page = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  & > div {
    min-width: 1300px;
    height: 100%;
  }
`

const MainContent = styled.div`
  overflow: hidden;
  position: relative;
  min-width: 1300px;
  height: calc(100% - 65px);
  background-color: #f5f5f7;
`

function Edit() {

    const { getAppDetail } = useAppList()
    const pageListReducer = useSelector((state) => state.pageListReducer)
    const dispatch = useDispatch()
    const panelShow = useSelector(state => state.componentPanelReducer)

    const _initPage = useCallback(() => {
        const initPage = {
            title: '首页',
            id: uuidv4(),
            path: 'index',
            componentList: []
        }
        const stepId = uuidv4()
        dispatch(
            setPageList([initPage])
        )
        dispatch(
            setCurrentSelectPage(initPage.id)
        )
    }, [dispatch])

    useEffect(() => {

        const appId = queryString.parse(window.location.search).appId
        const appDetail = getAppDetail(appId)

        try {
            if (!appDetail.layout) {
                return _initPage()
            }
            const layout = JSON.parse(appDetail.layout)

            if (layout.length === 0) {
                _initPage()
            } else {
                dispatch(
                    setPageList(layout)
                )
                dispatch(
                    setCurrentSelectPage(layout[0].id)
                )
            }
        } catch (err) {
            console.log(err)
            _initPage()
        }

        return () => {
            dispatch(
                clearPageList()
            )
            dispatch(
                clearCurrentSelectPage()
            )
        }

    }, [dispatch,getAppDetail,_initPage])

    console.log('pageListReducer', pageListReducer);

  return (
    <Page>
      <div>
          <CustomHeader />
          <MainContent>
              {panelShow && <ComponentPanel />}
              <SandBox />
              <EditPanel />
          </MainContent>
      </div>
    </Page>
  )

}

export default Edit
