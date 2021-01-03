import React from 'react'
import Card from './components/Card/Card'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Searchbar from './components/Searchbar/Searchbar'
import Footer1 from './components/Footer1/Footer1'
import Signup from './Pages/Signup/Signup'
import Signin from './Pages/Signin/Signin'

export default function App() {

  let arr = [1,2,3,4,5,6]

  return (
    <>
      <Signin/>
      <Signup/>
      <Navbar/>
      <div className='container'>
        <div className='card-container'>
          {
            arr.map(item=><Card/>)
          }
        </div>
      </div>
      <Footer1/>
      <Footer/>
    </>
  )
}