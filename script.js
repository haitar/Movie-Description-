'use strict';
const key = 'ec2a6475';

const container = document.getElementById('container');
const form = document.getElementById('search-container');
const erreurMsg = document.querySelector('.erreur-message');
const template = document.querySelector('.template');
const results = document.querySelector('.results');

window.addEventListener('load', getMovie);
form.addEventListener('submit', getMovie);
function getMovie(e) {
  e.preventDefault();
  results.innerHTML = '';
  const movieName = document.getElementById('input-search').value;
  const url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

  if (movieName.length <= 0) {
    notFound();
  }

  async function getData() {
    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.Response === 'True') {
        erreurMsg.style.display = 'none';
        const cloneTemplate = template.content.cloneNode(true);
        console.log(data);
        console.log(cloneTemplate);
        const imgPoster = cloneTemplate.querySelector('.img-poster');
        const nameMovie = cloneTemplate.querySelector('.name');
        const rating = cloneTemplate.querySelector('.rating');
        const adults = cloneTemplate.querySelector('.adults');
        const release = cloneTemplate.querySelector('.release');
        const timing = cloneTemplate.querySelector('.timing');
        const genre = cloneTemplate.querySelector('.type');
        const description = cloneTemplate.querySelector('.description');
        const actors = cloneTemplate.querySelector('.actors');
        const categories = cloneTemplate.querySelector('.categories');

        imgPoster.src = data.Poster;
        nameMovie.innerHTML = data.Title;
        rating.innerHTML = data.Ratings[0].Value;
        adults.innerHTML = data.Rated;
        release.innerHTML = data.Released;
        timing.innerHTML = data.Runtime;
        description.innerHTML = data.Plot;
        actors.innerHTML = data.Actors;

        const splitType = data.Genre.split(', ');
        splitType.forEach((type) => {
          const genreDiv = document.createElement('div');
          genreDiv.textContent = type;
          genreDiv.classList.add('type');
          categories.appendChild(genreDiv);
        });
        //   container.insertAdjacentHTML('beforeend', cloneTemplate);
        results.appendChild(cloneTemplate);
      } else {
        notFound();
      }
    } catch (err) {
      console.error(err);
    }
  }
  getData();
}
function notFound() {
  erreurMsg.style.display = 'block';
  const html = `
    <div class="erreur-message">
        <p class="err">Movie not found!</p>
    </div>`;
  container.insertAdjacentHTML('beforeend', html);
}
