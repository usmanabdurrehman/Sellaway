import React, { useRef,useEffect } from "react";
import SearchIcon from '@material-ui/icons/Search';
import {IconButton} from '@material-ui/core'

import './Search.css'

export default function Search() {
	let inputRef = useRef(null);
	let inputWrapperRef = useRef(null);

	useEffect(() => {
		inputRef.current.addEventListener("focus", () => {
			inputWrapperRef.current.classList.add("onfocuswrapper");
		});
		inputRef.current.addEventListener("blur", () => {
			inputWrapperRef.current.classList.remove("onfocuswrapper");
		});
	}, []);

	return (
		<div ref={inputWrapperRef} className="searchWrapper">
			<input
				ref={inputRef}
				placeholder="Search..."
				className="search"
				type="text"
			/>
			<IconButton className="search-icon">
				<SearchIcon />
			</IconButton>
			{/* </div> */}
		</div>
	);
}
