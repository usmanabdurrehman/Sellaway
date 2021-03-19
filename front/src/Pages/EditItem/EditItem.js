import React, { useState } from "react";
import { Layout } from "../../Layout";
import { TextField, Button, Switch, MenuItem } from "@material-ui/core";
import "./EditItem.css";
import { useAlert } from "react-alert";

import { Redirect } from "react-router-dom";

import axios from 'axios'

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

export default function EditItem(props) {
	let item = props?.location?.state?.item;

	let [fields, setFields] = useState({
		name: item.name,
		location: item.location,
		category: item.category,
		price: item.price,
		featured: true,
		image: null,
		imgUrl: null,
	});

	let alert = useAlert()

	let [redirect,setRedirect] = useState(false)

	const [cat, setCat] = React.useState(item.category);

	const handleChange = (event) => {
		setCat(event.target.value);
		setFields({...fields,category:event.target.value})
	};

	let clickHandler = () => {
		let formdata = new FormData();
		let { name, location, category, price, featured, image } = fields;
		formdata.append("name", name);
		formdata.append("location", location);
		formdata.append("category", category);
		formdata.append("price", price);
		formdata.append("featured", featured);
		formdata.append("filename", item.filename);
		formdata.append("image", image);
		formdata.append("id",item._id)

		axios({
			method: "post",
			url: "/user/updateItem",
			withCredentials: true,
			data: formdata,
		}).then((res) => {
			if (res.data.status) {
				setRedirect(true)
			}
			else alert.error(res.data.msg)
		});
	};

	let imageOnChange = (e) => {
		if (e.target.files[0]) {
			let imgUrl = URL.createObjectURL(e.target.files[0]);
			setFields({ ...fields, image: e.target.files[0], imgUrl });
		}
	};

	if (!item) return <Redirect to="/" />;

	return (
		<Layout container>
			<div className="edit-item">
				<div className="form-image">
					{fields.imgUrl == null && item.filename == null ? (
						<div className="file-wrapper">
							<input
								type="file"
								id="image"
								onChange={imageOnChange}
							/>
							<label for="image">
								<img src="default.jpg" />
							</label>
						</div>
					) : (
						<div className="image-wrapper">
							<img
								className="imageDisplay"
								src={fields.imgUrl || `http://localhost:7000/itemImages/${item.filename}`}
							/>
							<div className="absolute file-wrapper">
								<input
									type="file"
									id="image"
									onChange={imageOnChange}
								/>
								<label for="image">
									<img src="default.jpg" />
								</label>
							</div>
						</div>
					)}
				</div>
				<div className="form-fields">
					<div>
						<h1>Edit Item</h1>
						<TextField
							onChange={(e) =>
								setFields({ ...fields, name: e.target.value })
							}
							label="Name"
							className="form-input"
							fullWidth
							value={fields.name}
						/>
						<TextField
							onChange={(e) =>
								setFields({
									...fields,
									location: e.target.value,
								})
							}
							label="Location"
							className="form-input"
							fullWidth
							value={fields.location}
						/>
						<TextField
							select
							label="Category"
							value={cat}
							onChange={handleChange}
							fullWidth
							className="form-input"
							id="standard-select-currency"
						>
							{options.map((option) => (
								<MenuItem
									key={option.value}
									value={option.value}
								>
									{option.label}
								</MenuItem>
							))}
						</TextField>
						<TextField
							onChange={(e) =>
								setFields({
									...fields,
									price: parseInt(e.target.value),
								})
							}
							label="Price"
							className="form-input"
							type="number"
							fullWidth
							value={fields.price}
						/>
						<div className="switch-wrapper">
							<Switch
								checked={fields.featured}
								onChange={(e) =>
									setFields({
										...fields,
										featured: !fields.featured,
									})
								}
								color="primary"
								inputProps={{
									"aria-label": "primary checkbox",
								}}
								className="switch"
								value={fields.featured}
							/>
							<div>Featured</div>
						</div>
						<Button onClick={clickHandler} className="form-button">
							Edit Item
						</Button>
					</div>
				</div>
				{(redirect)?(<Redirect to='/yourItems'/>):(null)}
			</div>
		</Layout>
	);
}
