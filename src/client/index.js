import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Routers from '@/client/router/PageRouters'
import store from "@/client/redux/baseStore";


ReactDOM.render(<Provider store={store}>
    <Routers />
</Provider>, document.getElementById('root'))
