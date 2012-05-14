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
	
	// Toggle nav
	var toggleControl = function (t) {
		switch(t){
			case "on":
				$('item').style.display = "none";
				$('clear').style.paddingLeft = "0";
				$('clear').style.display = "block";
				$('newQuack').style.display = "block";
				$('display').style.display = "none";
				break;
			case "off":
				$('item').style.display = "block";
				$('clear').style.display = "inline";
				$('display').style.display = "inline";
				$('data').style.display = "none";
				break;
			default:
				return false;
		}
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
		toggleControl("on");
		var getDiv = $('data');
		$('data').style.display = "block";
		for(i=0; i<localStorage.length; i++) {
			var task = document.createElement('div');
			getDiv.appendChild(task);
			task.setAttribute('id', 'taskContainer');
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			for (n in obj) {
				var details = document.createElement('div');
				task.appendChild(details);
				details.setAttribute('id', 'dataTag');
				var details2 = document.createElement('div');
				task.appendChild(details2);
				details2.setAttribute('id', 'dataData');
				var detailTag = obj[n][0]
				var detailData = obj[n][1];
				details.innerHTML = detailTag;
				details2.innerHTML = detailData;
			};
		};
	}
	
	//Clear Data
	var clearData = function () {
		if(localStorage.length == 0) {
			alert("Local Storage is Empty.");
		} else {
			// -- Added delete confirmation
			var sure = confirm("Are you sure you want to delete ALL DATA?");
			if(sure==1) {
				localStorage.clear();
				alert("All Data Has Been Cleared.");
				window.location.reload();
				return false;
			} else {
				alert("Data Has NOT Been Cleared."); // -- Alert when user cancels clear
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