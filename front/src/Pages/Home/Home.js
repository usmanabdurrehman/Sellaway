import React,{useState,useEffect} from 'react'
import './Home.css'
import Layout from '../../Layout/Layout'
import Card from '../../components/Card/Card'
import {useAlert} from 'react-alert'
import axios from 'axios'

export default function Home() {

	const [items, setItems] = useState([])
	let alert = useAlert()

	let getItems = () => {
		axios({
			url:'/user/getInitialItems',
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
			<div className='card-container'>
				{items.map(item=><Card item={item}/>)}
			</div>
		</Layout>
	)
}