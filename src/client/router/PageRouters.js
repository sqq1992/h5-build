import React, {lazy, Suspense} from 'react'

import { BrowserRouter, Switch, Route } from 'react-router-dom'
import {ConfigProvider, Skeleton} from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'

const Index = lazy(() => import('@/client/pages/index/Index'))
const Edit = lazy(() => import('@/client/pages/edit/Edit'))

function WaitingComponent(Component) {
    return () => (
        <Suspense fallback={<Skeleton active />}>
            <Component />
        </Suspense>
    )
}

const Routers = () => {
  return (
    <ConfigProvider locale={zhCN} componentSize="middle">
      <BrowserRouter basename="/h5Build">
          <Switch>
              <Route exact path="/index" component={WaitingComponent(Index)} />
              <Route exact path="/edit" component={WaitingComponent(Edit)} />
          </Switch>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default Routers
