import React,{useRef,useEffect,useState} from 'react'
import SearchIcon from '@material-ui/icons/Search';
import {Container} from '../'
import {IconButton} from '@material-ui/core'
import {Redirect,Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './Navbar.css'

export default function Navbar() {

	let inputRef = useRef(null)
	let inputWrapperRef = useRef(null)

	let [redirect,setRedirect] = useState(false)

	useEffect(() => {
		inputRef.current.addEventListener('focus',()=>{
			inputWrapperRef.current.classList.add('onfocuswrapper')
		})
		inputRef.current.addEventListener('blur',()=>{
			inputWrapperRef.current.classList.remove('onfocuswrapper')
		})
	}, [])

	return (
		<div className='navbar'>
			<Container className='navWrapper'>
				<div className='logo'><h2><Link to='/'>Sellaway</Link></h2></div>
				<div ref={inputWrapperRef} className='searchWrapper'>
					<input ref={inputRef} placeholder='Search...' className='search' type="text"/>
					<IconButton className='search-icon'>
						<SearchIcon/>
					</IconButton>
					{/* </div> */}
				</div>
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