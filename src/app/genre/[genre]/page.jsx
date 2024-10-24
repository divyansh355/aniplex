"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Loader from "@/components/Genres/Loader";
import useStore from "@/utils/store";

const GenreAnimeList = () => {
  const apiUrl = process.env.NEXT_PUBLIC_ANIME_API;
  const { genre } = useParams();
  const router = useRouter();
  const setSelectedAnimeId = useStore((state) => state.setSelectedAnimeId);

  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!genre) return;

    const fetchAnimeByGenre = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${apiUrl}/api/v2/hianime/genre/${genre}?page=${currentPage}`
        );
        if (!response.ok) throw new Error("Failed to fetch anime by genre");
        const data = await response.json();
        setAnimeList(data.data.animes);
        setTotalPages(data.data.totalPages);
      } catch (error) {
        console.error("Error fetching genre anime:", error);
      }
      setLoading(false);
    };

    fetchAnimeByGenre();
  }, [genre, currentPage, apiUrl]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleWatchClick = (id) => {
    setSelectedAnimeId(id);
    router.push(`/watch/${id}`);
  };

  if (loading) return <Loader />;

  return (
    <div className="mx-auto p-4 bg-black">
      <h2 className="text-center text-3xl font-bold my-6 text-white capitalize">
        {genre.replace("-", " ")} Anime
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {animeList.map((anime) => (
          <div key={anime.id} className="bg-gray-800 rounded-lg shadow-lg p-4">
            <img
              src={anime.poster}
              alt={anime.name}
              className="w-full rounded-lg mb-4"
            />
            <div className="text-white text-center">
              <h3 className="text-lg font-semibold truncate">{anime.name}</h3>
              <p className="text-sm text-gray-400">{anime.type}</p>
              <p className="text-sm text-gray-400">Rating: {anime.rating}</p>
              <p className="text-sm text-gray-400">
                Episodes: {anime.episodes.sub} (Sub) / {anime.episodes.dub}{" "}
                (Dub)
              </p>
              <button
                onClick={() => handleWatchClick(anime.id)}
                className="mt-2 bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600"
              >
                Watch
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        {currentPage > 1 && (
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="bg-gray-700 text-white py-2 px-4 rounded-lg mx-2 hover:bg-gray-600"
          >
            Previous
          </button>
        )}
        {currentPage < totalPages && (
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="bg-gray-700 text-white py-2 px-4 rounded-lg mx-2 hover:bg-gray-600"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default GenreAnimeList;
