import React from 'react'
import {Navbar,Footer1,Footer,Container} from '../Components'
import classes from './Layout.module.css'

export default function Layout({container,children}) {
	return (
		<div className={classes.layout}>
			<Navbar/>
			<div className={classes.layoutContainer}>
				{
					container?
					(
						<Container>
							{children}
						</Container>	
					)
					:
					(
					<>{children}</>
					)
				}
			</div>
			<Footer1/>
			<Footer/>
		</div>
	)
}