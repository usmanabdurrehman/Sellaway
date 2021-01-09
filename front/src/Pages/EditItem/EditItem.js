import React,{useState} from 'react'
import Layout from '../../Layout/Layout'
import {TextField,Button,Switch,MenuItem} from '@material-ui/core'
import './EditItem.css'

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
		featured:true
	})

	const [cat, setCat] = React.useState('mobiles and accessories');

	const handleChange = (event) => {
	   setCat(event.target.value);
	}

	let clickHandler = () => {
		console.log(fields)
	}	

	return (
		<Layout>
			<div className='edit-item'>
				<div className='form-image'>
					
				</div>
				<div className='form-fields'>
					<div>
						<h1>Edit Item</h1>
						<TextField onChange={e=>setFields({...fields,name:e.target.value})} label='Name' className='form-input' fullWidth/>
						<TextField onChange={e=>setFields({...fields,location:e.target.value})} label='Location' className='form-input' fullWidth/>
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
				        <TextField onChange={e=>setFields({...fields,price:parseInt(e.target.value)})} label='Price' className='form-input' type='number' fullWidth/>
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
						<Button onClick={clickHandler} className='form-button'>Edit Item</Button>
					</div>
				</div>
			</div>
		</Layout>
	)
}