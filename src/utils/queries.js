import axios from 'axios'

export async function fetchFilms() {
  return await axios.get(`https://swapi.dev/api/films`).then((res) => res.data.results)
}

export async function fetchFilmCharacters(characters) {
  return await axios
    .all(
      characters.map((characterUrl) =>
        axios.get(`${String(characterUrl).replace('http', 'https')}`)
      )
    )
    .then((res) => res)
}
