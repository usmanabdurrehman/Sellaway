import React from 'react'
import './Home.css'
import Layout from '../../Layout/Layout'
import Card from '../../components/Card/Card'

export default function Home() {

	let arr = [1,2,3,4,5,6]

	return (
		<Layout>
			<div className='card-container'>
				{arr.map(item=><Card/>)}
			</div>
		</Layout>
	)
}