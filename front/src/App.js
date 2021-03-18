import React from 'react'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import {AddItem,EditItem,FavItems,YourItems,Home,Signin,Signup} from './Pages'

import {BrowserRouter as Router,Route} from 'react-router-dom'
import axios from 'axios'

import PrivateRoute from './Routes/PrivateRoute'
import PublicRoute from './Routes/PublicRoute'

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

export default function App() {

  return (
  	<AlertProvider template={AlertTemplate} {...options}>
      <Router>
        <Route path='/signup' component={Signup}/>
        <Route path='/signin' component={Signin}/>

        <PrivateRoute path='/' exact component={Home}/>
        <PrivateRoute path='/yourItems' component={YourItems}/>
        <PrivateRoute path='/favItems' component={FavItems}/>
        
        <PrivateRoute path='/addItem' component={AddItem}/>
        <PrivateRoute path='/editItem' component={EditItem}/>
      </Router>
    </AlertProvider>
  )
}