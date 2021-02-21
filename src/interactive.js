let amountElement = document.getElementById("amount");
let currentElement = document.getElementById("current");
let previousElement = document.getElementById("previous");
let nextElement = document.getElementById("next");
amountElement.disabled = false;
amountElement.addEventListener("change", (e) => {
	amount = Number(amountElement.value);
	emptyList();
	emptyNavMenu();
	populateNavMenu(inventory, amount);
	displayList(inventory, amount, 0);
	current = 0;
	nextElement.disabled = false;
	previousElement.disabled = true;
	if (inventory.length < current + amount) {
		nextElement.disabled = true;
	}
});

currentElement.disabled = false;
currentElement.addEventListener("click", (e) => {
	current = Number(currentElement.value);
	emptyList();
	displayList(inventory, amount, current);
	if (inventory.length < current + amount) {
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

previousElement.disabled = true;
previousElement.addEventListener("click", (e) => {
	if (previousElement.disabled) return;
	if (current > 0) {
		current -= amount;
		emptyList();
		displayList(inventory, amount, current);
		nextElement.disabled = false;
		currentElement.value = current;
	}
	if (current == 0) {
		previousElement.disabled = true;
	}
});

if (inventory.length > current + amount) {
	nextElement.disabled = false;
}
nextElement.addEventListener("click", (e) => {
	if (nextElement.disabled) return;
	if (current + amount < inventory.length) {
		current += amount;
		emptyList();
		displayList(inventory, amount, current);
		previousElement.disabled = false;
		currentElement.value = current;
	}
	if (current + amount >= inventory.length) {
		nextElement.disabled = true;
	}
});
