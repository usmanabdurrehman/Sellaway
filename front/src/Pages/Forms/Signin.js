import React,{useState} from 'react'
import './Forms.css'
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
		<div className='form-wrapper'>
			<div className='form left-form'>
				<div className='form-fields'>
					<div>
						<h1>Sign In</h1>
						<TextField onChange={e=>setFields({...fields,email:e.target.value})} label='Email' className='form-input' fullWidth/>
						<TextField onChange={e=>setFields({...fields,pwd:e.target.value})} label='Password' className='form-input' fullWidth/>
						<Button onClick={clickHandler} className='form-button'>Sign up</Button>
					</div>
				</div>
				<div className='form-image'>
					<img src='signin.jpg'/>
				</div>
			</div>
		</div>
	)
}