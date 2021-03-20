const main = document.querySelector("body main");
const list = document.getElementById("list");
const sortElement = document.getElementById("sort");
const searchInput = document.getElementById("searchInput");
const parameters = new URLSearchParams(window.location.search.substring(1));
var amount = 25;
var user = {};
var inventoryToShow = [];
var filteredInventory = [];

//theme parameter
//options : black, white or gray
document.documentElement.className = parameters.get("theme") ?? "black";

fetch("https://waifubot.kar.wtf/user/" + parameters.get("user")).then((r) =>
  r.json().then((u) => {
    user = u;
    filteredInventory = filter(u.Waifus, parameters.get("filter") || "");
    inventoryToShow = sort(filteredInventory, parameters.get("sort"));
    batchAddCards(inventoryToShow);
  })
);

function batchAddCards(waifuList) {
  let cards = document.createDocumentFragment();

  waifuList.splice(0, amount).forEach((waifu) => {
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

    cards.appendChild(card);
    list.appendChild(cards);
  });
}

function filter(list, input) {
  searchInput.value = input;

  // if input is a number, filter using starts_with
  var filt = !isNaN(Number(input))
    ? (e) => e.ID.toString().startsWith(input)
    : (e) => e.Name.toLowerCase().includes(input.toLowerCase());

  return list.filter(filt);
}

function sort(list, input) {
  sortElement.value = input;

  switch (input) {
    case "ID":
      list.sort((a, b) => a.ID - b.ID);
      break;
    case "Name":
      list.sort((a, b) =>
        a.Name.localeCompare(b.Name, "fr", { ignorePunctuation: true })
      );
  }
  return list;
}
