import { useState } from "react";

const initialCategoryFilter = {
	cannedGoods: false,
	dairy: false,
	fruits: false,
	meat: false,
	preparedGoods: false,
	vegetables: false
}

function Filter() {
	const [filterCount, setFilterCount] = useState(0);
	const [filters, setFilters] = useState(initialCategoryFilter);

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

	return (
		<aside className="product-filter w-1/6 bg-red-800">
			<span>Filters ({filterCount})</span>
			<button onClick={clearFilters}>
				<span>Clear filters</span>
			</button>
			<hr />
			<div className="filter-categories">
				<div>
					<input type="checkbox" id="search-canned-goods" name="cannedGoods" onClick={toggleCategoryFilter}/>
					<label htmlFor="search-canned-goods">Canned Goods</label>
				</div>
				<div>
					<input type="checkbox" id="search-dairy" name="dairy" onClick={toggleCategoryFilter}/>
					<label htmlFor="search-dairy">Dairy</label>
				</div>
				<div>
					<input type="checkbox" id="search-fruit" name="fruits" onClick={toggleCategoryFilter}/>
					<label htmlFor="search-fruit">Fruits</label>
				</div>
				<div>
					<input type="checkbox" id="search-meat" name="meat" onClick={toggleCategoryFilter}/>
					<label htmlFor="search-meat">Meat</label>
				</div>
				<div>
					<input type="checkbox" id="search-prepared-goods" name="preparedGoods" onClick={toggleCategoryFilter}/>
					<label htmlFor="search-prepared-goods">Prepared Goods</label>
				</div>
				<div>
					<input type="checkbox" id="search-vegetables" name="vegetables" onClick={toggleCategoryFilter}/>
					<label htmlFor="search-vegetables">Vegetables</label>
				</div>
			</div>

		</aside>
	)
}
export default Filter;
