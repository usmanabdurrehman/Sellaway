import React,{useState,useEffect} from 'react'
import './Home.css'
import {Layout} from '../../Layout'
import {Card,CardContainer,Container} from '../../Components'
import {useAlert} from 'react-alert'
import axios from 'axios'

import {useDispatch,useSelector} from 'react-redux'

export default function Home() {

	const items = useSelector((state)=>state.items)
	let alert = useAlert()
	let dispatch = useDispatch()

	let getItems = () => {
		axios({
			url:'/user/getInitialItems',
			withCredentials:true
		})
		.then(res=>{
			if(res.status){
				dispatch({type:'SET_ITEMS',payload:res.data.items})
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
			<div className='hero-wrapper'>
				<Container className='vertical-align-center'>
					<h1>Your all in one stop for selling used items</h1>
					<p>Not registered to the site?</p> 
					<p><a>Sign up</a> now and get an exclusive discount of 10$ on 
					your first purchase or sale.</p>
				</Container>
			</div>
			<Container>
				<CardContainer>
					{items.map(item=><Card item={item}/>)}
				</CardContainer>
			</Container>
		</Layout>
	)
}