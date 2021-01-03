import React,{useState} from 'react'
import './Signin.css'
import {TextField,Button} from '@material-ui/core'

export default function Signin() {

	let [fields,setFields] = useState({
		email:'',
		pwd:''
	})

	let clickHandler = () => {
		console.log(fields)
	}

	return (
		<div className='signup-wrapper'>
			<div className='signup-form'>
				<div className='signup-fields'>
					<div>
						<h1>Sign In</h1>
						<TextField onChange={e=>setFields({...fields,email:e.target.value})} label='Email' className='signup-input' fullWidth/>
						<TextField onChange={e=>setFields({...fields,pwd:e.target.value})} label='Password' className='signup-input' fullWidth/>
						<Button onClick={clickHandler} className='signup-button'>Sign up</Button>
					</div>
				</div>
				<div className='signup-image'>
					
				</div>
			</div>
		</div>
	)
}