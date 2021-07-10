import React from 'react'
import styled from 'styled-components'
import { useGetCurrentSelectComponent } from '@/client/hooks'
import {getPanelMap} from "@/component-list";

const Panel = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 400px;
  background-color: #fff;
  overflow: auto;
  box-shadow: 3px 0 16px rgba(0, 0, 0, 0.06);
`
const Info = styled.div`
  margin-top: 20px;
  text-align: center;
  color: #999;
`

function EditPanel() {

  const currentSelectComponent = useGetCurrentSelectComponent()

  return (
    <Panel>
      {
        currentSelectComponent ? getPanelMap(currentSelectComponent.type)() : <Info>暂未选择组件</Info>
      }
    </Panel>
  )
}

export default EditPanel
