function mytabulate(id,data, columns) {
    //Code from https://gist.github.com/jfreels/6733593

	var table = d3.select(id).append('table')
	var thead = table.append('thead')
	var	tbody = table.append('tbody');
	// append the header row
	thead.append('tr')
	  .selectAll('th')
	  .data(columns).enter()
	  .append('th')
	    .text(function (column) { return column; });


	tbody.selectAll("tr")
		.data(data)
		.join("tr")
		.selectAll("td")
		.data(row => {
			return columns.map((column)=>{
				return {column: column, value: row[column]};
			});
		})
		.join('td')
		  .text(d=>d.value);

  //return table;
}

function filterRows(filterString,table){
	let newtable = table.filter((d) =>{
		return d.fn.includes(filterString)
	})
	return newtable
}

function updateTable(filterString,tabletag,tableData,columns){
	let newdata = filterRows(filterString,tableData)

	let tbody = d3.select(tabletag).select("tbody");

	tbody.selectAll("tr")
		.data(newdata)
		.join("tr")
		.selectAll("td")
		.data(row => {
			return columns.map((column)=>{
				return {column: column, value: row[column]};
			});
		})
		.join('td')
		  .text(d=>d.value);

}