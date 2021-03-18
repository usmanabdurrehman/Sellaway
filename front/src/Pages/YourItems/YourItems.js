import React,{useState,useEffect} from 'react'
import './YourItems.css'
import {Layout} from '../../Layout'
import {Card,CardContainer} from '../../Components'
import axios from 'axios'
import {useAlert} from 'react-alert'

export default function YourItems() {

	const [items, setItems] = useState([])
	let alert = useAlert()

	let getItems = () => {
		axios({
			url:'/user/yourItems',
			withCredentials:true
		})
		.then(res=>{
			if(res.status){
				setItems(res.data.items)
			}
			else{
				alert.error(res.data.msg)
			}
		})
	}

	useEffect(() => {
		getItems()
	},[])

	return (
		<Layout container>
			<div className='your-items'>
				<h1>Your Items</h1>
					{(items.length==0)?(<p>Looks like you havent added any items. Want to <a href="">Add an Item?</a></p>):
					(
						<CardContainer>
							{items.map(item=><Card item={item}/>)}
						</CardContainer>
					)}
			</div>
		</Layout>
	)
}