const main = document.querySelector("body main");
const list = document.getElementById("list");
const sortElement = document.getElementById("sort");
const searchInput = document.getElementById("searchInput");
const parameters = new URLSearchParams(window.location.search.substring(1));
var amount = Number(parameters.get("amount")) || 25;
var user = {};
var compareUsers = []
var inventoryToShow = [];
var filteredInventory = [];

console.log(amount)
//theme parameter
//options : black, white or gray
document.documentElement.className = parameters.get("theme") ?? "black";


//fetch all necessary JSONS
const userDatas = [fetch("https://waifubot.kar.wtf/user/" + parameters.get("user")).then((r) => r.json())]

if (parameters.get("compare")?.split(",")) {
	parameters.get("compare")?.split(",").forEach(e => {
		userDatas.push(fetch("https://waifubot.kar.wtf/user/" + e).then((r) => r.json()));
	})
}

Promise.all(userDatas).then(e => {
	console.log(e)
	user = e.shift();
	//compare stuff
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
	//sort and filter stuff
	filteredInventory = filter(user.Waifus, parameters.get("filter") || "");
    inventoryToShow = sort(filteredInventory, parameters.get("sort"), parameters.get("reversed"));
	while (document.body.scrollHeight < window.innerHeight && inventoryToShow.length != 0) {
		console.log(document.body.scrollHeight, window.innerHeight)
		batchAddCards(inventoryToShow);
	}
});

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
  let maps = {
    ID: ()=>{
      list.sort((a, b) => a.ID - b.ID);
    },
    Name: ()=>{
      list.sort((a, b) =>
      a.Name.localeCompare(b.Name, "fr", { ignorePunctuation: true })
    );
    },
    Date : ()=>{

    },
    Date_Reversed: ()=>{
      maps.Date();
      list = list.reverse()
    },
    Name_Reversed: ()=>{
      maps.Name();
      list = list.reverse()
    },
    ID_Reversed: ()=>{
      maps.ID();
      list = list.reverse();
    }
  };
  (maps[input] || maps.Date)();
  return list;
}

function compare({ ID }, userList) {
	return userList.filter(user => user.Waifus.filter(waifu => waifu.ID == ID).length > 0);
}