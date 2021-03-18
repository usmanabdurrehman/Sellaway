import React, { useState } from "react";
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

	let item = props?.location?.state?.item
	let [fields, setFields] = useState({
		name: item?.name,
		location: item?.location,
		category: item?.category,
		price: item?.price,
		featured: item?.featured,
	});

	const [cat, setCat] = useState("mobiles and accessories");

	const handleChange = (event) => {
		setCat(event.target.value);
	};
	
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
						<h1>Add Item</h1>
						<TextField
							onChange={(e) =>
								setFields({ ...fields, name: e.target.value })
							}
							value={fields.name}
							label="Name"
							className="form-input"
							fullWidth
							disabled
						/>
						<TextField
							onChange={(e) =>
								setFields({
									...fields,
									location: e.target.value,
								})
							}
							value={fields.location}
							disabled
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
							disabled
							className="form-input"
							id="standard-select-currency"
						>
							{options.map((option) => (
								<MenuItem
									key={option.value}
									value={option.value}
									disabled
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
							disabled
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
								disabled
							/>
							<div>Featured</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
