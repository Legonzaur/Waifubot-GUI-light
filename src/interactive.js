let searchButton = document.getElementById("searchButton");
let scrollLimit = document.getElementById("scrollLimit");
const url = new URL(window.location);
sortElement.disabled = false;
searchButton.disabled = false;
searchInput.disabled = false;

function positionChange() {
  if (scrollLimit.getBoundingClientRect().top < window.innerHeight) {
    while (window.scrollMaxY - window.scrollY < window.screen.height * 2) {
      batchAddCards(inventoryToShow);
    }
  }
}

window.addEventListener("resize", positionChange);
document.addEventListener("scroll", positionChange);

sortElement.addEventListener("change", () => {
  filteredInventory = filter(user.Waifus, searchInput.value);
  filteredInventory = sort(filteredInventory, sortElement.value);

  url.searchParams.set("sort", sortElement.value);
  window.history.pushState({}, "", url);

  reloadAll();
});

searchButton.addEventListener("click", () => {
  if (searchButton.disabled) return;

  filteredInventory = filter(user.Waifus, searchInput.value);
  inventoryToShow = sort(filteredInventory, sortElement.value);

  url.searchParams.set("filter", searchInput.value);
  window.history.pushState({}, "", url);
  reloadAll();
});

searchInput.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    searchButton.click();
  }
});

window.addEventListener(
  "popstate",
  (e) => {
    let targetParams = new URLSearchParams(
      e.target.location.search.substring(1)
    );

    //filter parameter
    //options : any string or positive int
    if (targetParams.get("filter")) {
      filteredInventory = filter(user.Waifus, targetParams.get("filter"));
      searchInput.value = targetParams.get("filter");
    } else {
      //shallow copy
      filteredInventory = [...user.Waifus];
      searchInput.value = "";
    }

    //sort parameter
    //accepts any implemented by sort.
    sortElement.value = targetParams.get("sort") ?? "Date";
    sort(filteredInventory, sortElement.value);

    batchAddCards(inventoryToShow);
  },
  false
);

function reloadAll() {
  list.innerHTML = "";
  inventoryToShow = [...filteredInventory];
  batchAddCards(inventoryToShow);
}
