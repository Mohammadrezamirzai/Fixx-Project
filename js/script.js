const global = {
  currentPage: window.location.pathname,
};

//function show 20 popular movies
async function displayPopularMovies() {
  const { results } = await fetchApiData("movie/popular");
  console.log(results);
  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = ` <a href="movie-detail.html?id=${movie.id}">
              ${
                movie.poster_path
                  ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="w-full items-center h-[400px] " />`
                  : `<img src="" class="w-5/6 h-[400px] md:w-1/3" />`
              }
               <h4 class="font-bold text-lg">${movie.title}</h4>
               <p class="font-medium text-lg">release : ${
                 movie.release_date
               }</p></a>`;

    document.getElementById("movie-pop").appendChild(div);
  });
}
//function show 20 popular tvshows
async function displayPopularshows() {
  const { results } = await fetchApiData("tv/popular");
  results.forEach((show) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = ` <a href="show-details.html?id=${show.id}">
              ${
                show.poster_path
                  ? `<img src="https://image.tmdb.org/t/p/w500${show.poster_path}.jpg" class="w-full items-center h-[400px] " />`
                  : `<img src="" class="w-5/6 h-[400px] md:w-1/3" />`
              }
               <h4 class="font-bold text-lg">${show.name}</h4>
               <p class="font-medium text-lg">release : ${
                 show.first_air_date
               }</p></a>`;

    document.getElementById("show-pop").appendChild(div);
  });
}

//function show selected movie details
async function displayMovieDetails() {
  const movieId = window.location.search.split("=")[1];
  const movie = await fetchApiData(`movie/${movieId}`);
  console.log(movie);
  const movieTitle = document.getElementById("movietitle");
  movieTitle.innerText = `${movie.title}`;

  const div = document.createElement("div");
  div.innerHTML = `<div class="movie-showdetails-top">
        ${
          movie.poster_path
            ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="" />`
            : `<img src="class="w-5/6 h-[400px] md:w-1/3" />`
        }
        <div class="flex flex-col space-y-6 pl-4">
          <div class="flex space-x-2 items-center">
            <svg
              height="30px"
              width="30px"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="-8.15 -8.15 64.24 64.24"
              xml:space="preserve"
              fill="#000000"
              stroke="#000000"
              stroke-width="0.00047939999999999994">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  style="fill: #ed8a19"
                  d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757 c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042 c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685 c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528 c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956 C22.602,0.567,25.338,0.567,26.285,2.486z"></path>
              </g>
            </svg>
            <p>${movie.vote_average.toFixed(1)} / 10</p>
          </div>
          <p>Release Date: ${movie.release_date}</p>
          <p class="translate-y-2 max-w-xl">
            ${movie.overview}
          </p>
          <div class="flex flex-col space-y-2">
            <p class="text-bold">GENRES</p>
            ${movie.genres.map((gen) => ` <li>${gen.name}</li>`).join("")}
          </div>
          <a href="${
            movie.homepage
          }"><button  class="w-2/5 flix-btn text-red-500">Visit Moviepage</button></a>

        </div>
      </div>
      <!--info section-->
      <div class="movie-showdetails-bottom ">
        <p class="text-center text-3xl font-bold">MOVIE INFO</p>
        <div class="flex flex-col space-y-4 lg:px-10">
          <p
            class="pb-2 text-xl   border- border-b border-gray-400 text-yellow-400 ">
            Budget:        ${movie.budget}
          </p>
          <p class="pb-2 text-xl border-b border-gray-400 text-yellow-400">
            Revenue:   ${movie.revenue}
          </p>
          <p class="pb-2 text-xl border-b border-gray-400 text-yellow-500">
            Runtime:  ${movie.runtime}
          </p>
          <p class="pb-2 text-xl border-b border-gray-400 text-yellow-400">
            Status:  ${movie.status}
          </p>
        </div>
      </div>`;

  document.getElementById("moviedetails").appendChild(div);
}

//function show selected tvshow details
async function displayShowDetails() {
  const showId = window.location.search.split("=")[1];
  const show = await fetchApiData(`tv/${showId}`);

  const showTitle = document.getElementById("showtitle");
  showTitle.innerText = `${show.name}`;
  console.log(show);
  const div = document.createElement("div");
  div.innerHTML = `<div class="show-showdetails-top">
        ${
          show.poster_path
            ? `<img src="https://image.tmdb.org/t/p/w500${show.poster_path}" class="" />`
            : `<img src="" class="w-5/6 h-[400px] md:w-1/3" />`
        }
        <div class="flex flex-col space-y-6 pl-4">
          <div class="flex space-x-2 items-center">
            <svg
              height="30px"
              width="30px"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="-8.15 -8.15 64.24 64.24"
              xml:space="preserve"
              fill="#000000"
              stroke="#000000"
              stroke-width="0.00047939999999999994">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  style="fill: #ed8a19"
                  d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757 c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042 c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685 c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528 c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956 C22.602,0.567,25.338,0.567,26.285,2.486z"></path>
              </g>
            </svg>
            <p>${show.vote_average.toFixed(1)} / 10</p>
          </div>
          <p>last air Date: ${show.last_air_date}</p>
          <p class="translate-y-2 max-w-md">
            ${show.overview}
          </p>
          <div class="flex flex-col space-y-2">
            <p class="text-bold">GENRES</p>

          </div>
          <a href="${
            show.homepage
          }"><button  class="w-2/5 flix-btn">Visit Moviepage</button></a>

        </div>
      </div>
      <!--info section-->
      <div class="movie-showdetails-bottom">
        <p class="text-center text-3xl font-bold">MOVIE INFO</p>
        <div class="flex flex-col space-y-8 lg:px-10">
          <p
            class="pb-2 text-xl   border- border-b border-gray-400 text-yellow-400 ">
            Number Of Episodes:        ${show.number_of_episodes}
          </p>
          <p class="pb-2 text-xl border-b border-gray-400 text-yellow-400">
            Last Episode To Air :   ${show.last_episode_to_air.name}
          </p>

          <p class="pb-2 text-xl border-b border-gray-400 text-yellow-400">
            Status:  ${show.status}
          </p>
        </div>
      </div>`;
  document.getElementById("showdetails ").appendChild(div);
}

async function fetchApiData(endpoint) {
  const API_KEY = "48f2b5a2c7bfc9bf50e3f1ae8ed036e4";
  const API_URL = "https://api.themoviedb.org/3/";

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();
  return data;
}

//function show spinner

// init function
function init() {
  switch (global.currentPage) {
    case "/index.html":
      displayPopularMovies();
      break;
    case "/tvshows.html":
      displayPopularshows();
      break;
    case "/show-details.html":
      displayShowDetails();
      break;
    case "/movie-detail.html":
      displayMovieDetails();
      break;
  }
}

document.addEventListener("DOMContentLoaded", init);
