import React from 'react'
import Signup from './Pages/Forms/Signup'
import Signin from './Pages/Forms/Signin'
import Home from './Pages/Home/Home'
import AddItem from './Pages/AddItem/AddItem'
import EditItem from './Pages/EditItem/EditItem'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

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
    <>
      <Signin/>
      <Signup/>
      <Home/>
     {/* { <AddItem/>} */}
      <EditItem/>
    </>
    </AlertProvider>
  )
}