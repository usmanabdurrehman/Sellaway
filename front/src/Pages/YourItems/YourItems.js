import React from 'react'
import './YourItems.css'
import Layout from '../../Layout/Layout'
import Card from '../../components/Card/Card'

export default function YourItems() {

	let d = []

	return (
		<Layout>
			<div className='your-items'>
				<h1>Your Items</h1>
					{(d.length==0)?(<p>Looks like you havent added any items. Want to <a href="">Add an Item?</a></p>):
					(
						<div className="card-container">
							{d.map(item=><Card/>)}
						</div>	
					)}
			</div>
		</Layout>
	)
}