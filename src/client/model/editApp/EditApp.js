import React, {forwardRef, useImperativeHandle, useState} from 'react'
import { Form, Input, message } from 'antd'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { isEmpty } from 'lodash'
import {Dialog} from "@/client/components/Dialog";

const Content = styled.div`
  margin-top: 30px;
`

function EditApp({
  currentObj = {},
  addApp = ()=>{},
  editAppInfo = ()=>{}
},ref) {
  const [isNew] = useState(isEmpty(currentObj));
  const history = useHistory()
  const [formData, setFormData] = useState({
    name: currentObj.name || '',
    desc: currentObj.desc || ''
  })

  const okCallback = () => {
    if (!formData.name) {
      message.warn('应用名称不得为空')
      return false
    }

    if(isNew){
      const appId = addApp({
        name: formData.name,
        desc: formData.desc
      })
      if(appId){
        setTimeout(() => {
          history.push(`/edit?appId=${appId}`)
        }, 500)
      }
    }else {
      const result = editAppInfo({
        ...formData,
        id: currentObj.id
      })


    }
  }


  useImperativeHandle(ref, () => ({
    okCallback,
  }))

  const changeValue = label => e => {
    setFormData({
      ...formData,
      [label]: e.target.value
    })
  }

  return (
      <Content>
        <Form labelCol={{ span: 4 }}>
          <Form.Item label="应用名称" required>
            <Input value={formData.name} onChange={changeValue('name')} />
          </Form.Item>
          <Form.Item label="应用描述">
            <Input value={formData.desc} onChange={changeValue('desc')} />
          </Form.Item>
        </Form>
      </Content>
  )
}

const DialogEditApp = Dialog({
  title: '创建应用',
  width: 560,
  centered: true,
  wrapClassName: '',
})(forwardRef(EditApp))


export default DialogEditApp
