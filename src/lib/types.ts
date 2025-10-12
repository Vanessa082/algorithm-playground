export interface Movie {
  id: string,
  title: string,
  vote_average: number,
  poster_path: string,
  poster_url: string,
  release_date: string,
  original_language: string
}

export interface MovieCardProp {
  movie: Movie
}

export interface SearchProp {
  searchTerm: string,
  setSearchTerm: (value: string) => void
}
