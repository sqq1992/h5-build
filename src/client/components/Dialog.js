import React, { useRef, useState, useEffect } from 'react'
import { Modal } from 'antd'
import { omit } from 'lodash'

export function Dialog({
  wrapClassName = '',
  maskClosable = true,
  width = 320,
  zIndex = 1000,
  title = '弹窗',
  destroyOnClose = true,
  noFooter = false,
  okText = '确定',
  cancelText = '取消',
  centered = false,
  closable = true,
  extraStyleConfig = {},
  maskStyle = {},
  beforeShow,
}) {
  return function Comp(WrappedComponent) {
    const CombineModal = (props) => {
      const [tempState, setTempState] = useState({
        title,
        wrapClassName,
        cancelText,
        okText,
        centered,
        closable,
        maskStyle,
      })

      const [visible, setVisible] = useState(false)
      const wrappedInstance = useRef({})

      const show = () => {
        if (beforeShow && beforeShow() === false) return
        setVisible(true)
      }
      const hide = () => {
        setVisible(false)
      }

      const ok = () => {
        Promise.resolve(wrappedInstance.current.okCallback && wrappedInstance.current.okCallback()).then((flag) => {
          if (flag === false) return
          hide()
        })
      }

      const close = () => {
        Promise.resolve(wrappedInstance.current.closeCallback && wrappedInstance.current.closeCallback()).then((flag) => {
          if (flag === false) return
          hide()
        })
      }

      const setStatus = (value) => {
        setTempState({
          ...tempState,
          ...value,
        })
      }

      useEffect(() => {
        const outerParams = {
          show,
          hide,
        }
        if (props.getInstance) {
          props.getInstance(outerParams)
        }
      }, [])

      const staticProps = {
        width,
        maskClosable,
        zIndex,
        destroyOnClose,
        ...(noFooter ? { footer: null } : {}),
      }

      const formatStyle = {
        ...extraStyleConfig,
        ...props.style,
      }

      return (
        <Modal {...staticProps} {...tempState} style={formatStyle} visible={visible} onCancel={close} onOk={ok}>
          <WrappedComponent {...(omit(props, ['style', 'getInstance']))} ref={wrappedInstance} higherSetStatus={setStatus} dialogHide={hide} />
        </Modal>
      )
    }

    return CombineModal
  }
}

//
// Dialog._CACHE = []
// Dialog.toggleModal = (isAdd, modal) => {
//   const index = Dialog._CACHE.indexOf(modal)
//   if (isAdd) {
//     if (index === -1) Dialog._CACHE.push(modal)
//   } else if (index !== -1) Dialog._CACHE.splice(index, 1)
// }
// Dialog.removeAll = () => {
//   Dialog._CACHE.forEach((elem) => {
//     if (elem.hide) {
//       elem.hide()
//     }
//   })
// }

export default Dialog
