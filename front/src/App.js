import React from 'react'
import Signup from './Pages/Forms/Signup'
import Signin from './Pages/Forms/Signin'
import Home from './Pages/Home/Home'
import AddItem from './Pages/AddItem/AddItem'

export default function App() {

  return (
    <>
      <Signin/>
      <Signup/>
      <Home/>
      <AddItem/>
    </>
  )
}