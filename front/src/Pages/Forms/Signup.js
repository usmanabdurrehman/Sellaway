import React,{useState} from 'react'
import './Forms.css'
import {TextField,Button} from '@material-ui/core'
import axios from 'axios'
import {useAlert} from 'react-alert'

export default function Signup() {

	let [fields,setFields] = useState({
		fname:'',
		lname:'',
		email:'',
		pwd:''
	})

	let alert = useAlert()

	let clickHandler = () => {
		axios({
			url:'/signup',
			method:'post',
			withCredentials:true,
			data:fields
		})
		.then(res=>{
			if(!res.data.status){
				alert.error(res.data.msg)
			}
			else{
				
			}
		})
	}

	return (
		<div className='form-wrapper'>
			<div className='form'>
				<div className='form-image'>
					<img src='signup.jpg'/>
				</div>
				<div className='form-fields'>
					<div>
						<h1>Sign Up</h1>
						<TextField onChange={e=>setFields({...fields,fname:e.target.value})} label='First Name' className='form-input' fullWidth/>
						<TextField onChange={e=>setFields({...fields,lname:e.target.value})} label='Last Name' className='form-input' fullWidth/>
						<TextField onChange={e=>setFields({...fields,email:e.target.value})} label='Email' className='form-input' fullWidth/>
						<TextField onChange={e=>setFields({...fields,pwd:e.target.value})} label='Password' className='form-input' fullWidth/>
						<Button onClick={clickHandler} className='form-button'>Sign up</Button>
					</div>
				</div>
			</div>
		</div>
	)
}