import React,{useState} from 'react'
import './Signup.css'
import {TextField,Button} from '@material-ui/core'

export default function Signup() {

	let [fields,setFields] = useState({
		fname:'',
		lname:'',
		email:'',
		pwd:''
	})

	let clickHandler = () => {
		console.log(fields)
	}

	return (
		<div className='signup-wrapper'>
			<div className='signup-form'>
				<div className='signup-image'>
					
				</div>
				<div className='signup-fields'>
					<div>
						<h1>Sign Up</h1>
						<TextField onChange={e=>setFields({...fields,fname:e.target.value})} label='First Name' className='signup-input' fullWidth/>
						<TextField onChange={e=>setFields({...fields,lname:e.target.value})} label='Last Name' className='signup-input' fullWidth/>
						<TextField onChange={e=>setFields({...fields,email:e.target.value})} label='Email' className='signup-input' fullWidth/>
						<TextField onChange={e=>setFields({...fields,pwd:e.target.value})} label='Password' className='signup-input' fullWidth/>
						<Button onClick={clickHandler} className='signup-button'>Sign up</Button>
					</div>
				</div>
			</div>
		</div>
	)
}