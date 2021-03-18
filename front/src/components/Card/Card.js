import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import styles from "./Card.module.css";

export default function Card({
	item: { _id, name, price, location, date, favedByUser, filename },
	page,
}) {
	let favItem = () => {
		axios({
			method: "post",
			url: "/user/addFavourite",
			withCredentials: true,
			data: { id: _id },
		}).then((res) => {});
	};

	let unfavItem = () => {
		axios({
			method: "post",
			url: "/user/removeFavourite",
			withCredentials: true,
			data: { id: _id },
		}).then((res) => {});
	};

	return (
		<div className={styles.card}>
			<div className={styles.cardImg}>
				<img
					src={`http://localhost:7000/itemImages/${filename}`}
					alt=""
				/>
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
					to={{
						pathname: "/cardDescription",
						state: {
							item: {
								_id,
								name,
								price,
								location,
								date,
								favedByUser,
								filename,
							},
						},
					}}
				>
					<IconButton className={`${styles.icon} ${styles.arrow}`}>
						<ArrowForwardIcon />
					</IconButton>
				</Link>
			</div>
			<IconButton
				className={`${styles.icon} ${styles.heart}`}
				onClick={favedByUser ? unfavItem : favItem}
			>
				<FavoriteIcon style={{ color: favedByUser ? "red" : "#ccc" }} />
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
					<IconButton className={`${styles.icon} ${styles.delete}`}>
						<DeleteIcon />
					</IconButton>
				</>
			) : null}
		</div>
	);
}
