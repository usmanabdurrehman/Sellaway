import React, { useState, useEffect } from "react";
import "./Forms.css";
import { TextField, Button } from "@material-ui/core";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";

import SwipeableViews from "react-swipeable-views";

export default function Signup() {
	let [index, setIndex] = useState(0);

	let [submitDisabled, setSubmitDisabled] = useState(true);

	let handleChange = (event, value) => {
		setIndex(value);
	};

	let handleChangeIndex = (index) => {
		setIndex(index);
	};

	let [fields, setFields] = useState({
		fname: "",
		lname: "",
		email: "",
		pwd: "",
		image: "",
		imgUrl: "",
	});

	let [redirect, setRedirect] = useState(false);

	let { fname, lname, email, pwd, image } = fields;

	let formdata = new FormData();
	formdata.append("fname", fname);
	formdata.append("lname", lname);
	formdata.append("email", email);
	formdata.append("pwd", pwd);
	formdata.append("image", image);

	let clickHandler = () => {
		axios({
			url: "/signup",
			method: "post",
			withCredentials: true,
			data: formdata,
		}).then((res) => {
			if (res.data.status) {
				setRedirect(true);
			} else {
			}
		});
	};

	let imageOnChange = (e) => {
		if (e.target.files[0]) {
			let imgUrl = URL.createObjectURL(e.target.files[0]);
			setFields({ ...fields, image: e.target.files[0], imgUrl });
		}
	};

	useEffect(() => {
		if (
			fields.fname &&
			fields.lname &&
			fields.email &&
			fields.pwd &&
			fields.image
		) {
			setSubmitDisabled(false);
		} else {
			setSubmitDisabled(true);
		}
	}, [fields]);

	return (
		<div className="form-wrapper">
			<div className="form">
				<div className="form-image">
					<img src="signup.jpg" />
				</div>
				<div className="form-fields">
					<div>
						<h1>Sign Up</h1>
						<SwipeableViews
							index={index}
							onChangeIndex={handleChangeIndex}
						>
							<div>
								<TextField
									onChange={(e) =>
										setFields({
											...fields,
											fname: e.target.value,
										})
									}
									label="First Name"
									className="form-input"
									fullWidth
								/>
								<TextField
									onChange={(e) =>
										setFields({
											...fields,
											lname: e.target.value,
										})
									}
									label="Last Name"
									className="form-input"
									fullWidth
								/>
								<TextField
									onChange={(e) =>
										setFields({
											...fields,
											email: e.target.value,
										})
									}
									label="Email"
									className="form-input"
									fullWidth
								/>
								<TextField
									onChange={(e) =>
										setFields({
											...fields,
											pwd: e.target.value,
										})
									}
									type="password"
									label="Password"
									className="form-input"
									fullWidth
								/>
							</div>
							<div className="profile-image-wrapper">
								<div className="file-wrapper">
									<input
										type="file"
										id="image"
										onChange={imageOnChange}
									/>
									<label for="image">
										<img
											src={
												fields.imgUrl
													? fields.imgUrl
													: "default.jpg"
											}
										/>
									</label>
								</div>
							</div>
						</SwipeableViews>
						<Button
							onClick={(e) => {
								index == 0 ? setIndex(1) : setIndex(0);
							}}
							className="form-button"
						>
							{index == 0 ? "Next" : "Prev"}
						</Button>
						<Button
							disabled={submitDisabled}
							onClick={clickHandler}
							fullWidth
							className="submit-btn"
						>
							Sign up
						</Button>
						<p className="form-redirection-line">
							Already have an account?{" "}
							<Link to="/signin">Signin</Link>
						</p>
					</div>
				</div>
			</div>
			{redirect ? (
				<Redirect
					to={{ pathname: "/signin", state: { from: "signup" } }}
				/>
			) : null}
		</div>
	);
}
