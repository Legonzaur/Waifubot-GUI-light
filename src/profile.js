const main = document.querySelector("body main");
const list = document.getElementById("list");
const loadingIndicator = document.getElementById("loadingIndicator");
const parameters = getUrlVars();
var amount = 50;
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
	let amount = Number(parameters.amount);
	setAmount(amount);
}

//ser user and get Waifus

//fake inventory generation
fetch("flowers.jpg").then(function (response) {
	console.log(response);
	return response.blob();

	//fill "current" select with options
	for (var i = 0; i * amount < inventory.length; i++) {
		let option = document.createElement("option");
		let text =
			i * amount +
			"-" +
			((i + 1) * amount > inventory.length
				? inventory.length
				: (i + 1) * amount);
		option.setAttribute("value", text);
		option.innerText = text;
		document.getElementById("current").appendChild(option);
	}
});

function setAmount(amount) {
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
function addToListCharacter({ id, name, image }) {
	list.innerHTML += `<div class="character">
          <img src="${image}">
          <p>${id} : ${name}</p>
        </div>`;
}
function displayMode(mode) {
	mode == 1 ? (list.className = "") : (list.className = "small");
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
