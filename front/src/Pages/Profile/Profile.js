import React, { useState, useEffect } from "react";
import { Layout } from "../../Layout";
import { Card, CardContainer } from "../../Components";
import axios from "axios";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";

import { CSSTransition, TransitionGroup } from "react-transition-group";

import "./Profile.css";

export default function YourItems() {
	const items = useSelector((state) => state.items);
	const user = useSelector((state) => state.user);

	let alert = useAlert();
	let dispatch = useDispatch();

	let getItems = () => {
		axios({
			url: "/user/yourItems",
			withCredentials: true,
		}).then((res) => {
			if (res.status) {
				dispatch({ type: "SET_ITEMS", payload: res.data.items });
			} else {
				alert.error(res.data.msg);
			}
		});
	};

	useEffect(() => {
		getItems();
	}, []);

	return (
		<Layout container>
			<div className="profile-section">
				<div className='profile-img'>
					<img
						src={
							user?.profileImg
								? `http://localhost:7000/profileImages/${user.profileImg}`
								: "default.jpg"
						}
						className="profileImage"
					/>
				</div>
				<div className='profile-desc'>
					<h1 className='name'>{user.fname} {user.lname}</h1>
					<p>{user.email}</p>
					<p>{items.length} Items uploaded</p>
				</div>
			</div>
			<div className="your-items">
				{items.length == 0 ? (
					<p>
						Looks like you havent added any items. Want to{" "}
						<a href="">Add an Item?</a>
					</p>
				) : (
					<TransitionGroup className="todo-list">
						<CardContainer>
							{items.map((item) => (
								<CSSTransition
									key={item._id}
									timeout={500}
									classNames="item"
								>
									<Card
										page="self"
										item={item}
										key={item._id}
									/>
								</CSSTransition>
							))}
						</CardContainer>
					</TransitionGroup>
				)}
			</div>
		</Layout>
	);
}
