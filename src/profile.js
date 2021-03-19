const main = document.querySelector("body main");
const list = document.getElementById("list");
const sortElement = document.getElementById("sort");
const searchInput = document.getElementById("searchInput");
const parameters = new URLSearchParams(window.location.search.substring(1))
var amount = Number(parameters.get("amount")) || 50;
var user = {};
var compareUsers = []
var inventoryToShow = [];
var filteredInventory = [];

//theme parameter
//options : black, white or gray
setTheme(parameters.get("theme") || "black")

//fetch all necessary JSONS
const userDatas = [fetchUserData(parameters.get("user"))]

if (parameters.get("compare")?.split(",")) {
	parameters.get("compare")?.split(",").forEach(e => {
		userDatas.push(fetchUserData(e));
	})
}

Promise.all(userDatas).then(e => {
	user = e.shift();
	console.log(user)
	user.ID = parameters.get("user");

	let compareWith = document.getElementById("compareWith");
	e.forEach((compareUser, index) => {
		compareUser.ID = parameters.get("compare").split(",")[index];
		compareUsers.push(compareUser)
		let userID = document.createElement("div");
		userID.dataset.index = index;
		userID.innerText = compareUser.ID;
		compareWith.appendChild(userID)
	})
	//this shit is in case the user adds a filter query argument
	filteredInventory = filter(user.Waifus, parameters.get("filter") || "")
	//this shit is in case the user adds a sort query argument
	if (parameters.get("sort") != "Date") sort(filteredInventory, parameters.get("sort"));
	inventoryToShow = [...filteredInventory];
	while (document.body.scrollHeight < window.innerHeight && inventoryToShow.length != 0) {
		batchAddCards(inventoryToShow);
	}
});


function batchAddCards(waifuList) {
	let cards = document.createDocumentFragment();
	inventoryToShow.splice(0, amount).forEach(waifu => {
		let card = document.createElement("div");
		let link = document.createElement("a");
		let img = document.createElement("img");
		let waifuID = document.createElement("p");
		let waifuName = document.createElement("p");
		card.appendChild(link);
		link.appendChild(img);
		card.appendChild(waifuID);
		card.appendChild(waifuName);
		link.setAttribute("href", "https://anilist.co/character/" + waifu.ID);
		img.setAttribute("src", waifu.Image);
		waifuID.innerText = waifu.ID;
		waifuName.innerText = waifu.Name;
		card.className = "character small";

		let owners = document.createElement("div")
		owners.className = "ownerList"
		compare(waifu, compareUsers).forEach((user) => {
			let owner = document.createElement("div");
			owner.classList = "owner";
			owner.dataset.index = compareUsers.indexOf(user);
			owners.appendChild(owner);
		})
		card.appendChild(owners);

		cards.appendChild(card);
	});
	list.appendChild(cards);
}

function fetchUserData(id) {
	return fetch("https://waifubot.kar.wtf/user/" + id, {})
		.then(function (response) {
			return response.json();
		})
}

function setTheme(theme) {
	document.documentElement.className = theme;
}

function filter(list, input) {
	searchInput.value = input
	if (!isNaN(Number(input))) {
		return list.filter(e => e.ID.toString().startsWith(input))
	} else {
		return list.filter(e => e.Name.toLowerCase().includes(input.toLowerCase()))
	}
}

function sort(list, input) {
	if (input == "ID") {
		sortElement.value = input
		list.sort((a, b) => a.ID - b.ID)
	} else if (input == "Name") {
		sortElement.value = input
		list.sort((a, b) => a.Name.localeCompare(b.Name, 'fr', { ignorePunctuation: true }))
	}
}

function compare({ ID }, userList) {
	return userList.filter(user => user.Waifus.filter(waifu => waifu.ID == ID).length > 0);
}