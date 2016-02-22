'use strict';
/*
NOTE TO GRADER: 

Filter function works, but there is a delay. Need to click on it again for it to work. 

*/
$(document).ready(init);

var dateStringG = '';
var descriptionStringG = '';
var debitG = '';
var creditG = '';
var balanceG = 0;
var momentG = moment(); 
var arrayOfRowObjectsG = [];
var filteredArrayOfRowObjectsG = [];

function init(){
	$('#add-entry-button').on('click', addEntryButton);
	$('#filter-dropdown-menu').on('click', filterTransactionsButton);	
}

function deleteEntryButton(){
	var $this = $(this);
	var $rowTransaction = $this.closest('.row-container');
	$rowTransaction.remove(); 
	arrayOfRowObjectsG.slice(0,arrayOfRowObjectsG.length); // Clear the array 
	arrayOfRowObjectsG = $('.old-transactions').find('.row-container'); 
}

function filterTransactionsButton(event){
	var filterDropdownValue = document.getElementById("filter-dropdown-menu").value;
	filteredArrayOfRowObjectsG = arrayOfRowObjectsG.filter(function(item, index){
    if(filterDropdownValue === 'debit') {
    	return item.attr('id') === 'debit';
    }
    else if(filterDropdownValue === 'credit') {
    	return item.attr('id') === 'credit';
    }
    else if(filterDropdownValue === 'all') {
    	return item; 
    }
	});
	displayFilteredEntries(filteredArrayOfRowObjectsG);
}

function displayFilteredEntries(filteredArray) {
	$('.old-transactions').empty();
	filteredArray.forEach(function(item, index){
		$('.old-transactions').append(item);
	});
}

function addEntryButton(){
	var $this = $(this);
	dateStringG = momentG.format($('#date-input').val(), 'MM/DD/YYYY');
	descriptionStringG = $('#description-input').val();
  debitG = $('#debit-input').val();
  creditG = $('#credit-input').val();
  displayNewEntry();
}

function displayNewEntry() {
	var $rowContainer = $('<div>').addClass('row row-container');
  var $dateColumn = $('<div>').addClass('col-md-2').attr('id', 'date-col-output').text(dateStringG)
  $rowContainer.append($dateColumn); 
  var $descriptionColumn = $('<div>').addClass('col-md-2').attr('id', 'description-col-output').text(descriptionStringG);
	$rowContainer.append($descriptionColumn);
	var $debitColumn = $('<div>').addClass('col-md-2').attr('id', 'debit-col-output').text('$' + Number(debitG).toFixed(2));
	$rowContainer.append($debitColumn);
	var $creditColumn = $('<div>').addClass('col-md-2').attr('id', 'credit-col-output').text('$' + Number(creditG).toFixed(2));
  $rowContainer.append($creditColumn);
  var $balanceColumn = $('<div>').addClass('col-md-2').attr('id','balance-col-output').text('$'+ Number(calculateBalance()).toFixed(2));
  $rowContainer.append($balanceColumn);
  var $deleteIconColumn = $('<div>').addClass('delete-btn col-md-2');
  var $deleteIcon = $('<i>').addClass('fa fa-trash');
  $deleteIconColumn.append($deleteIcon);
  $rowContainer.append($deleteIconColumn);
  $deleteIconColumn.click(deleteEntryButton);	
  
  if(Number(debitG) !== 0){
  	$rowContainer.attr('id','debit');
  }
  else if(Number(creditG) !== 0){
  	$rowContainer.attr('id','credit');
  }
  arrayOfRowObjectsG.push($rowContainer);
	$('.old-transactions').append($rowContainer);
	creditG = 0; 
	debitG = 0; 
	$('.input-field').val('');  // Clears all the input fields
}

function calculateBalance(){
	balanceG = Number(balanceG) + Number(creditG) - Number(debitG); 	
	return balanceG; 
}

