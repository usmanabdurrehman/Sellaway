import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import StarIcon from '@material-ui/icons/Star';

import styles from "./Card.module.css";

import {useAlert} from 'react-alert'

import {useDispatch,useSelector} from 'react-redux'

export default function Card({
	item: { _id, name, price, location, date, favedByUser, filename, category },
	page,
}) {

	let alert = useAlert()
	let dispatch = useDispatch()

	let favItem = () => {
		axios({
			method: "post",
			url: "/user/addFavourite",
			withCredentials: true,
			data: { id: _id },
		}).then((res) => {
			if(res.data.status){
				new Audio('sounds/fav.mp3').play()
				dispatch({type:'ADD_FAV',payload:{id:_id}})
			}
		});
	};

	let unfavItem = () => {
		axios({
			method: "post",
			url: "/user/removeFavourite",
			withCredentials: true,
			data: { id: _id },
		}).then((res) => {
			if(res.data.status){
				new Audio('sounds/fav.mp3').play()
				dispatch({type:'REMOVE_FAV',payload:{id:_id}})
				dispatch({type:'REMOVE_FROM_FAV_ITEM',payload:{id:_id}})
			}
		});
	};

	let deleteItem = () => {
		axios({
			method: "post",
			url: "/user/deleteItem",
			withCredentials: true,
			data: { id: _id },
		}).then((res) => {
			if(res.data.status){
				new Audio('sounds/delete.mp3').play()
				dispatch({type:'DELETE_ITEM',payload:{id:_id}})
				alert.success('Item successfully deleted')
			}
			else{
				alert.error(res.data.msg)
			}
		});
	}

	let getCategoryColor = (category) => {
		switch(category){
			case "mobiles and accessories":
				return "#78BC61"
				break
			case "miscellaneous":
				return "#F22B29"
				break
			case "furniture":
				return "#3F88C5"
				break
			case "vehicle":
				return "#5D2E8C"
				break
			default:
				return "blue"
				break				

		}
	}

	return (
		<div className={styles.card}>
			<div className={styles.cardImg}>
				<img
					src={`http://localhost:7000/itemImages/${filename}`}
					alt=""
				/>
				<p className={styles.category} style={{backgroundColor:getCategoryColor(category)}}>{category}</p>
			</div>
			<div className={styles.cardDesc}>
				<div className={styles.cardName}>
					<h3>{name}</h3>
					<p>
						<b>Rs</b> {price}
					</p>
				</div>

				<div className={styles.cardFooter}>
					<div className={styles.location}>{location}</div>
					<div className={styles.date}>{date}</div>
				</div>

				<Link
					to={`/item/${_id}`}
					className={`${styles.icon} ${styles.arrow}`}
				>
					<IconButton>
						<ArrowForwardIcon />
					</IconButton>
				</Link>
			</div>
			<IconButton
				className={`${styles.icon} ${styles.heart}`}
				onClick={favedByUser ? unfavItem : favItem}
			>
				<StarIcon style={{ color: favedByUser ? "#ffd700" : "#ccc" }} />
			</IconButton>
			{page == "self" ? (
				<>
					<Link
						to={{
							pathname: "/editItem",
							state: {
								item: {
									_id,
									name,
									price,
									location,
									date,
									category,
									favedByUser,
									filename,
								},
							},
						}}
					>
						<IconButton className={`${styles.icon} ${styles.edit}`}>
							<EditIcon />
						</IconButton>
					</Link>
					<IconButton className={`${styles.icon} ${styles.delete}`} onClick={deleteItem}>
						<DeleteIcon className={styles.deleteIcon}/>
					</IconButton>
				</>
			) : null}
		</div>
	);
}
