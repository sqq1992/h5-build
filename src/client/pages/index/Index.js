import React, {useRef, useState} from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { List, Button, Modal } from 'antd'
import DialogCreateApp from "@/client/model/editApp/CreateApp";
import useAppList from "@/client/hooks/useAppList";


const Page = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
  overflow: hidden;
`
const MainContent = styled.div`
  width: 1000px;
  margin: 40px auto;
  box-sizing: border-box;
  padding: 0 20px;
  background-color: #fff;
`
const Header = styled.div`
  padding: 30px 0 20px 0;
`
const EditList = styled.div`
  margin-left: 20px;
  color: #1890ff;
  display: flex;
  & > div {
    flex: none;
    cursor: pointer;
    margin-left: 15px;
  }
`
const ListWords = styled.div`
  word-break: break-all;
`
const ListTitle = styled(ListWords)`
  color: #008dff;
  cursor: pointer;
`
const ListContent = styled(ListWords)`
  color: #666;
`

function Index() {
    const history = useHistory()
    let dialogCreateAppInstance = useRef({})

    const {
        appList,
        removeApp,
        clearApp,
        editAppInfo,
        addApp
    } = useAppList()

    const toEdit = (id) => () => {
        history.push(`/edit?appId=${id}`)
    }

    const editItem = (item) => () => {

        // setSelectItem(item)
    }

    const removeItem = (item) => () => {
        Modal.confirm({
            title: '确认删除',
            content: `是否删除应用${item.name}`,
            onOk: () => {
                removeApp(item.id)
            }
        })
    }

  return (
    <Page>
        <MainContent>
            <Header>
                <Button type="primary" onClick={()=>{
                    dialogCreateAppInstance.current.show();
                }}>创建应用</Button>
                <Button type="danger" style={{ marginLeft: '20px' }} >清空应用</Button>
            </Header>
            <List
                dataSource={appList}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            title={<ListTitle onClick={toEdit(item.id)}>{item.name}</ListTitle>}
                            description={<ListContent>{item.desc}</ListContent>}
                        />
                        <EditList>
                            <div onClick={toEdit(item.id)}>前往</div>
                            <div onClick={editItem(item)}>编辑</div>
                            <div onClick={removeItem(item)}>删除</div>
                        </EditList>
                    </List.Item>
                )}
            />
        </MainContent>

        <DialogCreateApp
            getInstance={(instance) => {
                dialogCreateAppInstance.current = instance
            }}
            addApp={addApp}
        />
    </Page>
  )
}

export default Index
