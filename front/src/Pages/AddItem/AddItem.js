import React from 'react'
import Layout from '../../Layout/Layout'
import {TextField,Button} from '@material-ui/core'
import './AddItem.css'

export default function AddItem() {
	return (
		<Layout>
			<div className='add-item'>
				<div className='form-image'>
					
				</div>
				<div className='form-fields'>
					<div>
						<h1>Add Item</h1>
						<TextField onChange={e=>setFields({...fields,fname:e.target.value})} label='First Name' className='form-input' fullWidth/>
						<TextField onChange={e=>setFields({...fields,lname:e.target.value})} label='Last Name' className='form-input' fullWidth/>
						<TextField onChange={e=>setFields({...fields,email:e.target.value})} label='Email' className='form-input' fullWidth/>
						<TextField onChange={e=>setFields({...fields,pwd:e.target.value})} label='Password' className='form-input' fullWidth/>
						<Button onClick={clickHandler} className='form-button'>Sign up</Button>
					</div>
				</div>
			</div>
		</Layout>
	)
}