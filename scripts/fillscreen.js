let gamesElement = document.getElementById("games");
let moreGamesBtn = document.getElementById("moreGamesBtn");
let gamesInPage = 10;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'fe99dbfb08msh14cddaa1855a018p166055jsna6265a1d093e',
		'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
	}
};
let baseURL = 'https://free-to-play-games-database.p.rapidapi.com/api/games';

getApiData(gamesInPage);
moreGamesBtn.addEventListener('click',showMoreGames)

function showMoreGames(){
	gamesInPage = gamesInPage+10;
	getApiData(gamesInPage);
}

async function getApiData(gamesInPage){

	let requestJustMade = await fetch(baseURL, options);
	
	let myJson = await requestJustMade.json();
	console.log(myJson);

	let justAddedArticle;
	gamesElement.innerHTML = '';	

	for(let i=0;i<gamesInPage;i++){
		
		let newArticle = elementBuilder(myJson[i])
		gamesElement.innerHTML += newArticle;
		justAddedArticle = document.getElementById(myJson[i].id);
		justAddedArticle.style.backgroundImage = "url("+myJson[i].thumbnail+")";
	}
}

function elementBuilder(gameObj){
	
	let newArticle = "<article><div id="+gameObj.id+"><img src=/imgs/game-list/bookmark.svg></div><span><h3>"+gameObj.title+"</h3><p>"+gameObj.short_description+"</p></span></article>";

	return newArticle;

}