import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer1 from '../components/Footer1/Footer1'
import Footer from '../components/Footer/Footer'
import './Layout.css'

export default function Layout(props) {
	return (
		<div className='layout'>
			<Navbar/>
			<div className='container'>
				{props.children}
			</div>
			<Footer1/>
			<Footer/>
		</div>
	)
}