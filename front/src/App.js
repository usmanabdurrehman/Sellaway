import React from 'react'
import Signup from './Pages/Forms/Signup'
import Signin from './Pages/Forms/Signin'
import Home from './Pages/Home/Home'
import AddItem from './Pages/AddItem/AddItem'
import EditItem from './Pages/EditItem/EditItem'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import YourItems from './Pages/YourItems/YourItems'
import FavItems from './Pages/FavItems/FavItems'

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

let token = (localStorage.getItem('token'))?(JSON.parse(localStorage.getItem('token'))):(null)
if (token) {
  axios.defaults.headers.common['Authorization'] = token
} else {
  delete axios.defaults.headers.common['Authorization']
}

export default function App() {

  return (
  	<AlertProvider template={AlertTemplate} {...options}>
      <Router>
        <PublicRoute path='/signup' component={Signup}/>
        <PublicRoute path='/signin' component={Signin}/>

        <PrivateRoute path='/' exact component={Home}/>
        <PrivateRoute path='/yourItems' component={YourItems}/>
        <PrivateRoute path='/favItems' component={FavItems}/>
        
        <PrivateRoute path='/addItem' component={AddItem}/>
        <PrivateRoute path='/editItem' component={EditItem}/>
      </Router>
    </AlertProvider>
  )
}