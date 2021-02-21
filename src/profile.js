const main = document.querySelector("body main");
const list = document.getElementById("list");
const loadingIndicator = document.getElementById("loadingIndicator");
const parameters = getUrlVars();
var amount = 50;
var current = 0;
var inventory = [];
var filteredInventory = [];
//display parameter
//options : grid or list
if (parameters.display == "list") {
	displayMode(1);
} else if (parameters.display == "grid") {
	displayMode(0);
}
//amount parameter
//option : any positive number
if (
	parameters.amount &&
	!isNaN(Number(parameters.amount)) &&
	Number(parameters.amount) > 0
) {
	amount = Number(parameters.amount);
}
//theme parameter
//options : black or white
if (parameters.theme == "black") {
	setTheme(0);
} else if (parameters.theme == "white") {
	setTheme(1);
}

//fetch user and get Waifus
fetch("https://waifubot.kar.wtf/user/" + parameters.user, {
	headers: {
		"Content-Type": "text/plain",
	},
	cache: "reload",
})
	.then(function (response) {
		return response.json();
	})
	.then(function (user) {
		inventory = user.Waifus;

		if (parameters.filter) {
			filteredInventory = filter(inventory, parameters.filter)
			searchInput.value = parameters.filter
		} else {
			//shallow copy
			filteredInventory = [...inventory];
		}

		//fill "current" select with options
		setCustomAmount(amount);
		populateNavMenu(filteredInventory, amount);
		displayList(filteredInventory, amount, current);
		if (filteredInventory.length > current + amount) {

			nextElement.disabled = false;
		}
		amountElement.disabled = false;
		currentElement.disabled = false;
		previousElement.disabled = true;
		searchInput.disabled = false;
		searchButton.disabled = false;
		sortElement.disabled = false;
	});

function emptyNavMenu() {
	document.getElementById("current").innerHTML = "";
}
function populateNavMenu(list, amount) {
	for (var i = 0; i * amount < list.length; i++) {
		let option = document.createElement("option");
		let text =
			i * amount +
			"-" +
			((i + 1) * amount > list.length ? list.length : (i + 1) * amount);
		option.setAttribute("value", i * amount);
		option.innerText = text;
		document.getElementById("current").appendChild(option);
	}
}
function displayList(list, amount, from) {
	for (var i = 0; i < amount; i++) {
		if (i + from < list.length) {
			displayCharacter(list[i + from]);
		}
	}
}
function setCustomAmount(amount) {
	let selected = Array.from(document.getElementById("amount")).find(
		(e) => e.value == amount
	);
	if (!selected) {
		selected = document.createElement("option");
		selected.setAttribute("value", amount);
		selected.innerText = amount;
		document.getElementById("amount").appendChild(selected);
	}
	selected.selected = true;
}
function emptyList() {
	list.innerHTML = "";
}
function displayCharacter({ ID, Name, Image }) {
	list.innerHTML += `<div class="character">
		  <a href="https://anilist.co/character/${ID}"><img src="${Image}"></a>
          <a href="https://anilist.co/character/${ID}">${ID}</a>
		  <p>${Name}</p>
        </div>`;
}
function displayMode(mode) {
	mode == 1 ? (list.className = "") : (list.className = "small");
}
function setTheme(mode) {
	mode == 1 ? (document.documentElement.className = "") : (document.documentElement.className = "black")
}
function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(
		/[?&]+([^=&]+)=([^&]*)/gi,
		function (m, key, value) {
			vars[key] = value;
		}
	);
	return vars;
}
function filter(list, input) {
	if (!isNaN(Number(input))) {
		return list.filter(e => e.ID.toString().startsWith(input))
	} else {
		return list.filter(e => e.Name.toLowerCase().includes(input.toLowerCase()))
	}
}
function sort(list, input) {
	if (input == "ID") {
		list.sort((a, b) => {
			return a.ID - b.ID
		})
	} else if (input == "Name") {
		list.sort((a, b) => {
			return a.Name > b.Name
		})
	}
}