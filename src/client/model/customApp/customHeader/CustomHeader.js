import React, { useRef } from 'react'
import { Layout, Button, Select, Modal, Form, Input, message } from 'antd'
import { EyeOutlined, SaveOutlined, SendOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { useAppList } from '@/client/hooks'
import queryString from 'query-string'
import useGetCurrentSelectPage from "@/client/hooks/useGetCurrentSelectPage";
import {setCurrentSelectPage} from "@/client/actions/currentSelectPage";

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
    // openPublishModal()

    // ws.current = new WebSocket(`${WS_URL}/ws?packageId=${packageId}`)
    //
    // ws.current.onopen = (e) => {
    //   ws.current.send(
    //       JSON.stringify({
    //         type: 'PAGELIST',
    //         pageList,
    //         packageId
    //       })
    //   )
    // }
    //
    // ws.current.onmessage = (e) => {
    //   const data = JSON.parse(e.data)
    //   if (data.status !== 'finish') {
    //     addPublishStatus(JSON.parse(e.data))
    //   } else {
    //     if (publishModalShowRef) {
    //       setResultFile({
    //         path: data.filePath,
    //         folderId: data.folderId
    //       })
    //     }
    //     ws.current.close()
    //   }
    // }
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
          <div>当前页面：</div>
          <Select onChange={changePage} style={selectStyle} value={selectedPage ? selectedPage.id : ''}>
            {
              pageList.map(item => <Option value={item.id} key={item.id}>{item.title}-{item.path}</Option>)
            }
          </Select>
          <Button >新增页面</Button>
          <Button  style={{ marginLeft: '20px' }}>编辑当前页</Button>
          <Button  style={{ marginLeft: '20px' }} danger >删除当页</Button>
        </PageSelected>
        <div>
          <ButtonGroup>
            <Button style={{ marginRight: '20px' }} >后退</Button>
            <Button style={{ marginRight: '30px' }} >前进</Button>
            <Button
              type="link"
              icon={<EyeOutlined />}
              onClick={preview}
            >
              预览
              </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button
              type="link"
              icon={<SaveOutlined />}

            >
              保存
              </Button>
          </ButtonGroup>
          <ButtonGroup marginLeft="30px">
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={publish}
            >
              发布
              </Button>
          </ButtonGroup>
        </div>
      </HeaderContainer>

    </Header>
  )

}

export default CustomHeader
