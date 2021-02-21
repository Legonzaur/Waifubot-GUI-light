
let amountElement = document.getElementById("amount");
let currentElement = document.getElementById("current");
let sortElement = document.getElementById("sort");
let previousElement = document.getElementById("previous");
let nextElement = document.getElementById("next");
let searchInput = document.getElementById("searchInput");
let searchButton = document.getElementById("searchButton");

amountElement.addEventListener("change", (e) => {
	amount = Number(amountElement.value);
	reloadAll()
});

sortElement.addEventListener("change", (e) => {
	if (sortElement.value == "Date") {
		filteredInventory = filter(inventory, searchInput.value)
	} else {
		sort(filteredInventory, sortElement.value)
	}
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
	reloadAll()
});

searchInput.addEventListener("keyup", e => {
	if (e.key == "Enter") {
		searchButton.click()
	}
})
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