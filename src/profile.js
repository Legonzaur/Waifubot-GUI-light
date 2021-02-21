const main = document.querySelector("body main");
const list = document.getElementById("list");
const loadingIndicator = document.getElementById("loadingIndicator");
const parameters = getUrlVars();
var amount = 50;
var current = 0;
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
	setCustomAmount(amount);
}

//ser user and get Waifus

//fake inventory generation
/*fetch("example.json", {
	headers: {
		"Access-Control-Allow-Origin": "waifubot.kar.wtf",
		"Content-Type": "application/json;charset=utf-8",
	},
})
	.then(function (response) {
		console.log(response);
		//console.log(JSON.parse(response.body));
		return response.blob();
	})
	.then(function (data) {
		console.log(JSON.parse(data));
	});*/

let user = JSON.parse(
	`{"ID":268494575780233216,"Favorite":{"ID":21938,"Name":"Robert E. O. Speedwagon","Image":"https://s4.anilist.co/file/anilistcdn/character/large/n21938-7iTMOJ4i6ET8.png"},"Date":"2021-02-20T20:45:35.189Z","Waifus":[{"ID":88184,"Name":"Masaki Ichijou","Image":"https://s4.anilist.co/file/anilistcdn/character/large/b88184-cwGSKwJocrVf.png"},{"ID":87227,"Name":"Banda-kun","Image":"https://s4.anilist.co/file/anilistcdn/character/large/87227.jpg"},{"ID":321,"Name":"Kaori Misaka","Image":"https://s4.anilist.co/file/anilistcdn/character/large/321.jpg"},{"ID":31317,"Name":"Fumika Mitarai","Image":"https://s4.anilist.co/file/anilistcdn/character/large/31317.jpg"},{"ID":132445,"Name":"Makoto Oono","Image":"https://s4.anilist.co/file/anilistcdn/character/large/b132445-HApOcVxRS5XW.png"},{"ID":37491,"Name":"Cheren","Image":"https://s4.anilist.co/file/anilistcdn/character/large/37491.jpg"},{"ID":14488,"Name":"Maraich Juschenfe","Image":"https://s4.anilist.co/file/anilistcdn/character/large/b14488-IktT4iVSnPZw.jpg"},{"ID":132293,"Name":"Hikaru Hoshina","Image":"https://s4.anilist.co/file/anilistcdn/character/large/b132293-OgZfiamB8if3.jpg"},{"ID":76550,"Name":"Donatello Versace","Image":"https://s4.anilist.co/file/anilistcdn/character/large/b76550-3MJU00EiCdES.png"},{"ID":162068,"Name":"Sedona Bleu","Image":"https://s4.anilist.co/file/anilistcdn/character/large/b162068-n9l6tjLIeP6C.png"},{"ID":9061,"Name":"Moondoggie","Image":"https://s4.anilist.co/file/anilistcdn/character/large/b9061-yAnH5dO8QccG.png"},{"ID":142551,"Name":"Sanjouno Haruhime","Image":"https://s4.anilist.co/file/anilistcdn/character/large/b142551-WyUJ6UW2H5UH.png"},{"ID":131609,"Name":"Jakurai Jinguji","Image":"https://s4.anilist.co/file/anilistcdn/character/large/b131609-hHBzdr7YvkgE.png"},{"ID":14337,"Name":"Ishu Benikawa","Image":"https://s4.anilist.co/file/anilistcdn/character/large/14337.jpg"},{"ID":182541,"Name":"Sora Narukami","Image":"https://s4.anilist.co/file/anilistcdn/character/large/b182541-pmG0I2rWKY9Z.png"},{"ID":17966,"Name":"Hagen Merak","Image":"https://s4.anilist.co/file/anilistcdn/character/large/17966.jpg"},{"ID":59431,"Name":"Tsubaki Shinra","Image":"https://s4.anilist.co/file/anilistcdn/character/large/b59431-2FaYIlCi2mE8.png"},{"ID":39751,"Name":"Momoyo Kawakami","Image":"https://s4.anilist.co/file/anilistcdn/character/large/n39751-LsEiLwGxkS9O.jpg"},{"ID":15762,"Name":"July","Image":"https://s4.anilist.co/file/anilistcdn/character/large/15762.jpg"},{"ID":25404,"Name":"Chiaki Tanimura","Image":"https://s4.anilist.co/file/anilistcdn/character/large/b25404-Jg1KHqugvTsT.png"},{"ID":164623,"Name":"Mari Mutou","Image":"https://s4.anilist.co/file/anilistcdn/character/large/b164623-FVD1aPhzqmJt.png"},{"ID":25096,"Name":"Terryman","Image":"https://s4.anilist.co/file/anilistcdn/character/large/b25096-EwIk2XsybVdQ.png"},{"ID":31776,"Name":"Yuuki Tachimukai","Image":"https://s4.anilist.co/file/anilistcdn/character/large/31776.jpg"},{"ID":78359,"Name":"Ludger Will Kresnik","Image":"https://s4.anilist.co/file/anilistcdn/character/large/78359.jpg"},{"ID":129285,"Name":"Mirei Hayasaka","Image":"https://s4.anilist.co/file/anilistcdn/character/large/b129285-xxfUUnm4rAgO.jpg"},{"ID":126875,"Name":"Yuuji Yugami","Image":"https://s4.anilist.co/file/anilistcdn/character/large/b126875-3nXcYieuvXPO.png"},{"ID":126466,"Name":"Melascula","Image":"https://s4.anilist.co/file/anilistcdn/character/large/126466-7xOUbfayr0D2.jpg"},{"ID":130685,"Name":"Hye-Sung Kim","Image":"https://s4.anilist.co/file/anilistcdn/character/large/b130685-8HBHk6pg4Qvg.png"},{"ID":13039,"Name":"Rin Natsume","Image":"https://s4.anilist.co/file/anilistcdn/character/large/13039.jpg"},{"ID":29699,"Name":"Erika Kurumi","Image":"https://s4.anilist.co/file/anilistcdn/character/large/b29699-GcG3alXqsSEX.png"},{"ID":53285,"Name":"Shigeo Shiba","Image":"https://s4.anilist.co/file/anilistcdn/character/large/53285.jpg"},{"ID":84183,"Name":"Cosette Shelley","Image":"https://s4.anilist.co/file/anilistcdn/character/large/84183.jpg"},{"ID":41378,"Name":"Kureha Sakamachi","Image":"https://s4.anilist.co/file/anilistcdn/character/large/n41378-9SQk5WTXFkxh.jpg"},{"ID":39184,"Name":"Astral","Image":"https://s4.anilist.co/file/anilistcdn/character/large/39184.jpg"},{"ID":138780,"Name":"Ducky","Image":"https://s4.anilist.co/file/anilistcdn/character/large/b138780-GdrwfMu4hy7J.jpg"},{"ID":169632,"Name":"Penelope Eckart","Image":"https://s4.anilist.co/file/anilistcdn/character/large/b169632-H9UITJ48WyOl.png"},{"ID":2092,"Name":"Aono Morimiya","Image":"https://s4.anilist.co/file/anilistcdn/character/large/2092.jpg"},{"ID":75020,"Name":"Rina Yunoki","Image":"https://s4.anilist.co/file/anilistcdn/character/large/75020.jpg"},{"ID":16279,"Name":"Ri Kohran","Image":"https://s4.anilist.co/file/anilistcdn/character/large/16279.jpg"},{"ID":149086,"Name":"Farfa","Image":"https://s4.anilist.co/file/anilistcdn/character/large/b149086-bCzRhTM6UD6M.jpg"},{"ID":16307,"Name":"Kuroino","Image":"https://s4.anilist.co/file/anilistcdn/character/large/16307.jpg"},{"ID":8514,"Name":"Zoisite","Image":"https://s4.anilist.co/file/anilistcdn/character/large/8514.jpg"},{"ID":131295,"Name":"Shiori Saginomiya","Image":"https://s4.anilist.co/file/anilistcdn/character/large/b131295-FePB1iTEiwej.jpg"},{"ID":181340,"Name":"Jin Kougasaki","Image":"https://s4.anilist.co/file/anilistcdn/character/large/b181340-YEKl34sAfGg5.png"},{"ID":132945,"Name":"Bill","Image":"https://s4.anilist.co/file/anilistcdn/character/large/n132945-G5NJQ9JMtF0X.jpg"},{"ID":70405,"Name":"Orion","Image":"https://s4.anilist.co/file/anilistcdn/character/large/b70405-yf8Zxa3Jqk0w.jpg"},{"ID":2763,"Name":"Mizuho Kazami","Image":"https://s4.anilist.co/file/anilistcdn/character/large/2763.jpg"},{"ID":40963,"Name":"Q","Image":"https://s4.anilist.co/file/anilistcdn/character/large/40963.jpg"},{"ID":17823,"Name":"Kouji Haruta","Image":"https://s4.anilist.co/file/anilistcdn/character/large/b17823-EI5fCOcNDeX4.png"},{"ID":9421,"Name":"Wataru Takagi","Image":"https://s4.anilist.co/file/anilistcdn/character/large/b9421-AANaH8JFZ9Cb.jpg"},{"ID":88069,"Name":"Nadeshiko Kashima","Image":"https://s4.anilist.co/file/anilistcdn/character/large/88069.jpg"},{"ID":139435,"Name":"Funicia Raffaeli","Image":"https://s4.anilist.co/file/anilistcdn/character/large/b139435-NHAI4qXlid0r.png"},{"ID":19271,"Name":"Doctor Hiluluk","Image":"https://s4.anilist.co/file/anilistcdn/character/large/b19271-15sAzRtoggrW.png"},{"ID":29184,"Name":"Hanako","Image":"https://s4.anilist.co/file/anilistcdn/character/large/29184.jpg"}]}`
);
let inventory = user.Waifus;

//fill "current" select with options
populateNavMenu(inventory, amount);

displayList(inventory, amount, current);

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
		if (i + from < list.length - 1) {
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
          <img src="${Image}">
          <a href="https://anilist.co/character/${ID}">${ID}</a>
		  <p>${Name}</p>
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
