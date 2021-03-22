import React,{useState,useEffect} from 'react'
import './FavItems.css'
import {Layout} from '../../Layout'
import {Card,CardContainer} from '../../Components'
import {useAlert} from 'react-alert'
import axios from 'axios'

import {useDispatch,useSelector} from 'react-redux'

export default function FavItems() {

	const items = useSelector((state)=>state.favItems)
	let alert = useAlert()
	let dispatch = useDispatch()

	let getItems = () => {
		axios({
			url:'/user/favouriteItems',
			withCredentials:true
		})
		.then(res=>{
			if(res.status){
				dispatch({type:'SET_FAV_ITEMS',payload:res.data.items})
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
			<div className='fav-items'>
				<h1>Favourite Items</h1>
					{(items.length==0)?(<p>Looks like you havent added any items to favourites</p>):
					(
						<CardContainer>
							{items.map(item=><Card item={item} key={item._id}/>)}
						</CardContainer>
					)}
			</div>
		</Layout>
	)
}