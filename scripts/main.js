/*
		Title: ProDucktive
		Author: Philip Ainsworth
		Class: Visual Frameworks
		Session: 1205
		Week: 2
*/

window.addEventListener("DOMContentLoaded", function () {

	// Element shortcut
	var $ = function (x) {
		var element = document.getElementById(x);
		return element;
	}

	// Project selection
	var projects = function () {
		var tag = $('projects');
		for (var i=0, j=projectGroup.length; i<j; i++) {
			var makeOption = document.createElement('option');
			var optText = projectGroup[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			tag.appendChild(makeOption);
		}
	}

	//Category
	var getSelectedRadio = function () {
		var radios = document.forms[0].category;
		for(i=0; i<radios.length; i++) {
			if(radios[i].checked){
				catValue = radios[i].value;
			}
		}
		return catValue;
	}

	// Store Data
	var storeData = function () {
		var id = Math.floor(Math.random()*1000000);
		getSelectedRadio();
		var item = {};
			item.name = ["Item:", $('name').value];
			item.category = ["Category:", catValue];
			item.project = ["Project:", $('projects').value];
			item.notes = ["Notes:", $('notes').value];
			item.startDate = ["Start Date:", $('startDate').value];
			item.startTime = ["Start Time:", $('startTime').value];
			item.dutDate = ["Due Date:", $('dueDate').value];
			item.dueTime = ["Due Time:", $('dueTime').value];
			item.priority = ["Priority:", $('priority').value];
		localStorage.setItem(id, JSON.stringify(item));
		alert("Item Saved");
	}
	
	//Get Data
	var getData = function () {
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "data");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		for(i=0; i<localStorage.length; i++) {
			var makeLi = document.createElement('li');
			makeList.appendChild(makeLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			var makeSublist = document.createElement('ul');
			makeLi.appendChild(makeSublist);
			for (n in obj) {
				var makeSubli = document.createElement('li');
				makeSublist.appendChild(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.innerHTML = optSubText;
			};
		};
	}
	
	//Clear Data
	var clearData = function () {
		if(localStorage.length == 0) {
			alert("Local Storage is Empty.");
		} else {
			var sure = confirm("Are you sure you want to delete ALL DATA?");
			if(sure==1) {
				localStorage.clear();
				window.location.reload;
				alert("All Data Has Been Cleared.");
				return false;
			} else {
				alert("Data Has NOT Been Cleared.");
				return false;
			};
		};
	}
	
	// Variables
	var projectGroup = ["None", "Project1", "Project2"],
		catValue;
	projects();
	
	//Click events
	var display = $('display');
	display.addEventListener("click", getData);
	var clearD = $('clear');
	clearD.addEventListener("click", clearData);
	var saveD = $('submit');
	saveD.addEventListener("click", storeData);


});