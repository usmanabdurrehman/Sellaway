import React, { useState, useEffect } from "react";
import {Layout} from "../../Layout";
import { TextField, Button, Switch, MenuItem } from "@material-ui/core";
import {Redirect} from 'react-router-dom'
import "./CardDesc.css";
import axios from "axios";
import { useAlert } from "react-alert";

const options = [
	{
		value: "mobiles and accessories",
		label: "Mobiles and Accessories",
	},
	{
		value: "miscellaneous",
		label: "Miscellaneous",
	},
	{
		value: "furniture",
		label: "Furniture",
	},
	{
		value: "vehicle",
		label: "Vehicle",
	},
];

export default function CardDesc(props) {

	
	let [item,setItem] = useState({})

	const [cat, setCat] = useState("mobiles and accessories");

	let alert = useAlert()

	let getItem = () => {
		console.log(props.match.params.id)
		axios({
			method:'post',
			url:'/user/getItem',
			withCredentials:true,
			data:{id:props.match.params.id}
		}).then((res)=>{
			console.log(res.data)
			if(res.data.status){
				setItem(res.data.item)
			}
			else{
				alert.error(res.data.msg + '. Try refreshing the page.')
			}
		})
	}

	useEffect(()=>{
		getItem()
	},[])
	
	if(!item) return <Redirect to="/"/>

	return (
		<Layout container>
			<div className="card-desc">
				<div className="card-desc-image">
					{item.filename == null ? (
						<img src="default.jpg" />
					) : (
						<img className='imageDisplay' src={`http://localhost:7000/itemImages/${item.filename}`}/>
					)}
				</div>
				<div className="card-desc-fields">
					<div>
						<h1>{item.name}</h1>
					</div>
					<div className='card-other-desc'>
						<p><b>Location: </b>{item.location}</p>
						<p><b>Category: </b>{item.category}</p>
						<p><b>Price: </b>{item.price}</p>
					</div>
				</div>
			</div>
		</Layout>
	);
}
