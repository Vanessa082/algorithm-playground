import type { SearchProp } from "@/lib/types"
import { SearchIcon } from "lucide-react"
import { Input } from "./ui/input"

const Search = ({ searchTerm, setSearchTerm }: SearchProp) => {
  return (
    <div className="w-full flex items-center justify-center mt-6">
      <div className="relative w-full max-w-xl">
        <SearchIcon
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#baa1ff] w-5 h-5 pointer-events-none"
        />

        <Input
          type="text"
          placeholder="Search through thousands of movies"
          className="pl-10 py-3  text-white rounded-xl border border-zinc-800 focus-visible:ring-1 focus-visible:ring-[#baa1ff] placeholder:text-zinc-400 transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  )
}

export default Search
