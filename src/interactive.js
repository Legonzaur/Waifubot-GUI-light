
let amountElement = document.getElementById("amount");
let currentElement = document.getElementById("current");
let sortElement = document.getElementById("sort");
let previousElement = document.getElementById("previous");
let nextElement = document.getElementById("next");
let searchInput = document.getElementById("searchInput");
let searchButton = document.getElementById("searchButton");
const url = new URL(window.location);

amountElement.addEventListener("change", (e) => {
	amount = Number(amountElement.value);
	url.searchParams.set('amount', amountElement.value);
	window.history.pushState({}, '', url);
	reloadAll()
});

sortElement.addEventListener("change", (e) => {
	if (sortElement.value == "Date") {
		filteredInventory = filter(inventory, searchInput.value)
	} else {
		sort(filteredInventory, sortElement.value)
	}
	url.searchParams.set('sort', sortElement.value);
	window.history.pushState({}, '', url);
	reloadAll()
});

currentElement.addEventListener("change", (e) => {
	current = Number(currentElement.value);
	emptyList();
	displayList(filteredInventory, amount, current);
	if (filteredInventory.length < current + amount) {
		nextElement.disabled = true;
	} else {
		nextElement.disabled = false;
	}
	if (current == 0) {
		previousElement.disabled = true;
	} else {
		previousElement.disabled = false;
	}
});


previousElement.addEventListener("click", (e) => {
	if (previousElement.disabled) return;
	if (current > 0) {
		current -= amount;
		emptyList();
		displayList(filteredInventory, amount, current);
		nextElement.disabled = false;
		currentElement.value = current;
	}
	if (current == 0) {
		previousElement.disabled = true;
	}
});

nextElement.addEventListener("click", (e) => {
	if (nextElement.disabled) return;
	if (current + amount < filteredInventory.length) {
		current += amount;
		emptyList();
		displayList(filteredInventory, amount, current);
		previousElement.disabled = false;
		currentElement.value = current;
	}
	if (current + amount >= filteredInventory.length) {
		nextElement.disabled = true;
	}
});

searchButton.addEventListener("click", (e) => {
	if (searchButton.disabled) return;
	filteredInventory = filter(inventory, searchInput.value)
	if (sortElement.value != "Date") {
		sort(filteredInventory, sortElement.value)
	}
	url.searchParams.set('filter', searchInput.value);
	window.history.pushState({}, '', url);
	reloadAll()
});

searchInput.addEventListener("keyup", e => {
	if (e.key == "Enter") {
		searchButton.click()
	}
})

window.addEventListener("popstate", e => {
	let targetParams = new URLSearchParams(e.target.location.search.substring(1))

	//filter parameter
	//options : any string or positive int
	if (targetParams.get("filter")) {
		filteredInventory = filter(inventory, targetParams.get("filter"))
		searchInput.value = targetParams.get("filter")
	} else {
		//shallow copy
		filteredInventory = [...inventory];
		searchInput.value = "";
	}

	//sort parameter
	//options : any or ID or Name
	if (targetParams.get("sort") == "ID" || targetParams.get("sort") == "Name") {
		sort(filteredInventory, targetParams.get("sort"))
		sortElement.value = targetParams.get("sort");
	}

	//amount parameter
	amount = Number(targetParams.get("amount"))
	setCustomAmount(amount);

	reloadAll();
}, false)
function reloadAll() {
	emptyList();
	emptyNavMenu();
	populateNavMenu(filteredInventory, amount);
	displayList(filteredInventory, amount, 0);
	current = 0;

	previousElement.disabled = true;
	if (filteredInventory.length < current + amount) {
		nextElement.disabled = true;
	} else {
		nextElement.disabled = false;
	}
}