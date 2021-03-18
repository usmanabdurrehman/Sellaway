import React,{useState} from 'react'
import {Container,Search} from '../'
import {Redirect,Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './Navbar.css'

export default function Navbar() {

	let [redirect, setRedirect] = useState(false);

	return (
		<div className='navbar'>
			<Container className='navWrapper'>
				<div className='logo'><h2><Link to='/'>Sellaway</Link></h2></div>
				<Search/>
			 	<div className='nav'>
			 		<div><Link to='/addItem'>Add An Item</Link></div>
			 		<div><Link to='/favItems'>Favourite Items</Link></div>
			 		<div><Link to='/yourItems'>Your Items</Link></div>
			 		<div className='logout' 
			 		onClick={e=>{
			 			Cookies.remove('token')
			 			setRedirect(true)
			 		}}>Logout</div>
			 	</div>
			</Container>
			{(redirect)?(<Redirect to='/signin'/>):null}
		</div>
	)
}