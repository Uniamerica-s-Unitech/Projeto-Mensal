let gamesElement = document.getElementById("games");
let moreGamesBtn = document.getElementById("moreGamesBtn");
let gamesInPage = 10;

let all = document.getElementById("active-nav-item")
let shooter = document.getElementById("shooter")
let mmo = document.getElementById("mmo")
let rpg = document.getElementById("rpg")
let strategy = document.getElementById("strategy")
let action = document.getElementById("action")
let sports = document.getElementById("sports")
let social = document.getElementById("social")
let fantasy = document.getElementById("fantasy")

const urlParams = new URLSearchParams(window.location.search)

all.addEventListener('click', getAll);
shooter.addEventListener('click', getShooterParams);
mmo.addEventListener('click', getMmoParams);
rpg.addEventListener('click', getRpgParams);
strategy.addEventListener('click', getStrategyParams);
action.addEventListener('click', getActionParams);
sports.addEventListener('click', getSportsParams);
social.addEventListener('click', getSocialParams);
fantasy.addEventListener('click', getFantasyParams);

function getAll() {
	window.location.search = ""
}
function getShooterParams() {
	window.location.search = "?category=shooter"
}
function getMmoParams() {
	window.location.search = "?category=mmo"
}
function getRpgParams() {
	window.location.search = "?category=mmorpg"
}
function getStrategyParams() {
	window.location.search = "?category=strategy"
}
function getActionParams() {
	window.location.search = "?category=action"
}
function getSportsParams() {
	window.location.search = "?category=sports"
}
function getSocialParams() {
	window.location.search = "?category=social"
}
function getFantasyParams() {
	window.location.search = "?category=fantasy"
}

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'fe99dbfb08msh14cddaa1855a018p166055jsna6265a1d093e',
		'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
	}
};
let baseURL = `https://free-to-play-games-database.p.rapidapi.com/api/games?${urlParams}`;

getApiData(gamesInPage);

moreGamesBtn.addEventListener('click',showMoreGames);

function showMoreGames(){
	gamesInPage = gamesInPage+10;
	getApiData(gamesInPage);
}

async function getApiData(gamesInPage){

	let requestJustMade = await fetch(baseURL, options);
	let myJson = await requestJustMade.json();
	let justAddedArticle;

	gamesElement.innerHTML = '';	

	for(let i=0;i<gamesInPage;i++){
		let newArticle = elementBuilder(myJson[i]);
		gamesElement.innerHTML += newArticle;
		justAddedArticle = document.getElementById(myJson[i].id);
		justAddedArticle.style.backgroundImage = "url("+myJson[i].thumbnail+")";
	}
}

function elementBuilder(gameObj){
	let newArticle = `
		<article>
			<div id=${gameObj.id}>
				<img src=/imgs/game-list/bookmark.svg>
			</div>
			<span>
				<h3>${gameObj.title}</h3>
				<p>${gameObj.short_description}</p>
			</span>
		</article>`;
	return newArticle;
}