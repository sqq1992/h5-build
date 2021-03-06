import React, { useRef } from 'react'
import { Layout, Button, Select, Modal, Form, Input, message } from 'antd'
import { EyeOutlined, SaveOutlined, SendOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { useAppList } from '@/client/hooks'
import queryString from 'query-string'
import { v4 as uuidv4 } from 'uuid'
import useGetCurrentSelectPage from "@/client/hooks/useGetCurrentSelectPage";
import {setCurrentSelectPage} from "@/client/actions/currentSelectPage";
import usePublishModal from "@/client/model/customApp/customHeader/hooks/usePublishModal";
import PublishModal from "@/client/model/customApp/customHeader/components/PublishModal";
import useNewPageModal from "@/client/model/customApp/customHeader/hooks/useNewPageModal";
import NewPageModal from "@/client/model/customApp/customHeader/components/NewPageModal";

const { Option } = Select
const { Header } = Layout

const HeaderContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  & > div {
    display: flex;
    align-items: center;
  }
`
const ButtonGroup = styled.div`
  margin-left: ${props => props.marginLeft || '10px'};
`
const PageSelected = styled.div`
  display: flex;
`
const FormItem = styled.div`

`
const headerStyle = {
  position: 'relative',
  zIndex: 2,
  backgroundColor: '#fff',
  boxShadow: '0 1px 7px rgba(0, 0, 0, 0.06)'
}
const selectStyle = {
  width: '200px',
  marginRight: '20px'
}


function CustomHeader() {

  const dispatch = useDispatch()
  const pageList = useSelector(state => state.pageListReducer)
  const selectedPage = useGetCurrentSelectPage()
  const ws = useRef(null)

  const {
    newPageModalSubmit,
    hideNewPageModal,
    showNewPageModal,
    newPageModalShow,
    inputNewPageInfo,
    newPageInfo
  } = useNewPageModal()

  const {
    publishStatus,
    addPublishStatus,
    publishModalShow,
    publishModalShowRef,
    openPublishModal,
    hidePublishModal,
    resultFile,
    setResultFile
  } = usePublishModal()

  const {
    saveAppLayout
  } = useAppList()

  const preview = () => {
    axios.post(`${REQUEST_URL}/server/preview`, {
      pageList
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      window.open(`${REQUEST_URL}/preview/${res.data.folderId}/${selectedPage.path}.html`)
    })
  }

  const publish = () => {

    const packageId = uuidv4()
    openPublishModal()

    ws.current = new WebSocket(`${WS_URL}/ws?packageId=${packageId}`)

    ws.current.onopen = (e) => {
      ws.current.send(
          JSON.stringify({
            type: 'PAGELIST',
            pageList,
            packageId
          })
      )
    }

    ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data)
      if (data.status !== 'finish') {
        addPublishStatus(JSON.parse(e.data))
      } else {
        if (publishModalShowRef) {
          setResultFile({
            path: data.filePath,
            folderId: data.folderId
          })
        }
        ws.current.close()
      }
    }
  }

  const changePage = (id) => {
    // dispatch(cleanEmpty())s
    dispatch(setCurrentSelectPage(id))
  }

  console.log('selectedPage', selectedPage);
  return (
    <Header style={headerStyle}>
      <HeaderContainer>
        <PageSelected>
          <div>???????????????</div>
          <Select onChange={changePage} style={selectStyle} value={selectedPage ? selectedPage.id : ''}>
            {
              pageList.map(item => <Option value={item.id} key={item.id}>{item.title}-{item.path}</Option>)
            }
          </Select>
          <Button onClick={showNewPageModal}>????????????</Button>
          <Button  style={{ marginLeft: '20px' }}>???????????????</Button>
          <Button  style={{ marginLeft: '20px' }} danger >????????????</Button>
        </PageSelected>
        <div>
          <ButtonGroup>
            <Button style={{ marginRight: '20px' }} >??????</Button>
            <Button style={{ marginRight: '30px' }} >??????</Button>
            <Button
              type="link"
              icon={<EyeOutlined />}
              onClick={preview}
            >
              ??????
              </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button
              type="link"
              icon={<SaveOutlined />}

            >
              ??????
              </Button>
          </ButtonGroup>
          <ButtonGroup marginLeft="30px">
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={publish}
            >
              ??????
              </Button>
          </ButtonGroup>
        </div>
      </HeaderContainer>

      <NewPageModal
          newPageModalShow={newPageModalShow}
          hideNewPageModal={hideNewPageModal}
          newPageModalSubmit={newPageModalSubmit}
          inputNewPageInfo={inputNewPageInfo}
          newPageInfo={newPageInfo}
      />

      <PublishModal
          publishModalShow={publishModalShow}
          hidePublishModal={() => hidePublishModal(ws.current)}
          publishStatus={publishStatus}
          resultFile={resultFile}
      />
    </Header>
  )

}

export default CustomHeader
