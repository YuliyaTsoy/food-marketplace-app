import { titleCaseString } from "../utils/strings";

// A checkbox for category filters and any tbd future filter purposes. Pattern appears quite often
// and hence was refactored into a component
export default function CategoryCheckbox(props) {
	const checkboxText = titleCaseString(props.id.split('search-')[1].replace('-', ' '));
	return (
		<div className="filter-checkbox-container">
			<input type="checkbox" id={props.id} name={props.name} onClick={props.onClick}/>
			<label htmlFor={props.id}>{checkboxText}</label>
		</div>	
		)
}