import React from 'react'
import './Card.css'
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export default function Card(props) {
	return (
		<div className='card'>
			<div className="card-img">
				<img src="mobile.jpeg" alt=""/>
			</div>
			<div className="card-desc">
				<div>
					<h3>Samsung S4</h3>
					<p><b>Rs</b> 45000</p>
				</div>

				<div className='card-footer'>
					<div className='location'>
						Peshawar
					</div>
					<div className='date'>
						Dec, 20
					</div>
				</div>


				<IconButton className='icon arrow'>
					<ArrowForwardIcon/>	
				</IconButton>
			</div>
			<IconButton className='icon heart'>
				<FavoriteIcon/>	
			</IconButton>
			{
				(props.page=='self')?
				(
					<>
						<IconButton className='icon edit'>
							<EditIcon/>	
						</IconButton>
						<IconButton className='icon delete'>
							<DeleteIcon/>	
						</IconButton>
					</>
				):
				null
			}
		</div>
	)
}