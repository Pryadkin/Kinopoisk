export interface FetchMovies {
  api_key: string
  query: string
  page: string
  language: string
  include_adult: boolean
  region?: string
  year?: number
  primary_release_year?: number
}

export interface Movie {
  id: number
  popularity: number
  vote_count: number
  video: false
  poster_path: string | null
  adult: boolean
  backdrop_path: string | null
  original_language: string
  original_title: string
  genre_ids: Array<number>
  title: string
  vote_average: number
  overview: string
  release_date: string
  filters:
    | {
        id: number
        name: string
        path: string
      }[]
    | null
}

export interface FetchDetails {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: null
  budget: number
  genres: {
    id: number
    name: string
  }[]
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: {
    id: number
    logo_path: null
    name: string
    origin_country: string
  }[]
  production_countries: {
    iso_3166_1: string
    name: string
  }[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: {
    iso_639_1: string
    name: string
  }[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}
