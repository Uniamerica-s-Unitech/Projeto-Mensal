let gamesElement = document.getElementById("games");
let moreGamesBtn = document.getElementById("moreGamesBtn");
let allLI = document.getElementsByTagName("li"); 
let AllBtn = document.getElementsByName("all")[0];
let DelteBtn = document.getElementById("delete-filter");
let gamesInPage = 10;
let params = "games";
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'fe99dbfb08msh14cddaa1855a018p166055jsna6265a1d093e',
		'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
	}
};
let baseURL = 'https://free-to-play-games-database.p.rapidapi.com/api/';

AllBtn.addEventListener('click',reloadPage);
DelteBtn.addEventListener('click',reloadPage);

getApiData(gamesInPage,params);

moreGamesBtn.addEventListener('click',showMoreGames);

function showMoreGames(){
	gamesInPage = gamesInPage+12;
	getApiData(gamesInPage,params);
}

function changeParams(inputParams){
	gamesInPage = 10;
	params = inputParams;

	removeAllActive();
	

	console.log(inputParams);
	if(inputParams.includes('category')){
		elementDir = 'sidebar';
	}else{
		elementDir = 'nav';
	}
	
	console.log(elementDir);

	let nameOfClicked = inputParams.match(/(?<==).+/);
	nameOfClicked = String(nameOfClicked);

	let elementClicked = document.getElementsByName(nameOfClicked);
	console.log(elementClicked);
	console.log(nameOfClicked);
	elementClicked[0].setAttribute('id','active-'+elementDir+'-item');

	getApiData(gamesInPage,params);
}

async function getApiData(gamesInPage,params){

	console.log(baseURL+params);
	let requestJustMade = await fetch(baseURL+params, options);
	let myJson = await requestJustMade.json();

	console.log(myJson);

	let justAddedArticle;

	gamesElement.innerHTML = '';
	
	if(myJson.length<gamesInPage){
		gamesInPage = myJson.length;
	}

	for(let i=0;i<gamesInPage;i++){
		let newArticle = elementBuilder(myJson[i]);
		gamesElement.innerHTML += newArticle;
		justAddedArticle = document.getElementById(myJson[i].id);
		justAddedArticle.style.backgroundImage = "url("+myJson[i].thumbnail+")";
	}
}

function elementBuilder(gameObj){

	let newArticle = "<article><div id="+gameObj.id+"><img src=/imgs/game-list/bookmark.svg></div><span><h3>"+gameObj.title+"</h3><p>"+gameObj.short_description+"</p></span></article>";
	return newArticle;
}

function removeAllActive(){
	for(let i=0;i<allLI.length;i++){
		allLI[i].removeAttribute('id','active-sidebar-item');
		allLI[i].removeAttribute('id','active-nav-item');

	}
}

function reloadPage(){
	window.location.reload();
}