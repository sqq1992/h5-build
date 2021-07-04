import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import styled from 'styled-components'

import queryString from 'query-string'

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

  return (
    <Page>
      <div>
          Edit页面
      </div>
    </Page>
  )

}

export default Edit
