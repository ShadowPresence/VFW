/*
        Title: ProDucktive
        Author: Philip Ainsworth
        Class: Visual Frameworks
        Session: 1205
        Week: 3
*/

window.addEventListener("DOMContentLoaded", function () {

    // Element shortcut
    var $ = function (x) {
        var element = document.getElementById(x);
        return element;
    };

    // Project selection
    var project = function () {
        var tag = $('projects');
        for (var i=0, j=projectGroup.length; i<j; i++) {
            var makeOption = document.createElement('option');
            var optText = projectGroup[i];
            makeOption.setAttribute("value", optText);
            makeOption.innerHTML = optText;
            tag.appendChild(makeOption);
        };
    };
    
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
                $('newQuack').style.display = "none";
                $('data').style.display = "none";
                break;
            default:
                return false;
        };
    };
    
    // Form Validation
    var validate = function (e) {
        var getTaskName = $('taskName');
        errMsg.innerHTML = "";
        getTaskName.style.border = "";
        var errorArray = [];
        if (getTaskName.value === "") {
            var tnError = "Please enter a task name.";
            getTaskName.style.border = "1px solid red";
            errorArray.push(tnError);
        };
        if (errorArray.length >=1) {
            for (var i = 0; i < errorArray.length; i++) {
                var errorList = document.createElement('li');
                errorList.innerHTML = errorArray[i];
                errMsg.appendChild(errorList);
            };
            e.preventDefault();
            return false;
        } else {
            storeData(this.key);
        };
    };

    // Store Data
    var storeData = function (key) {
        if (!key) {
            var id = Math.floor(Math.random()*1000000);
        } else {
            var id = key;
        }
        getSelectedRadio();
        var item = {};
            item.taskName = ["Item:", $('taskName').value];
            item.category = ["Category:", catValue];
            item.projects = ["Project:", $('projects').value];
            item.notes = ["Notes:", $('notes').value];
            item.startDate = ["Start Date:", $('startDate').value];
            item.startTime = ["Start Time:", $('startTime').value];
            item.dutDate = ["Due Date:", $('dueDate').value];
            item.dueTime = ["Due Time:", $('dueTime').value];
            item.priority = ["Priority:", $('priority').value];
        localStorage.setItem(id, JSON.stringify(item));
        window.location.reload();
        alert("Item Saved");
    };

    //Category
    var getSelectedRadio = function () {
        var radios = document.forms[0].category;
        for(i=0; i<radios.length; i++) {
            if(radios[i].checked){
                catValue = radios[i].value;
            };
        };
        return catValue;
    };

    //Local Storage check
    var lsc = function() {
    	if (localStorage.length >= 1) {
    		getData();
    	} else {
    		alert('Local Storage is currently empty. Please add a task first.')
    	};
    };
    
    //Get Data
    var getData = function () {
        toggleControl("on");
        var getDiv = $('data');
        $('data').style.display = "block";
        for(i=0; i<localStorage.length; i++) {
            var task = document.createElement('div');
            getDiv.appendChild(task);
            task.id = "taskContainer";
            var links = document.createElement('div');
            getDiv.appendChild(links);
            links.id = "links";
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            var obj = JSON.parse(value);
            for (n in obj) {
                var details = document.createElement('div');
                task.appendChild(details);
                details.id = "dataTag";
                var details2 = document.createElement('div');
                task.appendChild(details2);
                details2.id = "dataData";
                var detailTag = obj[n][0];
                var detailData = obj[n][1];
                details.innerHTML = detailTag;
                details2.innerHTML = detailData;
            };
            makeLinks(localStorage.key(i), links);
        };
    };

    //Make links for edit and delete
    var makeLinks = function (key, divName) {
        var editBut = buttonMagic(key, "editLink", "button", "edit", "Edit Task", divName);
        editBut.addEventListener("click", editItem);

        var deleteBut = buttonMagic(key, "deleteLink", "button", "delete", "Delete Task", divName);
        deleteBut.addEventListener("click", deleteItem);
    };

    // Button Magic
    var buttonMagic = function (key, buttonName, type, id, value, parent) {
        buttonName = document.createElement('input');
        buttonName.key = key;
        buttonName.type = type;
        buttonName.id = id;
        buttonName.value = value;
        parent.appendChild(buttonName);
        return buttonName;
    };
    
    //Edit Task
    var editItem = function () {
        var value = localStorage.getItem(this.key);
        var item = JSON.parse(value);
        toggleControl("off");
        $('taskName').value = item.taskName[1];
        var radios = document.forms[0].category;
        for (var i = 0; i < radios.length; i++) {
            if(radios[i].value == "Work" && item.category[1] == "Work") {
                radios[i].checked = "checked";
            } else if (radios[i].value == "Home" && item.category[1] == "Home") {
                radios[i].checked = "checked";
            };
        };
        $('projects').value = item.projects[1];
        $('notes').value = item.notes[1];
        $('startDate').value = item.startDate[1];
        $('startTime').value = item.startTime[1];
        $('dueDate').value = item.dutDate[1];
        $('dueTime').value = item.dueTime[1];
        $('priority').value = item.priority[1];
        //saveD.removeEventListener("click", storeData);
        $('submit').value = "Update Task";
        var editSubmit = $('submit');
        editSubmit.addEventListener("click", validate);
        editSubmit.key = this.key;
    };

    //Task Delete
    var deleteItem = function () {
        var value = localStorage.getItem(this.key);
        var item = JSON.parse(value);
        var ask = confirm("Are you sure you want to delete the task: '" + item.taskName[1] + "' permanently from the list?");
        if (ask) {
            localStorage.removeItem(this.key);
            window.location.reload();
            alert("The task: '" + item.taskName[1] + "' has been deleted.");
        } else {
            alert("The task: '" + item.taskName[1] + "' has not been deleted.");
        };
    };

    //Clear Data
    var clearData = function () {
        if(localStorage.length === 0) {
            alert("Local Storage is Empty.");
        } else {
            // -- Added delete confirmation
            var sure = confirm("Are you sure you want to delete ALL DATA?");
            if(sure) {
                localStorage.clear();
                alert("All Data Has Been Cleared.");
                window.location.reload();
                return false;
            } else {
                alert("Data Has NOT Been Cleared."); // -- Alert when user cancels clear
                return false;
            };
        };
    };
    
    // Variables
    var projectGroup = ["None", "Project1", "Project2"],
        catValue,
        errMsg = $('errors');
    project();
    
    //Click events
    var display = $('display');
    display.addEventListener("click", lsc);
    var clearD = $('clear');
    clearD.addEventListener("click", clearData);
    var saveD = $('submit');
    saveD.addEventListener("click", validate);

});