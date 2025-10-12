const MovieSkeleton = () => {
  return (
    <div className="animate-pulse bg-dark-100 rounded-2xl overflow-hidden shadow-inner shadow-light-100/10">
      <div className="w-full h-[250px] bg-gray-800" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        <div className="h-3 bg-gray-700 rounded w-1/2"></div>
        <div className="h-3 bg-gray-700 rounded w-1/3"></div>
      </div>
    </div>
  );
};

export default MovieSkeleton;
