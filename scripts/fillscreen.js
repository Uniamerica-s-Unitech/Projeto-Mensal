let gamesElement = document.getElementById("games");
let moreGamesBtn = document.getElementById("moreGamesBtn");
let allLI = document.getElementsByTagName("li"); 
let AllBtn = document.getElementsByName("all")[0];
let DelteBtn = document.getElementById("delete-filter");
let FavBtn = document.getElementById("favoritos");
let gamesInPage = 10;
let params = "games";
let arrayOfFav = [];
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

getApiData(gamesInPage,params,false);

moreGamesBtn.addEventListener('click',showMoreGames);



FavBtn.addEventListener('click',showFav);


function showMoreGames(){
	gamesInPage = gamesInPage+12;
	getApiData(gamesInPage,params,false);
}

function changeParams(inputParams){
	gamesInPage = 10;
	params = inputParams;

	removeAllActive();

	
	if(inputParams.includes('category')){
		elementDir = 'sidebar';
	}else{
		elementDir = 'nav';
	}
	
	

	let nameOfClicked = inputParams.match(/(?<==).+/);
	nameOfClicked = String(nameOfClicked);

	let elementClicked = document.getElementsByName(nameOfClicked);
	
	
	elementClicked[0].setAttribute('id','active-'+elementDir+'-item');

	getApiData(gamesInPage,params,false);
}


function showFav(){
	removeAllActive();
	FavBtn.setAttribute('id','active-nav-item');
	getApiData(gamesInPage,params,true);
}

async function getApiData(gamesInPage,params,favOnly){

	
	
	let requestJustMade = await fetch(baseURL+params, options);
	let myJson = await requestJustMade.json();
	
	console.log(myJson);
	

	let justAddedArticle;

	gamesElement.innerHTML = '';

	
	
	

	for(let i=0;i<gamesInPage && i<myJson.length;i++){
		
		if(favOnly && !arrayOfFav.includes(myJson[i].id)){
			continue;
		}
		if(i+1==myJson.length){
			moreGamesBtn.style.display = 'none';
		}else{
			moreGamesBtn.style.display = 'flex';
		}


		let newArticle = elementBuilder(myJson[i]);
		gamesElement.innerHTML += newArticle;
		justAddedArticle = document.getElementById(myJson[i].id);
		justAddedArticle.style.backgroundImage = "url("+myJson[i].thumbnail+")";
	}
}

function elementBuilder(gameObj){

	let newArticle = "<article><a href="+gameObj.freetogame_profile_url+" id="+gameObj.id+"><img onclick='showID("+gameObj.id+")' src=/imgs/game-list/bookmark.svg></a href="+gameObj.freetogame_profile_url+"><span><h3>"+gameObj.title+"</h3><p>"+gameObj.short_description+"</p></span></article>";
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

function showID(idToSave){
	

	if(arrayOfFav.includes(idToSave)){
		
		index = arrayOfFav.indexOf(idToSave)
		
		delete arrayOfFav[index];

	}else{
		arrayOfFav.push(idToSave);
	}

}

