import React, {forwardRef, useImperativeHandle, useState} from 'react'
import { Form, Input, message } from 'antd'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import {Dialog} from "@/client/components/Dialog";

const Content = styled.div`
  margin-top: 30px;
`

function CreateApp({
  addApp = ()=>{}
},ref) {

  const history = useHistory()
  const [formData, setFormData] = useState({
    name: '',
    desc: ''
  })

  const okCallback = () => {
    if (!formData.name) {
      message.warn('应用名称不得为空')
      return false
    }

    const appId = addApp({
      name: formData.name,
      desc: formData.desc
    })
    if(appId){
      setTimeout(() => {
        history.push(`/edit?appId=${appId}`)
      }, 500)
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

const DialogCreateApp = Dialog({
  title: '创建应用',
  width: 560,
  centered: true,
  wrapClassName: '',
})(forwardRef(CreateApp))


export default DialogCreateApp
