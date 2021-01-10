import React,{useState} from 'react'
import Layout from '../../Layout/Layout'
import {TextField,Button,Switch,MenuItem} from '@material-ui/core'
import './AddItem.css'
import axios from 'axios'
import { useAlert } from 'react-alert'

const options = [
  {
    value: 'mobiles and accessories',
    label: 'Mobiles and Accessories',
  },
  {
    value: 'miscellaneous',
    label: 'Miscellaneous',
  },
  {
    value: 'furniture',
    label: 'Furniture',
  },
  {
    value: 'vehicle',
    label: 'Vehicle',
  },
];

export default function AddItem() {

	let [fields,setFields] = useState({
		name:'',
		location:'',
		category:'',
		price:0,
		featured:true,
		image:null,
		imgUrl:null
	})

	const [cat, setCat] = React.useState('mobiles and accessories');

	const handleChange = (event) => {
	   setCat(event.target.value);
	}

	let alert = useAlert()

	let imageOnChange = (e) => {
		if(e.target.files[0]){
			let imgUrl = URL.createObjectURL(e.target.files[0])
			setFields({...fields,image:e.target.files[0],imgUrl})
		}
	}

	let clickHandler = () => {
		axios({
			method:'post',
			url:'/user/addItem',
			withCredentials:true,
			data:fields
		})
		.then(res=>{
			if(res.data.status){
				alert.success(res.data.msg)
				setFields({
					name:'',
					location:'',
					category:'',
					price:0,
					featured:true
				})
			}
		})
	}	

	return (
		<Layout>
			<div className='add-item'>
				<div className='form-image'>
						{
							(fields.imgUrl==null)?
							(
								<div className='file-wrapper'>
									<input type="file" id='image' onChange={imageOnChange}/>
									<label for='image'>
										<img src='default.jpg'/>
									</label>
								</div>
							):
							(
								<div className='image-wrapper'>
									<img src={fields.imgUrl}/>
									<div className='absolute file-wrapper'>
										<input type="file" id='image' onChange={imageOnChange}/>
										<label for='image'>
											<img src='default.jpg'/>
										</label>
									</div>
								</div>
							)
						}
				</div>
				<div className='form-fields'>
					<div>
						<h1>Add Item</h1>
						<TextField onChange={e=>setFields({...fields,name:e.target.value})} value={fields.name} label='Name' className='form-input' fullWidth/>
						<TextField onChange={e=>setFields({...fields,location:e.target.value})} value={fields.location} label='Location' className='form-input' fullWidth/>
						<TextField
				          select
				          label="Category"
				          value={cat}
				          onChange={handleChange}
				          fullWidth
				          className='form-input'
				          id="standard-select-currency"
				        >
				          {options.map((option) => (
				            <MenuItem key={option.value} value={option.value}>
				              {option.label}
				            </MenuItem>
				          ))}
				        </TextField>
				        <TextField onChange={e=>setFields({...fields,price:parseInt(e.target.value)})} value={fields.price} label='Price' className='form-input' type='number' fullWidth/>
				        <div className='switch-wrapper'>
				        	<Switch
						        checked={fields.featured}
						        onChange={e=>setFields({...fields,featured:!fields.featured})}
						        color="primary"
						        inputProps={{ 'aria-label': 'primary checkbox' }}
						        className='switch'
					    	/>
					    	<div>Featured</div>
				        </div>
						<Button onClick={clickHandler} className='form-button'>Add Item</Button>
					</div>
				</div>
			</div>
		</Layout>
	)
}