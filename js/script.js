
// api configuration
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com',
		'X-RapidAPI-Key': 'Your Api key'
	}
};

// getting all required html elements
const movieContainer = document.getElementById("movies");
const search = document.getElementById("search_btn");
const result = document.getElementById("result");
const noresult = document.getElementById("noresult");

// movies list of the available movies
let moviesList = [];

search.addEventListener("click",()=>{
	moviesList = [];
	movieContainer.innerHTML = "";
	const query = document.getElementById("query").value;
	noresult.classList.add("dnd");

	// fetching the movies data with the query word
	fetch(`https://online-movie-database.p.rapidapi.com/auto-complete?q=${query}`, options)
	.then(response => response.json())
	.then(response => {
		let count = 0;//count of the movies from the fetched data as data contains actors data also

		if(response.d){
			response.d.map((val)=>{
				// if it is a movie add to page
				if(val.q){
					count = count+1;
					addMovie(val);
					moviesList.push(val);
				}
			});

			// if no movie found in the fetched data shows noresult screen
			if(count ==0){
				result.classList.add("dnd")
				noresult.classList.remove("dnd");
			}else{
				// shows the result screen id its hidden
				result.classList.remove("dnd");
			}
		}else{
			// if no data found shows noresult screen
			result.classList.add("dnd")
			noresult.classList.remove("dnd");
		}
	})
})


// function to close the detailed movie section
function closeMovie(){
	document.getElementById("themovie").remove();
}


function showDetails(id){
	
	// matches the id of the clicked movie to show details
	let movieData = moviesList.filter((val)=>{
		if(val.id == id){
			return val
		}
	});

	// template for the detailed movie section
	let temp = `
			<div class="themovie_wrapper">
				<div class="upper">
					<i class="fa-solid fa-arrow-left-long" onclick=closeMovie()></i>
					<div class="movie_name">${movieData[0].l}</div>
				</div>
				<div class="movie_details">
					<div class="img">
						<img src= ${movieData[0].i? movieData[0].i.imageUrl:"./img/notfound.jpg"} alt="movie poster" />
					</div>
					<div class="details">
						<ul>
							<li class="desc">Description</li>
							<li><span>Title :</span>${movieData[0].l}</li>
							<li><span>Release Year :</span> ${movieData[0].y}</li>
							<li><span>Actors :</span> ${movieData[0].s}</li>
							<li><span>IMDB Ranking :</span> ${movieData[0].rank}</li>
						</ul>
					</div>
				</div>
			</div>`;

	let themovie = document.createElement("section");
	themovie.className = "themovie";
	themovie.id = "themovie"
	themovie.innerHTML = temp;
	document.body.append(themovie);

}

// function to add movies to the html page
function addMovie(details){
	
	// template for a movie card
	let movieTemplate = `
		<div class="img" onclick=showDetails("${details.id}")>
			<img src= ${details.i? details.i.imageUrl:"./img/notfound.jpg"} alt="movie poster" />
		</div>
		<div class="name">${details.l}</div>
		<div class="rating">
			<span>IMDB Rank ${details.rank}</span>
		</div>`;

	let movie = document.createElement("div");
	movie.className = "movie";
	movie.innerHTML = movieTemplate;
	movieContainer.appendChild(movie) ;

}