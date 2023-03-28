import React from "react";

// bu ne işe yarıyor?
import { isEmpty } from "lodash";
import MovieCard from "@/components/MovieCard";
import useMovieList from "@/queryHooks/useMovieList";

interface MovieListProps {
  id: string;
  data: Record<string, any>;
  title: string;
}
const MovieList = ({ id, data, title }: MovieListProps) => {
  const { isLoading, error } = useMovieList();
  if (isEmpty(data)) {
    return null;
  }

  return (
    <div id={id} className="px-4 md:px-12 mt-4 space-y-8">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
          {title}
        </p>
        <div className="flex flex-col gap-2 grid-cols-4 sm:gap-2 sm:grid ">
          {data.map((movie: any) => (
            <MovieCard key={movie.id} data={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
