import React,{useState} from 'react'
import './Forms.css'
import {TextField,Button} from '@material-ui/core'
import {useAlert} from 'react-alert'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'

export default function Signin(props) {

	let [fields,setFields] = useState({
		email:'',
		pwd:''
	})

	let alert = useAlert()

	let [redirect,setRedirect] = useState(false)

	if(props.location.state){
		alert.success('Your Account has been created. You can now login')
	}

	let clickHandler = () => {
		axios({
			method:'post',
			url:'/signin',
			withCredentials:true,
			data:fields
		})
		.then(res=>{
			let {token,auth,user} = res.data
			if(auth==true){
				console.log(token)
				Cookies.set('token', JSON.stringify(token));
				setRedirect(true)
			}
		})
	}

	return (
		<div className='form-wrapper'>
			<div className='form left-form'>
				<div className='form-fields'>
					<div>
						<h1>Sign In</h1>
						<TextField onChange={e=>setFields({...fields,email:e.target.value})} label='Email' className='form-input' fullWidth/>
						<TextField onChange={e=>setFields({...fields,pwd:e.target.value})} type='password' label='Password' className='form-input' fullWidth/>
						<Button onClick={clickHandler} className='form-button'>Sign In</Button>
					</div>
				</div>
				<div className='form-image'>
					<img src='signin.jpg'/>
				</div>
			</div>
			{(redirect)?(<Redirect to='/'/>):null}
		</div>
	)
}