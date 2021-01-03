import React,{useRef,useEffect} from 'react'
import './Navbar.css'
import SearchIcon from '@material-ui/icons/Search';
import {IconButton} from '@material-ui/core'

export default function Navbar() {

	let inputRef = useRef(null)
	let inputWrapperRef = useRef(null)


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
			<div className='container navWrapper'>
				<div className='logo'><h2>Sellaway</h2></div>
				<div ref={inputWrapperRef} className='searchWrapper'>
					<input ref={inputRef} placeholder='Search...' className='search' type="text"/>
					{/* <div className='search-icon-wrapper'> */}
					<IconButton className='search-icon'>
						<SearchIcon/>
					</IconButton>
					{/* </div> */}
				</div>
			 	<div className='nav'>
			 		<div>Categories</div>
			 		<div>Contact Us</div>
			 		<div>About Us</div>
			 	</div>
			</div>
		</div>
	)
}