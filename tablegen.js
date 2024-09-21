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
}

function filterRows(filterString,table,filtercolumns){
	let newtable;
	filtercolumns.forEach((column) =>{
		newtable = table.filter((d) =>{
			return d[column].includes(filterString)
		})
	})
	return newtable
}

function updateTable(filterString,id,tableData,columns,filtercolumns){
	let newdata = filterRows(filterString,tableData,filtercolumns)

	let tbody = d3.select(id).select("tbody");

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

function readtable(tableid){
    ///Function to read in a html table 
    let mytable = document.getElementById(tableid);
    let objlist = [];
    let headerlist = [];
    //Get Table Header names
    const thead = mytable.querySelector('thead').querySelector('tr').querySelectorAll('td');
    thead.forEach(td => {
        headerlist.push(td.innerText);
    })
    const tbody = mytable.querySelector('tbody');
    let rows = tbody.querySelectorAll('tr');
    rows.forEach((d) => {
        let rowob = {};
        let tds = d.querySelectorAll('td');
            tds.forEach((d2,i2) =>{ 
            rowob[headerlist[i2]] = d2.innerText;
            });
            objlist.push(rowob);
    })
    return objlist;
}

export {mytabulate,updateTable,readtable};