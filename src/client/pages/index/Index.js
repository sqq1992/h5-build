import React, {useRef, useState} from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { List, Button, Modal } from 'antd'
import DialogEditApp from "@/client/model/editApp/EditApp";
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
    const [record, setRecord] = useState({});
    let dialogEditAppInstance = useRef({})

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

    const createItem = () => {
        setRecord({});
        dialogEditAppInstance.current.show();
    };

    const editItem = (item) => () => {
        setRecord(item);
        dialogEditAppInstance.current.show();
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

    const clear = () => {
        Modal.confirm({
            title: '是否清空所有项目？',
            onOk: () => {
                clearApp()
            }
        })
    }

  return (
    <Page>
        <MainContent>
            <Header>
                <Button type="primary" onClick={createItem}>创建应用</Button>
                <Button type="danger" style={{ marginLeft: '20px' }} onClick={clear}>清空应用</Button>
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

        <DialogEditApp
            getInstance={(instance) => {
                dialogEditAppInstance.current = instance
            }}
            addApp={addApp}
            editAppInfo={editAppInfo}
            currentObj={record}
        />
    </Page>
  )
}

export default Index
