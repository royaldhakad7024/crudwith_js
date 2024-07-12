var selectedRow = null

function onFormSubmit(e) {
	event.preventDefault();
        var formData = readFormData();
        if (selectedRow == null){
            insertNewRecord(formData);
		}
        else{
            updateRecord(formData);
		}
        resetForm();    
}

//Retrieve the data
function readFormData() {
    var formData = {};
    formData["productCode"] = document.getElementById("productCode").value;
    formData["product"] = document.getElementById("product").value;
    formData["qty"] = document.getElementById("qty").value;
    formData["perPrice"] = document.getElementById("perPrice").value;
    return formData;
}

//Insert the data
function insertNewRecord(data) {
    var table = document.getElementById("storeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.productCode;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.product;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.qty;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.perPrice;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = `<button class="edit" onClick="onEdit(this)">Edit</button> <button class="delete" onClick="onDelete(this)">Delete</button>`;

    // Save to local storage
    saveDataToLocalStorage();
}


function saveDataToLocalStorage() {
    var tableData = [];
    var table = document.getElementById("storeList").getElementsByTagName('tbody')[0];

    for (var i = 0; i < table.rows.length; i++) {
        var rowData = {
            productCode: table.rows[i].cells[0].innerHTML,
            product: table.rows[i].cells[1].innerHTML,
            qty: table.rows[i].cells[2].innerHTML,
            perPrice: table.rows[i].cells[3].innerHTML
        };
        tableData.push(rowData);
    }

    localStorage.setItem('storeData', JSON.stringify(tableData));
}

document.addEventListener('DOMContentLoaded', function() {
    var storeData = JSON.parse(localStorage.getItem('storeData')) || [];
    var table = document.getElementById("storeList").getElementsByTagName('tbody')[0];

    storeData.forEach(function(data) {
        var newRow = table.insertRow(table.length);
        newRow.insertCell(0).innerHTML = data.productCode;
        newRow.insertCell(1).innerHTML = data.product;
        newRow.insertCell(2).innerHTML = data.qty;
        newRow.insertCell(3).innerHTML = data.perPrice;
        newRow.insertCell(4).innerHTML = `<button class="edit" onClick="onEdit(this)">Edit</button> <button class="delete" onClick="onDelete(this)">Delete</button>`;
    });
});


//Edit the data
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("productCode").value = selectedRow.cells[0].innerHTML;
    document.getElementById("product").value = selectedRow.cells[1].innerHTML;
    document.getElementById("qty").value = selectedRow.cells[2].innerHTML;
    document.getElementById("perPrice").value = selectedRow.cells[3].innerHTML;
}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.productCode;
    selectedRow.cells[1].innerHTML = formData.product;
    selectedRow.cells[2].innerHTML = formData.qty;
    selectedRow.cells[3].innerHTML = formData.perPrice;

    saveDataToLocalStorage();
}

//Delete the data
function onDelete(td) {
    if (confirm('Do you want to delete this record?')) {
        row = td.parentElement.parentElement;
        document.getElementById('storeList').deleteRow(row.rowIndex);
        saveDataToLocalStorage(); // Update local storage after deletion
        resetForm();
    }
}

//Reset the data
function resetForm() {
    document.getElementById("productCode").value = '';
    document.getElementById("product").value = '';
    document.getElementById("qty").value = '';
    document.getElementById("perPrice").value = '';
    selectedRow = null;
}
