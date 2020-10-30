import axios from 'axios'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export async function fetchFilms() {
  return await axios.get(`${apiUrl}/films`).then((res) => res.data.results)
}

export async function fetchFilm(characters) {
  return await axios.all(characters.map((c) => axios.get(c))).then((res) => res)
}
