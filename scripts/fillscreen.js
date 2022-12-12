let gamesElement = document.getElementById("games");
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'fe99dbfb08msh14cddaa1855a018p166055jsna6265a1d093e',
		'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
	}
};

getApiData();

async function getApiData(){

	let requestJustMade = await fetch('https://free-to-play-games-database.p.rapidapi.com/api/games', options);

	let myJson = await requestJustMade.json();
	console.log(myJson);

	let justAddedArticle;

	for(let i=0;i<100;i++){
		
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