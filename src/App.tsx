import { useEffect, useState } from "react";

import type { Movie } from "./lib/types";
import { environmentVariables } from "./lib/env";
import { getTrendingMovies, updateSearchCount } from "./lib/appwrite";
import { useDebounce } from "react-use";
import Search from "./components/search";
import MovieSkeleton from "./components/movie-skeleton";
import Spinner from "./components/spinner";
import MovieCard from "./components/movie-card";

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${environmentVariables.VITE_TMDB_API_KEY}`,
  },
};

const App = () => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = query
        ? `${environmentVariables.API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${environmentVariables.API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) throw new Error("Failed to fetch movies");

      const data = await response.json();
      if (data.Response === "False") {
        setErrorMessage(data.Error || "No movies found");
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);

      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Error fetching movies. Please try again later.");
    } finally {
      setIsLoading(false);
      setInitialLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      const mappedMovies =
        (movies ?? []).map((doc) => ({
          id: doc.movie_id,
          title: doc.title ?? "Unknown",
          vote_average: doc.vote_average ?? 0,
          poster_path: doc.poster_path ?? "",
          poster_url: doc.poster_url ?? "",
          release_date: doc.release_date ?? "",
          original_language: doc.original_language ?? "",
        })) || [];
      setTrendingMovies(mappedMovies);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMovies();
    loadTrendingMovies();
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm) fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="all-movies">
          <h2>All Movies</h2>

          {initialLoading ? (
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <MovieSkeleton key={i} />
              ))}
            </ul>
          ) : isLoading && searchTerm ? (
            <div className="flex justify-center mt-10">
              <Spinner />
            </div>
          ) : errorMessage ? (
            <p className="text-red-500 text-center">{errorMessage}</p>
          ) : (
            <ul
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 opacity-0 animate-fadeIn"
            >
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>

      </div>
    </main>
  );
};

export default App;
