import React from 'react'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import {AddItem,EditItem,FavItems,Profile,Home,Signin,Signup,CardDesc} from './Pages'

import {BrowserRouter as Router,Route} from 'react-router-dom'
import axios from 'axios'

import {PrivateRoute,PublicRoute} from './Routes'

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

        <Route path='/' exact component={Home}/>
        <Route path='/profile' component={Profile}/>
        <Route path='/favItems' component={FavItems}/>
        
        <Route path='/addItem' component={AddItem}/>
        <Route path='/editItem' component={EditItem}/>
        <Route path='/item/:id' component={CardDesc}/>
      </Router>
    </AlertProvider>
  )
}