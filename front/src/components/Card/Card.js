import React from 'react'
import './Card.css'
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export default function Card({item:{name,price,location,date},page}) {
	return (
		<div className='card'>
			<div className="card-img">
				<img src="mobile.jpeg" alt=""/>
			</div>
			<div className="card-desc">
				<div>
					<h3>{name}</h3>
					<p><b>Rs</b> {price}</p>
				</div>

				<div className='card-footer'>
					<div className='location'>
						{location}
					</div>
					<div className='date'>
						{date}
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
				(page=='self')?
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