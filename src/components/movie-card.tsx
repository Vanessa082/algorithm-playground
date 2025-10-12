import type { MovieCardProp } from "@/lib/types"
import { Star } from "lucide-react"
import { Card } from "./ui/card"

const MovieCard = (
  { movie: { title, vote_average, poster_path, release_date, original_language } }: MovieCardProp
) => {
  const year = release_date ? release_date.split("-")[0] : "N/A"

  return (
    <Card className="movie-card group relative overflow-hidden rounded-xl bg-[#141414] shadow-lg transition-all duration-300 hover:scale-[1.05] hover:shadow-2xl">
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : "/no-movie.png"
        }
        alt={title}
        className="w-full h-[330px] object-cover transition-all duration-500 group-hover:opacity-70"
      />

      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <h3 className="text-lg font-bold text-white line-clamp-2">{title}</h3>

        <div className="flex items-center gap-2 mt-2">
          <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
          <p className="font-semibold text-sm text-gray-100">
            {vote_average ? vote_average.toFixed(1) : "N/A"}
          </p>
          <span className="text-gray-400">•</span>
          <p className="capitalize text-gray-200 text-sm">{original_language}</p>
          <span className="text-gray-400">•</span>
          <p className="text-gray-200 text-sm">{year}</p>
        </div>
      </div>
    </Card>
  )
}

export default MovieCard
