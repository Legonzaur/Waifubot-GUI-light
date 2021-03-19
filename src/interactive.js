let searchButton = document.getElementById("searchButton");
const url = new URL(window.location);
sortElement.disabled = false;
searchButton.disabled = false;
searchInput.disabled = false;


window.addEventListener('resize', positionChange);
document.addEventListener('scroll', positionChange);

function positionChange(e) {
	if (document.getElementById("scrollLimit").getBoundingClientRect().top < window.innerHeight) {
		console.log(window.scrollMaxY, Math.round(window.scrollY))
		do {
			batchAddCards(inventoryToShow);
		}
		while (window.scrollMaxY == Math.round(window.scrollY) && inventoryToShow.length != 0)
	}
}



sortElement.addEventListener("change", (e) => {
	if (sortElement.value == "Date") {
		filteredInventory = filter(user.Waifus, searchInput.value)
	} else {
		sort(filteredInventory, sortElement.value)
	}
	url.searchParams.set('sort', sortElement.value);
	window.history.pushState({}, '', url);
	reloadAll();
});

searchButton.addEventListener("click", (e) => {
	if (searchButton.disabled) return;
	filteredInventory = filter(user.Waifus, searchInput.value)
	if (sortElement.value != "Date") {
		sort(filteredInventory, sortElement.value)
	}
	url.searchParams.set('filter', searchInput.value);
	window.history.pushState({}, '', url);
	reloadAll();
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
		filteredInventory = filter(user.Waifus, targetParams.get("filter"))
		searchInput.value = targetParams.get("filter")
	} else {
		//shallow copy
		filteredInventory = [...user.Waifus];
		searchInput.value = "";
	}

	//sort parameter
	//options : any or ID or Name
	if (targetParams.get("sort") == "ID" || targetParams.get("sort") == "Name") {
		sort(filteredInventory, targetParams.get("sort"))
		sortElement.value = targetParams.get("sort");
	}

	//amount parameter
	amount = Number(targetParams.get("amount")) || amount;
	reloadAll();
}, false)


function reloadAll() {
	list.innerHTML = "";
	inventoryToShow = [...filteredInventory]
	batchAddCards(inventoryToShow);
}