import React, { useState } from "react";
import {Layout} from "../../Layout";
import {InputSelect} from '../../Components'
import { TextField, Button, Switch, MenuItem } from "@material-ui/core";
import "./AddItem.css";
import axios from "axios";
import { useAlert } from "react-alert";

const catOptions = [
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

export default function AddItem() {
	let [fields, setFields] = useState({
		name: "",
		location: "",
		category: "mobiles and accessories",
		price: 0,
		featured: true,
		image: null,
		imgUrl: null,
	});

	const [cat, setCat] = useState("mobiles and accessories");

	const handleChange = (e) => {
		setCat(e.target.value);
		setFields({...fields,category:e.target.value})
	};

	let alert = useAlert();

	let imageOnChange = (e) => {
		if (e.target.files[0]) {
			let imgUrl = URL.createObjectURL(e.target.files[0]);
			setFields({ ...fields, image: e.target.files[0], imgUrl });
		}
	};


	let clickHandler = () => {
		let formdata = new FormData();
		let { name, location, category, price, featured, image } = fields;
		formdata.append("name", name);
		formdata.append("location", location);
		formdata.append("category", category);
		formdata.append("price", price);
		formdata.append("featured", featured);
		formdata.append("image", image);

		axios({
			method: "post",
			url: "/user/addItem",
			withCredentials: true,
			data: formdata,
		}).then((res) => {
			if (res.data.status) {
				alert.success(res.data.msg);
				setFields({
					name: "",
					location: "",
					category: "",
					price: 0,
					featured: true,
					image: null,
					imgUrl: null,
				});
			}
		});
	};

	return (
		<Layout container>
			<div className="add-item">
				<div className="form-image">
					{fields.imgUrl == null ? (
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
							<img className='imageDisplay' src={fields.imgUrl} />
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
						<h1>Add Item</h1>
						<TextField
							onChange={(e) =>
								setFields({ ...fields, name: e.target.value })
							}
							value={fields.name}
							label="Name"
							className="form-input"
							fullWidth
						/>
						<TextField
							onChange={(e) =>
								setFields({
									...fields,
									location: e.target.value,
								})
							}
							value={fields.location}
							label="Location"
							className="form-input"
							fullWidth
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
							{catOptions.map((option) => (
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
							value={fields.price}
							label="Price"
							className="form-input"
							type="number"
							fullWidth
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
							/>
							<div>Featured</div>
						</div>
						<Button onClick={clickHandler} className="form-button">
							Add Item
						</Button>
					</div>
				</div>
			</div>
		</Layout>
	);
}
