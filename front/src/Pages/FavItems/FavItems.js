import React,{useState,useEffect} from 'react'
import './FavItems.css'
import Layout from '../../Layout/Layout'
import Card from '../../components/Card/Card'
import {useAlert} from 'react-alert'
import axios from 'axios'

export default function FavItems() {

	const [items, setItems] = useState([])
	let alert = useAlert()

	let getItems = () => {
		axios({
			url:'/user/favouriteItems',
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
		<Layout>
			<div className='fav-items'>
				<h1>Favourite Items</h1>
					{(items.length==0)?(<p>Looks like you havent added any items to favourites</p>):
					(
						<div className="card-container">
							{items.map(item=><Card item={item}/>)}
						</div>	
					)}
			</div>
		</Layout>
	)
}