import axios from 'axios'

const apiUrl = process.env.NEXT_PUBLIC_API_URL
const proxyUrl = process.env.NEXT_PUBLIC_PROXY_URL

export async function fetchFilms() {
  return await axios.get(`${apiUrl}/films`).then((res) => res.data.results)
}

export async function fetchFilm(characters) {
  return await axios
    .all(
      characters.map((characterUrl) =>
        axios.get(`${proxyUrl}${String(characterUrl).replace('http', 'https')}`)
      )
    )
    .then((res) => res)
}
