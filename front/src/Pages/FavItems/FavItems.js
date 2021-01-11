import React from 'react'
import './FavItems.css'
import Layout from '../../Layout/Layout'
import Card from '../../components/Card/Card'

export default function FavItems() {

	let d = []

	return (
		<Layout>
			<div className='fav-items'>
				<h1>Favourite Items</h1>
					{(d.length==0)?(<p>Looks like you havent added any items to favourites</p>):
					(
						<div className="card-container">
							{d.map(item=><Card/>)}
						</div>	
					)}
			</div>
		</Layout>
	)
}