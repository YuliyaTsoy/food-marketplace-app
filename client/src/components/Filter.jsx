import { useState } from "react";

import { titleCaseString } from "../utils/strings";

const initialCategoryFilter = {
	cannedGoods: false,
	dairy: false,
	fruits: false,
	meat: false,
	preparedGoods: false,
	vegetables: false
}

// Infinity is technically not a number but it is guaranteed to be bigger
// than ANY price set for a product
const initialPriceRange = [0, Infinity];

function Filter() {
	const [filterCount, setFilterCount] = useState(0);
	const [filters, setFilters] = useState(initialCategoryFilter);

	const [priceRange, setPriceRange] = useState(initialPriceRange);

	function handlePriceRange(props) {
		console.log('props -> ', props);

		let { id, value } = props.target;

		// If input contains non-numeric characters, get rid of them
		if (props.target.validity.patternMismatch) {
			value = value.replace(/\D/g, "");
		}

		// Up until this point 'value' is a String
		// value = Number.parseFloat(value);
		value = Number.parseInt(value);

		// If min/max is not set -> pull currently cached value
		// If min/max is set     -> set to 0 (if negative) otherwise the value is unchanged
		let min, max;
		if (id === "min-price-filter") {
			min = value ? Math.max(value, 0) : priceRange[0];
			max = priceRange[1];
		} else {
			min = priceRange[0];
			max = value ? Math.max(value, 0) : priceRange[1]
		}

		if (max < min) {
			const temp = max;
			max = min;
			min = temp;
		}

		setPriceRange([min, max]);
	}

	function clearFilters() {
		setFilters(initialCategoryFilter);
		setFilterCount(0);
		
		// use plain-old js to unselect checkboxes - Not sure how to do it in react just yet
		const checkBoxEls = document.querySelectorAll('input[type=checkbox]');
		for (const checkBox of checkBoxEls) {
			checkBox.checked = false;
		}
	}

	const toggleCategoryFilter = (e) => {
		const { name } = e.target;

		const currFilter = filters[name];
		// If the current filter is false, we are activating a filter and thus we
		// should add 1 to the filterCount. If the current filter is true then
		// we are removing a filter and should minus 1
		if (!currFilter) {
			setFilterCount(filterCount + 1);
		}	else {
			setFilterCount(filterCount - 1);
		}

		// Flip the boolean of the category filter
		setFilters(prevState => ({
			...prevState,
			[name]: !currFilter
		}));
	}

	// refactor this pattern into a single component for easier editing
	function CategoryCheckbox(props) {
		const checkboxText = titleCaseString(props.id.split('search-')[1].replace('-', ' '));
		return (
			<div className="filter-checkbox-container">
				<input type="checkbox" id={props.id} name={props.name} onClick={toggleCategoryFilter}/>
				<label htmlFor={props.id}>{checkboxText}</label>
			</div>	
		)
	}
	

	return (
		<aside className="product-filter w-1/6 bg-red-200">
			<div className="flex space-x-4">
				<span className="text-center">Filters ({filterCount})</span>
				<button className="bg-red-800 text-white rounded" onClick={clearFilters}>
					<span>Clear filters</span>
				</button>
			</div>
			<hr />
			<div className="filter-categories">
				<CategoryCheckbox id="search-canned-goods" name="cannedGoods" />
				<CategoryCheckbox id="search-dairy" name="dairy" />
				<CategoryCheckbox id="search-fruit" name="fruits" />
				<CategoryCheckbox id="search-meat" name="meat" />
				<CategoryCheckbox id="search-prepared-goods" name="preparedGoods" />
				<CategoryCheckbox id="search-vegetables" name="vegetables" />
			</div>
			<hr />
			<div>
				<div className="filter-price flex">
					<input type="text" inputMode="numeric" pattern="[0-9]*" placeholder="0" id="min-price-filter" className="price-input" onChange={handlePriceRange}/>
					<span>to</span>
					<input type="text" inputMode="numeric" pattern="[0-9]*" placeholder="no limit" id="max-price-filter" className="price-input" onChange={handlePriceRange}/>
				</div>
				<div className="flex">
					<label htmlFor="min-price-filter">Min price</label>
					<span>to</span>
					<label htmlFor="max-price-filter">Max price</label>
				</div>
			</div>


		</aside>
	)
}
export default Filter;
