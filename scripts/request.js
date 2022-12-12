const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'fe99dbfb08msh14cddaa1855a018p166055jsna6265a1d093e',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
};

function makeRequest(){

fetch('https://free-to-play-games-database.p.rapidapi.com/api/games', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
}

export {makeRequest};
    