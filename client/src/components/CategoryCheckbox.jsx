import { titleCaseString } from "../utils/strings";

// A checkbox for category filters and any tbd future filter purposes. Pattern appears quite often
// and hence was refactored into a component
export default function CategoryCheckbox({id, name, onClick}) {
	const checkboxText = titleCaseString(id.split('search-')[1].replace('-', ' '));
	return (
		<div className="filter-checkbox-container">
			<input type="checkbox" id={id} name={name} onClick={onClick}/>
			<label htmlFor={id}>{checkboxText}</label>
		</div>	
		)
}