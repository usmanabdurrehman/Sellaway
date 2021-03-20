import React, { useState , useRef , useEffect } from "react";
import { Container, Search } from "../";
import { Redirect, Link } from "react-router-dom";
import Cookies from "js-cookie";
import "./Navbar.css";

import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';

export default function Navbar() {
	let [redirect, setRedirect] = useState(false);

	let sidebarRef = useRef(null);

	let [sidebarOpen,setSidebarOpen] = useState(false)

	let clickHandler = () => {
		if(sidebarOpen){
			sidebarRef.current.classList.add("sidebarOpen")
		}
		else{
			sidebarRef.current.classList.remove("sidebarOpen")
		}
		setSidebarOpen(!sidebarOpen)
	}

	return (
		<div className="navbar">
			<Container className="navWrapper">
				<div className="logo">
					<h2>
						<Link to="/">Sellaway</Link>
					</h2>
				</div>
				<Search className="nav-search"/>
				<div className="nav">
					<div>
						<Link to="/addItem">Add An Item</Link>
					</div>
					<div>
						<Link to="/favItems">Favourite Items</Link>
					</div>
					<div>
						<Link to="/yourItems">Your Items</Link>
					</div>
					<div
						className="logout"
						onClick={(e) => {
							Cookies.remove("token");
							setRedirect(true);
						}}
					>
						Logout
					</div>
				</div>
				<IconButton className="hamburger" onClick={clickHandler}>
					{sidebarOpen ? <MenuIcon className="menu-icon" /> : <CloseIcon className='menu-icon'/>}
				</IconButton>
			</Container>
			{redirect ? <Redirect to="/signin" /> : null}
			<div className="sidebar" ref={sidebarRef}>
				<div>
					<Link to="/addItem">Add An Item</Link>
				</div>
				<div>
					<Link to="/favItems">Favourite Items</Link>
				</div>
				<div>
					<Link to="/yourItems">Your Items</Link>
				</div>
				<div
					className="logout"
					onClick={(e) => {
						Cookies.remove("token");
						setRedirect(true);
					}}
				>
					Logout
				</div>
			</div>
		</div>
	);
}
