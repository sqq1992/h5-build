import React from 'react'
import { defaultValue as textDefaultValue, TextClient, ToolPanel as TextToolPanel } from './text'

const componentList = [

  {
    id: 'TEXT_COMPONENT',
    name: '文本',
    children: [
      { ...textDefaultValue }
    ]
  },
]

const componentClientMap = {
  'text': (props, select) => <TextClient onClick={select} {...props} />,
}

const getPanelMap = (name) => {
  const panelMap = {
    'text': () => <TextToolPanel />,
  }
  return panelMap[name]
}

export {
  componentList,
  componentClientMap,
  getPanelMap
}
